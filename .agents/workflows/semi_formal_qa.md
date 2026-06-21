---
description: Run the complete Semi-Formal Reasoning methodology to explore code, find bugs, or QA changes
---
# The Complete Semi-Formal Reasoning Protocol

This workflow implements the full "Agentic Code Reasoning" methodology (Meta, 2026). When you are asked to hunt for a bug, verify code, or explore a new codebase, you must strictly follow these templates rather than using unstructured guessing or arbitrary chain-of-thought.

There are four primary protocols. Depending on your current task, apply the relevant protocol.

## Core Constraint: Execution-Free Repository Analysis & Independent Probing
When working on verification or fault localization tasks, keep these constraints in mind:
* **No Repository Execution**: You must not execute the repository's main code or test suite directly.
* **No Git Cheating**: You must NOT use `git log`, `git blame`, or commit history to find answers. You must find the bug through code reasoning.
* **Independent Probing ALLOWED**: You are *highly encouraged* to write and run independent, small scratch scripts to verify general programming language behaviors, standard library quirks, or API edge cases (e.g., "how does Python's `regex` module handle this specific character?", or "does Python's built-in `format()` accept this type?").
* **100-Step Budget**: You have a strict budget of 100 steps/tool calls for any given task. If you cannot find the bug or verify the code within this limit, you must halt and yield your best guess. Do not enter infinite recursive loops.

---

## 1. Structured Exploration Protocol (For finding files & navigating)
**When to use:** Whenever you are tracing dependencies, investigating a bug, or reading files to understand how a codebase works. You must NOT blindly read files.
**How to use:** You must generate the EXACT literal template structure below:

```markdown
### When requesting a file:
HYPOTHESIS H[N]: [What you expect to find and why it may
                contain the bug]
EVIDENCE: [What from the test or previously read files
          supports this hypothesis]
CONFIDENCE: [high/medium/low]

### After reading a file:
OBSERVATIONS from [filename]:
O[N]: [Key observation about the code, with line numbers]
O[N]: [Another observation]

HYPOTHESIS UPDATE:
H[M]: [CONFIRMED | REFUTED | REFINED] - [Explanation]

UNRESOLVED:
- [What questions remain unanswered]
- [What other files/functions might need examination]

NEXT ACTION RATIONALE: [Why reading another file, or why
                       enough evidence to predict]
```

---

## 2. Fault Localization Protocol (For Bug Hunting)
**When to use:** When given a stack trace, bug report, or failing test.
**How to use:** Follow these 4 phases sequentially:

## Phase 1: Test Semantics Analysis
- What does the failing test method do step by step?
- What are the explicit assertions / expected exceptions?
- What is the expected behavior vs. the observed failure mode?
- State these as formal PREMISES:
PREMISE T1: The test calls X.method(args) and expects [behavior]
PREMISE T2: The test asserts [condition]
...

## Phase 2: Code Path Tracing
- Trace the execution path from the test’s entry point into production code
- For each significant method call, document:
METHOD: ClassName.methodName(params)
LOCATION: file:line
BEHAVIOR: what this method does
RELEVANT: why it matters to the test
- Build a call sequence showing the flow from test -> production code

## Phase 3: Divergence Analysis
- For each code path traced, identify where the implementation could diverge from the test’s expectations
- State divergences as formal claims:
CLAIM D1: At [file:line], [code] would produce [behavior] which contradicts PREMISE T[N] because [reason]
CLAIM D2: ...
- Each claim must reference a specific PREMISE and a specific code location

## Phase 4: Ranked Predictions
- Based on the divergence claims, produce ranked predictions
- Each prediction must cite the supporting CLAIM(s)
- **Bounding Box Rule:** You must explicitly identify the exact bounding box of the buggy region `(file, min_deleted_line, max_deleted_line)`. Do not vaguely point at a function.

---

## 3. Code QA / Verification Protocol (For verifying new logic)
**When to use:** Before finalizing a newly written feature, or when asked to verify logic.
**How to use:** You must generate the EXACT literal template structure below:

```markdown
FUNCTION TRACE TABLE:
| Function/Method | File:Line | Parameter Types | Return Type | Behavior (VERIFIED) |
|-----------------|-----------|-----------------|-------------|---------------------|
| [function1]     | [file:N]  | [param types]   | [ret type]  | [ACTUAL behavior]   |

DATA FLOW ANALYSIS:
Variable: [key variable name]
- Created at: [file:line]
- Modified at: [file:line(s), or ’NEVER MODIFIED’]
- Used at: [file:line(s)]

SEMANTIC PROPERTIES:
Property 1: [e.g., ’HashMap is mutable’]
- Evidence: [specific file:line]

ALTERNATIVE HYPOTHESIS CHECK:
If the opposite answer were true, what evidence would exist?
- Searched for: [what you looked for]
- Found: [what you found - cite file:line]
- Conclusion: [REFUTED / SUPPORTED]

<answer>[Final answer with explicit evidence]</answer>

CONFIDENCE: [HIGH/MEDIUM/LOW]
```

