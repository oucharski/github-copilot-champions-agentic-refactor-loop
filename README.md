# Geometry Primitives Sandbox

A minimal JavaScript project that models **2‑D geometry primitives** and deliberately leaves room for performance tuning and style refactoring.  
It’s designed as a playground for automated code‑review tools, AI assistants, or humans who want quick practice optimizing algorithms and enforcing code style.

---

## What’s Inside?

| Path | Purpose |
|------|---------|
| `src/geometry.js` | Core library with `Point`, `Segment`, a *slow but correct* `bruteForceIntersect`, and a placeholder `optimizedIntersect`. |
| `docs/guidelines.md` | The project’s **code‑style guidelines** (arrow functions, `const/let`, 2‑space indent, etc.). |
| `prompsts.md` | Example prompts that ask an AI to (1) optimize `optimizedIntersect` and (2) apply the style guide across the codebase. |

---

## Quick Start

1. **Clone** the repo  
   ```bash
   git clone <your‑fork‑url>
   cd geometry‑sandbox
   ```

2. **Install** (Node ≥ 18; no external deps yet)  
   ```bash
   npm install
   ```

3. **Run the test suite**  
   ```bash
   npm test
   ```
   The test runner writes a plain‑text summary to **results.txt**. Open that file to see current performance numbers and any failing cases.

4. **Improve the code with AI**  
   * Open **docs/prompsts.md** and feed the **Optimize `optimizedIntersect`** prompt to your agentic AI assistant.  
   * Ask the AI to refactor in place and commit the changes.

5. **Re‑run the tests**  
   ```bash
   npm test
   ```
   Compare the new **results.txt** with the previous run. You should see dramatically better timing for `optimizedIntersect` while still passing all correctness checks.

---

## Why Two Intersect Functions?

* **`bruteForceIntersect`**  
  *Grid‑sampling reference implementation.* Always correct, slow for high resolution.

* **`optimizedIntersect`**  
  Placeholder waiting for you (or an AI) to implement an **O(1)** analytic solution.

---

## License

MIT — do anything, but don’t blame us.
