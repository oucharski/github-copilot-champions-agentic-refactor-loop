// __tests__/geometry.test.js
const {
  Point,
  Segment,
  bruteForceIntersect,
  optmizedIntersect,
} = require("../geometry"); // ← path adjusted

// Helper: quick segment builder
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

// Tiny helper for nullable / float comparisons
function equalish(p, q, eps = 1e-6) {
  if (p === null || q === null) return p === q;
  return Math.abs(p.x - q.x) < eps && Math.abs(p.y - q.y) < eps;
}