---

## 4. Patch Equivalence Protocol
**When to use:** When checking if a refactor or alternative patch behaves identically to the original.
**How to use:** You must generate the EXACT literal template structure below:

```markdown
DEFINITIONS:
D1: Two patches are EQUIVALENT MODULO TESTS iff executing the
    existing repository test suite produces identical pass/fail
    outcomes for both patches.
D2: The relevant tests are ONLY those in FAIL_TO_PASS and
    PASS_TO_PASS (the existing test suite in the repository).

PREMISES (state what each patch does):
P1: Patch 1 modifies [file(s)] by [specific change description]
P2: Patch 2 modifies [file(s)] by [specific change description]
P3: The FAIL_TO_PASS tests check [specific behavior being tested]
P4: The PASS_TO_PASS tests check [specific behavior, if relevant]

ANALYSIS OF TEST BEHAVIOR:
For FAIL_TO_PASS test(s):
Claim 1.1: With Patch 1 applied, test [name] will [PASS/FAIL]
           because [trace through the code behavior]
Claim 1.2: With Patch 2 applied, test [name] will [PASS/FAIL]
           because [trace through the code behavior]
Comparison: [SAME/DIFFERENT] outcome

For PASS_TO_PASS test(s) (if patches could affect them differently):
Claim 2.1: With Patch 1 applied, test behavior is [description]
Claim 2.2: With Patch 2 applied, test behavior is [description]
Comparison: [SAME/DIFFERENT] outcome

EDGE CASES RELEVANT TO EXISTING TESTS:
(Only analyze edge cases that the ACTUAL tests exercise)

E1: [Edge case that existing tests exercise]
- Patch 1 behavior: [specific output/behavior]
- Patch 2 behavior: [specific output/behavior]
- Test outcome same: [YES/NO]

COUNTEREXAMPLE (required if claiming NOT EQUIVALENT):
Test [name] will [PASS/FAIL] with Patch 1 because [reason]
Test [name] will [FAIL/PASS] with Patch 2 because [reason]
Therefore patches produce DIFFERENT test outcomes.

OR

NO COUNTEREXAMPLE EXISTS (required if claiming EQUIVALENT):
All existing tests produce identical outcomes because [reason]

FORMAL CONCLUSION:
By Definition D1:
- Test outcomes with Patch 1: [PASS/FAIL for each test]
- Test outcomes with Patch 2: [PASS/FAIL for each test]
- Since test outcomes are [IDENTICAL/DIFFERENT], patches are
  [EQUIVALENT/NOT EQUIVALENT] modulo the existing tests.

ANSWER: [YES/NO]
```

---

## 5. Data Equivalence & Schema Minimalism Protocol
**When to use:** Before creating arbitrary new database tables, introducing new data models, or adding persistence layers to an existing architecture.
**How to use:** You must generate the EXACT literal template structure below to prove that the new data structure does not duplicate existing context:

```markdown
DATA DISCOVERY PHASE:
- [List 1-3 places in the codebase where similar domain data (e.g., 'users', 'cards', 'transactions') is already handled]
- [Identify the exact database tables or JSON files currently storing this data]

SCHEMA PROPOSAL:
- Proposed Table/Files: [Name of the new storage layer]
- Proposed Columns/Fields: [List them]

REDUNDANCY ANALYSIS:
Claim 1: The proposed schema [DOES / DOES NOT] overlap with existing table [Table Name].
- Evidence: [Why it overlaps or captures entirely new domain concepts]

Claim 2: The existing architecture [CAN / CANNOT] handle this new requirement with a simple JOIN or a new foreign key.
- Evidence: [Explain why a new table is absolutely necessary vs extending the old one]

CONCLUSION:
Based on the discovery, the most minimalist approach is:
[CREATE NEW TABLE | EXTEND EXISTING TABLE | REUSE EXISTING TABLE]

CONFIDENCE: [HIGH/MEDIUM/LOW]
```

---

## 6. Code Minimalism & Refactoring Protocol
**When to use:** Before writing *any* new function, utility, or component that handles standard domain logic (e.g., API requests, string parsing, data validation, UI components).
**How to use:** You must generate the EXACT literal template structure below to prove that you are not duplicating existing logic:

