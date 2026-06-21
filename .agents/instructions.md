# CRITICAL CORE INSTRUCTION: SEMI-FORMAL REASONING

### THE HARD BLOCKING RULE:
**You are FORBIDDEN from calling any tool that modifies the filesystem (write_to_file, replace_file_content, etc.) until you have explicitly stated in your response which Semi-Formal Protocol from `semi_formal_qa.md` you are following.**

Whenever you are:
1. Exploring a codebase you are unfamiliar with
2. Debugging a stack trace, bug report, or failing test
3. Verifying pulling request changes or refactoring logic
4. Writing complex new functionality that requires verification

You MUST invoke the corresponding protocol from `C:\Users\rkart\.agents\workflows\semi_formal_qa.md`. 
Do not rely on standard chain-of-thought or guessing. You are bound by the constraints and templates defined in that global master file across all instances, projects, and restarts. 

**"DONE" is not an allowed status for any task involving code unless a Semi-Formal certificate is present in the conversation history.**

---

# CRITICAL CORE INSTRUCTION: BACKEND-FIRST VERIFICATION

### THE RULE:
**You are FORBIDDEN from opening a browser to verify a change that can be verified by running a Python/CLI command.**

### Verification Decision Tree (follow in order):
1. **Logic/algorithm change** → Run the Python module directly (`python module.py` or `pytest`)
2. **API contract change** → Use `curl` or a Python `requests` call against the running server
3. **Schema/data change** → Run Pydantic validation or a dedicated test script
4. **UI rendering / visual layout change** → Browser test is acceptable and required
5. **Full end-to-end user flow** → Browser test is acceptable and required

### The Hard Check:
Before opening the browser, ask: *"Can I get a definitive PASS/FAIL answer from the command line for this specific change?"*
- If **YES** → use the CLI. A browser test is not a substitute.
- If **NO** (because it's genuinely visual) → browser test is appropriate.

### Test Suite Standard:
Every project with backend logic MUST have a `tests/` directory with:
- `tests/test_routing.py` — validates card ranking, exclusions, multipliers
- `tests/test_agents.py` — validates agent logic (debate output, schema compliance)
- All tests must be runnable via `pytest tests/` from the project root
- New features MUST include a corresponding test before being marked DONE.

**"DONE" for any backend feature requires `pytest tests/` passing, not a browser screenshot.**

---

# CRITICAL CORE INSTRUCTION: GEMINI API MODEL NAMING (2026 STANDARDS)

### THE RULE:
**You are FORBIDDEN from guessing Gemini model IDs. You MUST use the verified aliases for 2026 to avoid 404 NOT_FOUND errors.**

### Verified Model Aliases (As of March 2026):
- **Gemini 3.1 Flash Lite** → `gemini-3.1-flash-lite-preview`
- **Gemini 3.1 Pro** → `gemini-3.1-pro-preview`
- **Gemini 3 Flash** → `gemini-3-flash-preview`
- **Gemini 3 Pro** → `gemini-3-pro-preview`
- **Gemini 2.5 Flash** → `gemini-2.5-flash` (Stable)
- **Gemini 2.5 Pro** → `gemini-2.5-pro` (Stable)
- **Gemini 2.0 Flash** → `gemini-2.0-flash`
- **Gemini 2.0 Flash Lite** → `gemini-2.0-flash-lite`

### The Check:
If a model returns a 404, immediately run:
`python -c "from google import genai; client=genai.Client(api_key='...'); [print(m.name) for m in client.models.list()]"`
---

# CRITICAL CORE INSTRUCTION: SERVER MANAGEMENT

### THE RULE:
**You are FORBIDDEN from starting `uvicorn` with a bare `python -m uvicorn` command without first killing any process holding the target port.**

### The Authoritative Sequence (follow every single time):
1. **Kill the old process first:**
   `Get-Process -Id (Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force`
2. **Start the new server:**
   `python -m uvicorn api:app --host 0.0.0.0 --port 8000`
3. **Verify the server is up before making test calls:**
   `curl.exe -s http://localhost:8000/`
   Expected: `{"status":"Credit Card Council Agent API is running!"}`

### Why:
Background commands lose their PID. The old process silently holds the port and the new instance fails with `[WinError 10048]` without triggering a visible error in most cases. Verification in Step 3 catches this before any API calls are made.

**Use the `/restart-server` workflow for this.**
