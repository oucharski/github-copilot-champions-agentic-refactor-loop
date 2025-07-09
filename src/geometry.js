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
const DEFAULT_RES = 300;

/**
 * Finds intersection between two line segments using brute-force sampling
 * @param {Segment} segA - First line segment
 * @param {Segment} segB - Second line segment
 * @param {number} resolution - Grid resolution for sampling (default: 300)
 * @param {number} eps - Epsilon for collision detection (default: 1e-9)
 * @returns {Point|null} Intersection point or null if no intersection
 */
const bruteForceIntersect = (segA, segB, resolution = DEFAULT_RES, eps = 1e-9) => {
  const lerp = (a, b, t) =>
    new Point(a.x + t * (b.x - a.x), a.y + t * (b.y - a.y));

  for (let i = 0; i <= resolution; ++i) {
    const pa = lerp(segA.p1, segA.p2, i / resolution);
    for (let j = 0; j <= resolution; ++j) {
      const pb = lerp(segB.p1, segB.p2, j / resolution);
      if (Math.abs(pa.x - pb.x) < eps && Math.abs(pa.y - pb.y) < eps) {
        return pa; // first near-collision ≈ intersection
      }
    }
  }
  return null; // no intersection
};

// ────────────────────────────────────────────────────────────────
//  2. O(1) analytical intersection using parametric line equations
//     – computes exact intersection using determinants
// ────────────────────────────────────────────────────────────────
/**
 * Finds intersection between two line segments using analytical computation
 * @param {Segment} segA - First line segment
 * @param {Segment} segB - Second line segment
 * @param {number} eps - Epsilon for numerical stability (default: 1e-9)
 * @returns {Point|null} Intersection point or null if no intersection
 */
const optmizedIntersect = (segA, segB, eps = 1e-9) => {
  // Extract points for readability
  const x1 = segA.p1.x, y1 = segA.p1.y;
  const x2 = segA.p2.x, y2 = segA.p2.y;
  const x3 = segB.p1.x, y3 = segB.p1.y;
  const x4 = segB.p2.x, y4 = segB.p2.y;

  // Direction vectors
  const dx1 = x2 - x1, dy1 = y2 - y1;
  const dx2 = x4 - x3, dy2 = y4 - y3;

  // Determinant of the direction vectors
  const det = dx1 * dy2 - dy1 * dx2;

  // If determinant is zero, lines are parallel
  if (Math.abs(det) < eps) {
    // Check if lines are collinear by testing if one point lies on the other line
    const cross1 = (x3 - x1) * dy1 - (y3 - y1) * dx1;
    if (Math.abs(cross1) < eps) {
      // Lines are collinear - check for overlap
      // Project all points onto the line with larger direction component for numerical stability
      const absX = Math.abs(dx1);
      const absY = Math.abs(dy1);
      
      let t1_start, t1_end, t2_start, t2_end;
      
      if (absX >= absY) {
        // Project onto x-axis
        if (Math.abs(dx1) < eps) return null; // Degenerate segment
        t1_start = 0;
        t1_end = 1;
        t2_start = (x3 - x1) / dx1;
        t2_end = (x4 - x1) / dx1;
      } else {
        // Project onto y-axis
        if (Math.abs(dy1) < eps) return null; // Degenerate segment
        t1_start = 0;
        t1_end = 1;
        t2_start = (y3 - y1) / dy1;
        t2_end = (y4 - y1) / dy1;
      }
      
      // Ensure t2_start <= t2_end
      if (t2_start > t2_end) {
        [t2_start, t2_end] = [t2_end, t2_start];
      }
      
      // Find overlap
      const overlap_start = Math.max(t1_start, t2_start);
      const overlap_end = Math.min(t1_end, t2_end);
      
      if (overlap_start <= overlap_end + eps) {
        // There is overlap - return the midpoint of overlap
        const t_mid = (overlap_start + overlap_end) / 2;
        return new Point(x1 + t_mid * dx1, y1 + t_mid * dy1);
      }
    }
    return null; // Parallel lines with no intersection
  }

  // Calculate parameters for intersection point
  const t = ((x3 - x1) * dy2 - (y3 - y1) * dx2) / det;
  const u = ((x3 - x1) * dy1 - (y3 - y1) * dx1) / det;

  // Check if intersection point lies within both line segments
  if (t >= -eps && t <= 1 + eps && u >= -eps && u <= 1 + eps) {
    // Calculate intersection point
    const ix = x1 + t * dx1;
    const iy = y1 + t * dy1;
    return new Point(ix, iy);
  }

  return null; // Intersection exists but outside segment bounds
};

// ────────────────────────────────────────────────────────────────
module.exports = {
  Point,
  Segment,
  bruteForceIntersect,
  optmizedIntersect,
};