```markdown
CODE DISCOVERY PHASE:
- Functionality Required: [Brief description, e.g., 'Fetch user wallet from DB']
- Searching for existing implementions...
  - Searched files: [List files checked via `grep_search` or `view_file`]
  - Found partial/full matches: [Yes/No - List them]

DUPLICATION ANALYSIS:
Claim 1: The required functionality [DOES / DOES NOT] overlap with existing method [Method Name] in [File].
- Evidence: [Explain the overlap]

Claim 2: It is [MORE / LESS] efficient to refactor/parameterize the existing method than to write a new one.
- Evidence: [Explain the trade-offs (e.g., 'Adding one boolean flag to existing `fetch_data()` prevents 50 lines of duplicate code')]

CONCLUSION:
Based on the discovery, the most minimalist approach is:
[CREATE NEW FUNCTION | REFACTOR EXISTING FUNCTION | IMPORT & REUSE EXISTING FUNCTION]

CONFIDENCE: [HIGH/MEDIUM/LOW]
```

---

## 8. Environmental Integration & Side-Effect Protocol
**When to use:** Before finalizing any change that interacts with the OS, Registry, external applications (Office, Adobe, etc.), or specific file system paths (APPDATA, Program Files).
**How to use:** You must generate the EXACT literal template structure below:

```markdown
ENVIRONMENTAL TRACE (READINESS & STATE):
| Dependency | Logic Check | OS/External State | Readiness (PROBED) | Status |
|------------|-------------|-------------------|-------------------|--------|
| [Comp Name]| [Script action]| [Registry/Path/App] | [Latency/Race Probe] | [VERIFIED] |

LIFECYCLE & STATE INTEGRITY:
- Dependency Type: [Static (Config) | Stateful (Process/Network)]
- Readiness Probe: [How you empirically verified the target is ready to receive commands (e.g., polling check, latency test)]
- Idempotency: [Does multi-run corrupt?]
- Consumer-Side: [Namespace/Encoding verification]

SIDE-EFFECT HYPOTHESIS:
What OTHER system settings or paths might be affected implicitly?
- Path/Key: [investigated path]
- Result: [Observed behavior]

<answer>[Final integration-safe answer]</answer>

INTEGRATION CONFIDENCE: [ULTRA/HIGH/MEDIUM/LOW]
```

---

## 9. WARNINGS: Known LLM Failure Modes (Meta Documented)
The Meta researchers explicitly identified that even with Semi-Formal Reasoning, LLMs still fall into these specific, predictable traps. You must actively defend against them:
1. **Incomplete Execution Tracing (Code QA):** You might trace 5 functions perfectly, find a failing edge case, and confidently declare a bug. *TRAP:* You failed to check if the downstream code (e.g., the constructor) already handles your edge case safely. *RULE:* Do not stop tracing when you find an error; trace the entire lifecycle to see if the error is caught downstream.
2. **Third-Party Library Semantics (Patch Equivalence):** You might guess the behavior of `format()` based on standard Python, completely missing that the current repository overrides it with custom semantics. *RULE:* Never guess. Always check if a function is standard library or defined locally.
3. **Dismissing Subtle Differences (Patch Equivalence):** You might identify semantic differences between two patches but arbitrarily conclude "they don't affect test outcomes." *RULE:* If a difference exists, assume it affects outcomes unless explicitly mathematically proven otherwise.
4. **Indirection Bugs (Fault Localization):** The failing test calls `ClassA.parse()`, but the bug actually lives inside `ClassB.configure()`, which `ClassA` inherited or called invisibly. *RULE:* Check base classes and configuration scopes when tracing faults.
5. **Multi-File Bugs (Fault Localization):** The ground truth fix spans 2+ files. LLMs tend to find the first broken line, declare victory, and stop. *RULE:* Always ask yourself if fixing the current divergence truly resolves the *entire* semantic issue, or if a corresponding change is needed in a related file.
6. **Domain-Specific Bugs Constraints:** Algorithmic bugs requiring highly specialized knowledge (like numerical analysis/eigen decompositions) often exceed LLM domain expertise. *RULE:* Acknowledge computational limits and favor independent probing.
7. **Temporal Race Conditions (Environmental Integration):** You verified the registry and file paths exist (Static State), but failed to account for the target process taking time to "warm up" (Dynamic State). *TRAP:* Automated code (COM/IPC) fails because the target app is busy initializing. *RULE:* Do not assume existence equals readiness. Always probe for the "Point of Failure" in latency during QA.
