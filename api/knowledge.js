// api/knowledge.js
// Structured knowledge base grounding the "Describe your issue" AI box.
// Source: index.html copy (site) as of Aug 2026. Extend this with pitch-deck
// content once shared — see CONTEXT.md "Pending Tasks".

module.exports = `
# K2ALPHA — KNOWLEDGE BASE

## What K2Alpha is
K2Alpha is the AI operating layer for Indian companies. Thesis: in the age of AI,
custom software isn't a luxury — it's the right of every enterprise. Off-the-shelf
SaaS was always a compromise; K2Alpha reimagines how a business actually runs, then
builds the software for it — a proven platform core, plus a workflow layer built
only for that client. Embedded in the business. Owned by the client's team.
Measured on their P&L.

## Proof points
- 7 engagements delivered or live.
- 40+ specialists trained and transitioned onto client payroll.
- 21 months delivering production platforms.
- Up to 5x typical productivity gain per workflow.
- Founders and team from Carlyle, McKinsey, Flipkart, BCG X, OfBusiness, IIT
  Kharagpur, IIM Ahmedabad.

## The problem K2Alpha solves
1. Rented workflows, not owned ones — off-the-shelf tools force a business to
   adapt to someone else's design.
2. Knowledge that never compounds — workarounds and judgment calls live in
   people's heads and leave when they do; software should learn it but usually
   doesn't.
3. Best people doing the software's job — scanning, checking, formatting work
   that exists only because the system can't do it. Not a headcount problem,
   a software problem wearing a headcount costume.
4. More people is not a strategy — every new problem gets solved by hiring,
   costs compound, the business doesn't get smarter, just bigger.
Punchline: the old trade-off (grow headcount to grow revenue) made this
inevitable. It isn't anymore — an AI-native model keeps cost flat while output
scales; the gap between the legacy curve and the AI-native curve is the
client's competitive moat.

## How K2Alpha operates (the model)
- Builds inside the client's business, not next to it: partners stay in the
  room for problem definition, workflow redesign, change management, ROI
  tracking, adoption. An AI-accelerated dev bench ships weekly. The objective
  is the business outcome, not shipping code.
- Priced like a teammate, not billed by the hour: build is priced near cost;
  once live, a real share of what K2Alpha earns is tied to outcomes actually
  driven on the client's P&L. Ongoing maintenance is metered on actual usage
  (per transaction, per invoice, per token) — not a flat license for unused
  capacity.
- No lock-in, by design: K2Alpha hires and trains the people who run what was
  built and puts them on the CLIENT's payroll, not K2Alpha's. In AI the stack
  changes too fast for permanent dependency to be a strategy. Success metric
  is the client's independence.
- A platform core already proven, a workflow only the client has: every
  engagement runs on hardened shared infrastructure (orchestration,
  governance, guardrails). What's custom-built is the part that matters —
  client's exceptions, compliance, P&L levers. Speed of a platform, fit of a
  custom build.
- Method: start with the client's P&L, not with AI. Every business has two or
  three levers that move the numbers; K2Alpha finds them, then builds there.
  Nothing existing gets ripped out — the system handles repetition, people
  own exceptions. Flow: client's systems (CRM/LOS/ERP/email/documents) → K2Alpha
  layer (platform core + client's workflow) → client's team (approves,
  overrides, decides) → business outcomes (revenue, margin, risk,
  productivity).

## Why K2Alpha vs. alternatives
- Consulting gives recommendations (strategy on a slide), engagement ends at
  the report, client is left with a document, risk sits with the client after
  consultants leave.
- Typical AI vendor gives a generic AI product, engagement ends at go-live,
  client is left with a disconnected tool, risk sits with the client if it
  doesn't fit.
- K2Alpha gives an operating workflow the client owns, adoption-driven
  business outcome, stays until it runs on its own, leaves the client
  independent (40+ specialists hired/trained onto client payroll and
  counting), risk sits with K2Alpha until it runs on its own.

## Sector playbooks (proven in production)
Both playbooks share one platform architecture, adapted to two different
regulatory rulebooks (SEBI and RBI) — proof the architecture is provably
consistent, not just fast.

### Wealth & Capital Markets (Delivered, 9–12 months live)
Client: a SEBI-regulated wealth and capital-markets platform. Coverage target
jumped from 182 to 750 companies; hiring 7x more analysts wasn't the answer.
Results:
- Coverage ratio per analyst improved 1:6 → 1:25, with no new hires.
- 70–80% reduction in manual work.
- Core workflow turnaround went from hours to minutes.
Workflows: research & coverage, RM co-pilot, distribution, SEBI compliance.
Scale: 40–50 analysts, 25–35 RMs, 182 → 750 companies, all workflows still in
use. Built on top of existing research, CRM and trading systems — no platform
replaced.

### Lending / NBFC (In progress)
Client: a growth-stage Indian digital NBFC issuing ₹10–20k personal loans to
thin-file, gig-economy and informal-income borrowers. What works at 100,000
loans breaks at a million — acquisition, underwriting, collections and
governance become the bottleneck before credit does.
Workflows: acquisition triage, alternative underwriting, tech governance,
predictive collections, RBI compliance.
Built on top of the existing LOS, LMS and risk engine — no system replaced;
client owns the systems, K2Alpha builds the intelligence layer above them.
Every metric has a pre-deployment baseline, measured before and after.

### Five more engagements, delivered (beyond the two flagship playbooks)
- Private-markets / unlisted-securities marketplace — built the unlisted-deals
  marketplace.
- Small-ticket personal-loan NBFC — data analytics & underwriting.
- Fast-fashion manufacturer — factory ops & merchandising.
- Construction marketplace + parent group (2 clients) — inventory management
  & marketplace.

## Engagement timeline
Live system in ~14 weeks:
- Weeks 1–2: Prioritise — find the one workflow that moves the client's
  numbers.
- Weeks 3–12: Build — live environment, real users, real edge cases.
- Weeks 13–14: Roll out — live deploy, stakeholder adoption included.
Proven on the wealth engagement: first usable value in ~14 weeks; now 9–12
months live and still running. The workflow changed after deployment; the
operating model did not.

## PQRS guardrails
- Performance: 95%+ reasoning floor; ROI benchmarked before and after.
- Quality: human-in-the-loop; semantic-leakage elimination.
- Reliability: MCP-server integration; redundant model fail-safes.
- Security: AI gateway; no public training; enterprise encryption.

## Team
- Ashish Karan — CEO & Co-Founder. Led transformation and investing across
  financial services, healthcare and logistics. Carlyle Group, McKinsey, IIT
  Kharagpur, IIM Ahmedabad.
- Ranjan Kant — Chief Architect & Co-Founder. Co-founded and scaled
  data-driven financial services platforms and enterprise digitalization
  globally. Flipkart, BCG X, OfBusiness, IIT Kharagpur, IIM Ahmedabad.
- Friends since Class 11; partnership built on long-term trust and divergent
  expertise (one strategy/capital, one architecture/engineering).
- Forward-deployed engineers ship alongside the client's team; an AI-enabled
  dev bench ships weekly. 12–15 workflows, 4–5 platforms, still running.

## How to engage
Schedule a 30-minute session: founders@k2alpha.ai

## Category context (from the seed pitch deck — market framing only)
K2Alpha's thesis: the next trillion-dollar enterprise companies won't sell
software, they'll build AI-native operating systems. Global capital has
validated "AI-native implementation" as a venture-scale category (Sequoia's
"services are the new software" thesis; Harvey, Sierra, Cognition and others
raised at $10B+ valuations in 2025–26). K2Alpha is building the India-focused
version of this category.

Why the model scales: traditional IT services starts every client from zero
and its cost stays flat even at the 100th client. K2Alpha's AI-native
implementation model — frame the ROI, redesign the workflow, assemble from an
owned library, encode and hand over — draws from a reusable library, so every
new build costs less than the last. Foundation-model improvements make this
better, not worse: as models get cheaper and better, more of each build is
pre-assembled rather than hand-coded, and the durable value sits in who owns
the workflow, data and governance — not in the model layer itself.

## Method (from the seed deck)
Small teams, full ownership, fast output:
- Lean by design: one AI Program Manager runs 2–3 engagements (no dedicated
  account model, no bench time); one product engineer owns a build end to
  end — front-end, back-end, model, devops, cloud, deploy, with no handoff.
- Operating rules: One Spec (the product and technical spec are the same
  document, written by whoever is building it); Industrialize on Sight (every
  build splits into a reusable primitive and a client-specific residual
  before it's called done); Bug SLA (report to hours to fixed, no backlog —
  "if it's broken for the client, it's a bug").
- New because of AI: Prototype Live (built at the client's desk in week one
  with AI coding agents, not mockups — rebuilt fast if wrong); Spec Is the
  Prompt (the same artifact that defines the build also drives it); Eval Gate
  (every build clears an automated eval suite before it ships, not after a
  demo goes well).

## Traction (from the seed deck, 2024–2026)
15 production workflows shipped across 7 sectors over 21 months, all with
measured outcomes in client production environments. Average time-to-first
value: 6–8 weeks. Average full deployment: 3–4 months. Representative
workflows and measured outcomes:
- Trade-mandate verifier (Brokerage): 98%+ extraction accuracy on offline
  trade mandate signatures.
- Legal document / contract risk checker (Construction Tech): risk-scan
  turnaround cut from days to under 10 minutes.
- BOQ & tender management (Construction Tech): tender pricing generation cut
  from 2 months to 10 days (80% faster).
- KYC & deal onboarding (Private Markets): KYC under 5 minutes; deal ops down
  90%; 5x bid volume at flat headcount.
- SEBI compliance manager (Brokerage): regulatory circulars turned into
  department action items in 30 minutes.
- RBI escalation root-cause investigator (NBFC): escalation investigation cut
  from 48 hours to under 15 minutes.
- Research automation (Brokerage): analyst coverage 1:6 to 1:25; manual
  research down 70–80% (this is the Wealth playbook above).
- Credit analytics (NBFC): 85% of standard cases decided in under 3 minutes;
  reporting effort down 60%.
- Deal scoring & discovery marketplace (Private Markets): 5x bid volume at
  flat ops headcount, instant outlier flagging.
- RM copilot (Brokerage): workflow turnaround from hours to minutes, zero new
  headcount.
- CX automation / email triage (NBFC): 70% of inbound service emails
  auto-routed and drafted.
- Factory line planning (Fast Fashion): planning cut from 3 days to 4 hours;
  95%+ defect detection.
- Procurement marketplace / RFQ management (Construction Procurement): RFQ
  turnaround down 50%, full cross-supplier inventory visibility.
- Developer productivity platform (NBFC): 35% reduction in sprint leakage;
  escalation root-cause-analysis time down 94%.
- AI hiring pipeline (Construction Tech): screen-to-interview turnaround cut
  70%.
New sectors already in motion beyond the original financial-services base:
healthcare, insurance, energy, pharma, chemicals and recruitment.

## Eight reusable architectural modules
The 15 shipped workflows above are assembled from eight reusable modules,
each proven in more than one sector: (1) document ingestion & extraction —
used in 3 sectors; (2) regulatory & compliance interpretation — used in 3
sectors; (3) matching, scoring & discovery — used in 2 sectors; (4) analytics
& decision dashboards; (5) conversational copilot — used in 2 sectors; (6)
inventory & resource optimisation — used in 2 sectors; (7) dev/ops
productivity platform; (8) research & report automation. Every module runs on
four foundation layers: an agent orchestrator (chains narrow sub-agents,
governed so none overload or contradict each other), an eval gate (automated
eval suite before every ship), model routing (a model-agnostic core, so
swapping model providers doesn't mean a rebuild), and data isolation (client
data stays inside that client's environment; nothing crosses between
engagements — reuse means the pattern and method compound, never the data).

## Compounding economics (from the seed deck)
Each deployment adds to K2Alpha's reusable code library. The pre-built to
custom ratio has moved from 0:100 to roughly 70:30 as the library compounds,
and typical cycle time per use case has fallen from about 6 months to about 4
months. The client always owns their data, configuration, business rules and
running system; K2Alpha keeps the reusable discovery method, evaluation
frameworks, workflow architecture and governance patterns — which is also why
there's no lock-in.

## How K2Alpha decides buy / configure / build for a client
K2Alpha starts every engagement by sizing the P&L levers with client CXOs and
taking an honest view on whether the right move is to buy, configure, or
build:
- Buy: when someone already sells the capability better — commodity cases.
- Configure: when the client already owns a system that's never been
  properly fitted to how they actually work — common.
- Build: when the workflow itself is the client's competitive edge — common
  for mid-size enterprises, and where K2Alpha's model is built to maximise
  ROI.
K2Alpha will tell a client not to buy AI when that's the right answer, and
sometimes the honest answer is not to build at all. A recurring pattern seen
across clients: every system is already bought (CRM, ERP, analytics) but the
intelligence connecting them is still missing, and a CXO team is stitching
data together by hand — the software was never the actual gap, the missing
workflow layer was.
`;
