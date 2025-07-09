// src/geometry.js
// ────────────────────────────────────────────────────────────────
//  Basic 2-D primitives
// ────────────────────────────────────────────────────────────────
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }
}

// ────────────────────────────────────────────────────────────────
//  1. Brute-force sampler (slow but correct)
//     – default grid is now 300 × 300
// ────────────────────────────────────────────────────────────────
var DEFAULT_RES = 300;

function bruteForceIntersect(segA, segB, resolution = DEFAULT_RES, eps = 1e-9) {
  var lerp = (a, b, t) =>
    new Point(a.x + t * (b.x - a.x), a.y + t * (b.y - a.y));

  for (let i = 0; i <= resolution; ++i) {
    var pa = lerp(segA.p1, segA.p2, i / resolution);
    for (let j = 0; j <= resolution; ++j) {
      var pb = lerp(segB.p1, segB.p2, j / resolution);
      if (Math.abs(pa.x - pb.x) < eps && Math.abs(pa.y - pb.y) < eps) {
        return pa; // first near-collision ≈ intersection
      }
    }
  }
  return null; // no intersection
}

// ────────────────────────────────────────────────────────────────
//  2. Placeholder for the *future* optimized version
//     – still delegates to bruteForceIntersect for now
// ────────────────────────────────────────────────────────────────
function optmizedIntersect(segA, segB, eps = 1e-9) {
  // TODO: Copilot, rewrite this into an O(1) analytic determinant solution.
  return bruteForceIntersect(segA, segB, DEFAULT_RES, eps);
}

// ────────────────────────────────────────────────────────────────
module.exports = {
  Point,
  Segment,
  bruteForceIntersect,
  optmizedIntersect,
};
