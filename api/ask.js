// api/ask.js
// Vercel serverless function powering the "Describe your issue" box.
// Takes a visitor's description of a business problem and returns a short,
// grounded answer on how K2Alpha would approach it — using only the facts in
// api/knowledge.js (site copy + pitch deck) as context.

const KNOWLEDGE = require('./knowledge');

const SYSTEM_PROMPT = `You are the AI on the K2Alpha.ai website, talking to a
visitor (usually a founder, COO, CXO or operator at an Indian company) who has
just described a business problem in a box on the homepage.

Your job: show, in one short answer, how K2Alpha would think about and
approach their specific problem — grounded ONLY in the facts below about
K2Alpha. This is a live demo of K2Alpha's own AI capability, so the answer
must be sharp, specific, and non-generic — not a canned pitch.

Rules:
- Use ONLY the facts in the KNOWLEDGE BASE below. Never invent client names,
  numbers, or capabilities that aren't in it. If the KNOWLEDGE BASE has no
  direct match, reason from the closest relevant playbook or pillar and say
  so plainly rather than fabricating specifics.
- Tone: neutral, McKinsey/BCG-style — declarative, evidence-led, no fluff, no
  hype adjectives, no exclamation marks, no emoji. Confident and specific, not
  salesy.
- Structure: 2–4 short sentences. Name the relevant pattern (e.g. which
  playbook or model pillar applies), state what K2Alpha would actually do
  about their problem, and cite one concrete proof point from the knowledge
  base if it's genuinely relevant (don't force one).
- Prefer a number over an adjective. If the knowledge base has no number for
  the claim you want to make, say so plainly rather than reaching for a vague
  qualifier ("significant," "robust," "seamless," "comprehensive").
- Preserve status precisely: call delivered/live work "delivered" or "live,"
  the NBFC playbook "in progress," and anything from the pipeline (healthcare,
  insurance, energy, pharma, chemicals, recruitment) "not yet delivered" or
  "in the pipeline." Never blur these into one confident present tense.
- Avoid the tells of generated text: no throat-clearing openers ("importantly,"
  "fundamentally," "at its core," "it is worth noting"); no antithesis tics
  ("not just X but Y," "X rather than Y") — at most one in the whole answer;
  no sentence that sounds insightful but names nothing the reader could act
  on (test: could they point at what to go do about it?).
- Close with a single line inviting them to talk to the founders, in this
  exact form: "Talk to us: founders@k2alpha.ai"
- Do not exceed 110 words total, excluding the closing line.
- If the message is not a real business problem (spam, test input, off-topic,
  or unintelligible), respond with exactly: "Describe a real business
  workflow or bottleneck and we'll tell you how we'd approach it. Talk to us:
  founders@k2alpha.ai"

KNOWLEDGE BASE:
${KNOWLEDGE}`;

const MAX_INPUT_LENGTH = 800;

// Model waterfall — tried in order, falling through on any failure.
// "Extended" = thinking_level: "high" on the same model (Gemini has no
// separate "Extended" model id — it's a reasoning-depth setting).
// Source: https://ai.google.dev/gemini-api/docs/models (checked Aug 2026).
const MODEL_WATERFALL = [
  { model: 'gemini-3.6-flash', thinkingLevel: 'high', label: 'Gemini 3.6 Flash Extended' },
  { model: 'gemini-3.6-flash', thinkingLevel: null, label: 'Gemini 3.6 Flash' },
  { model: 'gemini-3.5-flash', thinkingLevel: 'high', label: 'Gemini 3.5 Flash Extended' },
  { model: 'gemini-3.5-flash', thinkingLevel: null, label: 'Gemini 3.5 Flash' },
  { model: 'gemini-3.5-flash-lite', thinkingLevel: null, label: 'Gemini 3.5 Flash Lite' },
];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = req.body;
  if (!body || typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch (e) {
      res.status(400).json({ error: 'Invalid JSON body' });
      return;
    }
  }

  const message = (body && body.message ? String(body.message) : '').trim();

  if (!message) {
    res.status(400).json({ error: 'Describe an issue before submitting.' });
    return;
  }
  if (message.length > MAX_INPUT_LENGTH) {
    res.status(400).json({
      error: `Keep it under ${MAX_INPUT_LENGTH} characters — the shorter the sharper.`,
    });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: 'The AI box is not configured yet. Talk to us: founders@k2alpha.ai',
    });
    return;
  }

  for (let i = 0; i < MODEL_WATERFALL.length; i++) {
    const rung = MODEL_WATERFALL[i];
    try {
      const answer = await callGemini(rung, apiKey, message);
      if (answer) {
        res.status(200).json({ answer: answer.trim(), model: rung.label });
        return;
      }
      console.warn(`ask.js: empty answer from ${rung.label}, falling through`);
    } catch (err) {
      console.warn(`ask.js: ${rung.label} failed (${err.message}), falling through`);
    }
  }

  res.status(502).json({
    error: 'Could not generate an answer right now. Talk to us: founders@k2alpha.ai',
  });
};

async function callGemini(rung, apiKey, message) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/interactions';

  const generationConfig = { temperature: 1.0 };
  if (rung.thinkingLevel) {
    generationConfig.thinking_level = rung.thinkingLevel;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      model: rung.model,
      system_instruction: SYSTEM_PROMPT,
      input: message,
      generation_config: generationConfig,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText.slice(0, 300)}`);
  }

  const data = await res.json();
  return extractOutputText(data);
}

// The Interactions API's `output_text` convenience property is computed
// client-side by the SDKs. Over raw REST, pull the same text from the
// `steps` array (model_output steps, text content blocks) so the API
// works without depending on an SDK.
function extractOutputText(data) {
  if (data && typeof data.output_text === 'string' && data.output_text.trim()) {
    return data.output_text;
  }
  if (!data || !Array.isArray(data.steps)) return null;

  const textParts = [];
  for (const step of data.steps) {
    if (step.type !== 'model_output' || !Array.isArray(step.content)) continue;
    for (const block of step.content) {
      if (block.type === 'text' && block.text) textParts.push(block.text);
    }
  }
  return textParts.length ? textParts.join('') : null;
}
