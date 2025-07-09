// __tests__/geometry.test.js
const {
  Point,
  Segment,
  bruteForceIntersect,
  optmizedIntersect,
} = require("../geometry"); // ← path adjusted

/**
 * Helper function to create a segment from coordinates
 * @param {number} x1 - Start point x coordinate
 * @param {number} y1 - Start point y coordinate
 * @param {number} x2 - End point x coordinate
 * @param {number} y2 - End point y coordinate
 * @returns {Segment} New segment instance
 */
const seg = (x1, y1, x2, y2) =>
  new Segment(new Point(x1, y1), new Point(x2, y2));

describe("Intersection algorithms agree on geometry", () => {
  test.each`
    s1                     | s2                   | expected
    ${seg(0, 0, 10, 10)}   | ${seg(0, 10, 10, 0)} | ${new Point(5, 5)}
    ${seg(0, 0, 1, 0)}     | ${seg(0, 1, 1, 1)}   | ${null}
    ${seg(-1, -1, -2, -3)} | ${seg(1, 1, 2, 3)}   | ${null}
  `("brute vs optmized on %o", ({ s1, s2, expected }) => {
    const brute = bruteForceIntersect(s1, s2);
    const opt = optmizedIntersect(s1, s2);

    expect(equalish(brute, expected)).toBe(true);
    expect(equalish(opt, expected)).toBe(true);
  });
});

/**
 * Helper function for comparing nullable points with floating point tolerance
 * @param {Point|null} p - First point (or null)
 * @param {Point|null} q - Second point (or null)
 * @param {number} eps - Epsilon tolerance for comparison (default: 1e-6)
 * @returns {boolean} True if points are equal within tolerance
 */
const equalish = (p, q, eps = 1e-6) => {
  if (p === null || q === null) return p === q;
  return Math.abs(p.x - q.x) < eps && Math.abs(p.y - q.y) < eps;
};
