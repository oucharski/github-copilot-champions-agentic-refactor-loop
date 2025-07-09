// __tests__/perf.test.js
// ────────────────────────────────────────────────────────────────
// Performance snapshot  +  log-to-file
//   • Default LOOPS  = 150
//   • Default RES    = 300
//   • Appends a bannered block to results.txt on every run
// ────────────────────────────────────────────────────────────────
const {
  Point,
  Segment,
  bruteForceIntersect,
  optmizedIntersect,
} = require("../geometry");
const { performance } = require("perf_hooks");
const fs = require("fs");
const path = require("path");

// ─── Tweaks (env-overridable) ──────────────────────────────────
const LOOPS = Number(process.env.LOOPS) || 150;
const RESOLUTION = Number(process.env.RESOLUTION) || 300;

// ─── Helpers ───────────────────────────────────────────────────
/**
 * Generates a random point within a range
 * @returns {Point} Random point between -500 and 500 on both axes
 */
const randP = () =>
  new Point(Math.random() * 1_000 - 500, Math.random() * 1_000 - 500);

/**
 * Generates a random line segment
 * @returns {Segment} Random segment with two random points
 */
const randSeg = () => new Segment(randP(), randP());

const cases = Array.from({ length: LOOPS }, () => [randSeg(), randSeg()]);

/**
 * Measures execution time of a function over all test cases
 * @param {Function} fn - Function to measure
 * @returns {number} Elapsed time in milliseconds
 */
const elapsed = (fn) => {
  const t0 = performance.now();
  for (const [a, b] of cases) fn(a, b);
  return performance.now() - t0;
};

// ─── Logging utility ──────────────────────────────────────────
/**
 * Appends performance results to results.txt with timestamp banner
 * @param {string} text - Performance summary text to append
 */
const appendResultsBlock = (text) => {
  const ts = new Date().toISOString();
  const head = `#################### ${ts} #######################\n`;
  const tail =
    "#####################################################################\n\n";
  const file = path.join(__dirname, "..", "results.txt");
  fs.appendFileSync(file, head + text + tail);
};

// ─── The actual test ──────────────────────────────────────────
test(`placeholder performance (LOOPS=${LOOPS}, RES=${RESOLUTION})`, () => {
  const bruteMs = elapsed((a, b) => bruteForceIntersect(a, b, RESOLUTION));
  const optMs = elapsed(optmizedIntersect);

  const summary =
    `LOOPS=${LOOPS}  RES=${RESOLUTION}\n` +
    `brute     : ${(bruteMs / LOOPS).toFixed(4)} ms / call\n` +
    `optmized  : ${(optMs / LOOPS).toFixed(4)} ms / call\n` +
    `speed-up  : ${(bruteMs / optMs).toFixed(1)}×\n`;

  // console output for interactive runs
  /* eslint-disable no-console */
  console.log(`\n─ perf snapshot ─\n${summary}`);
  /* eslint-enable  no-console */

  // log to file
  appendResultsBlock(summary);

  // Expect parity until Copilot rewrites optmizedIntersect
  expect(bruteMs / optMs).toBeGreaterThanOrEqual(1);
}, 10_000); // Jest timeout (ms)
