# CONTEXT: K2Alpha.ai Website

## Architecture
- **Tech Stack**: Vanilla HTML, CSS, JavaScript + one Vercel serverless function.
- **Design System**: Dark-mode first. Steel Blue (`#38BDF8`) as primary, Amber (`#C9A84C`) as accent.
- **Key Modules**:
    - `index.html`: Semantic HTML5 with SEO meta tags.
    - `style.css`: Responsive design, CSS variables, and keyframe animations.
    - `script.js`: Intersection Observers for scroll animations (Scaling Trap, Trajectory, Counters); fetch wiring for the Ask K2Alpha box.
    - `api/ask.js`: Vercel serverless function (Node). Calls Google's Gemini **Interactions API** (`v1beta/interactions`) grounded in `api/knowledge.js`, returns a short answer for the "Ask K2Alpha" box on the homepage (`#ask` section). Requires `GEMINI_API_KEY` env var. Uses a 5-rung model waterfall, falling through to the next on any error/empty response: Gemini 3.6 Flash (extended thinking) → Gemini 3.6 Flash → Gemini 3.5 Flash (extended thinking) → Gemini 3.5 Flash → Gemini 3.5 Flash-Lite. Note: Gemini has no separate "Extended" model — it's `thinking_level: "high"` on the same model.
    - `api/knowledge.js`: Structured knowledge base (site copy + non-confidential parts of the Jul'26 seed deck — market thesis, method, traction, modules, reuse economics). Deliberately excludes the fundraise ask, investor shareholding %, and named-deal pricing/negotiation details from the deck, since this endpoint is public-facing.

## Ask K2Alpha (AI demo box)
- Homepage section `#ask`, between Problem and Our Model. Visitor describes a
  business problem; `/api/ask` calls Gemini grounded in `api/knowledge.js` and
  returns a short, on-brand answer plus a CTA to email founders@k2alpha.ai.
- **Setup required before this goes live**: add `GEMINI_API_KEY` in Vercel →
  Project (`k2alphaai`) → Settings → Environment Variables, then redeploy.
  Get a key at https://aistudio.google.com/apikey. Without the key, the
  endpoint returns a friendly fallback message instead of erroring.
- To enrich answers further, add more non-confidential content to
  `api/knowledge.js` (e.g. more deck detail, case studies) — never add
  fundraise terms, investor cap table info, or named prospective-client deal
  economics, since any website visitor can query this endpoint.

## Strategic Frameworks
- **Custom Software is a Right**: Thesis that off-the-shelf SaaS is a compromise; in the AI age, custom-built owned software is the baseline right of every enterprise.
- **Scaling Trap**: The core thesis on cost/headcount decoupling.
- **PQRS**: Engineering standards (Performance, Quality, Reliability, Security).
- **Three-Layer Model**: AI/Tech → Strategy → Capital.
- **Agentic HITL**: Train → Act → Escalate workflow.

## Founders
- **Ashish Karan**: CEO. Background: Carlyle, McKinsey, IIT-KGP, IIM-A.
- **Ranjan Kant**: Chief Architect. Background: Flipkart, OfBusiness, BCG, BCG X, IIT-KGP, IIM-A.
- **Personal Story**: Friends since Class 11. Partnership built on long-term trust and divergent expertise.

## Deployment
- **Platform**: Vercel
- **Project Name**: `k2alphaai`
- **URL**: [https://k2alphaai.vercel.app](https://k2alphaai.vercel.app)
- **Account**: `ranjan-5311s-projects`

## Completed Tasks
- [x] Align copy with the Custom Software thesis (July 2026).
- [x] Add favicon (June 2026).

## Pending Tasks
- [ ] Implement a proper newsletter/lead-capture backend (currently mailto).
- [ ] Add client/sector-specific subpages if required.
- [ ] Set `GEMINI_API_KEY` in Vercel to activate the "Ask K2Alpha" AI box (see above).
- [ ] Optional: add basic abuse/rate-limiting to `/api/ask` before high-traffic launch (e.g. Vercel Edge Config or a lightweight IP-based limiter) — currently only length-limited.
