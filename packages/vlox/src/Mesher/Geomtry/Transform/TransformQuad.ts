import { QuadVerticies,VoxelGeometryTransform } from "../Geometry.types";
import { Quad } from "../Primitives";
import { AMath, Vector3Like } from "@amodx/math";

export function TransformQuad(
  quad: Quad,
  transform: VoxelGeometryTransform
): Quad {
  const p1 = { ...quad.positions.vertices[QuadVerticies.TopRight] };
  const p2 = { ...quad.positions.vertices[QuadVerticies.TopLeft] };
  const p3 = { ...quad.positions.vertices[QuadVerticies.BottomLeft] };
  const p4 = { ...quad.positions.vertices[QuadVerticies.BottomRight] };

  // Create an array of vertices
  const vertices = [p1, p2, p3, p4];

  // Compute the centroid of the quad
  const centroid = {
    x: (p1.x + p2.x + p3.x + p4.x) / 4,
    y: (p1.y + p2.y + p3.y + p4.y) / 4,
    z: (p1.z + p2.z + p3.z + p4.z) / 4,
  };

  // Initialize effective scales
  let effectiveScaleX = 1;
  let effectiveScaleY = 1;
  let effectiveScaleZ = 1;

  // Apply scale if specified
  if (transform.scale) {
    const [scaleX, scaleY, scaleZ] = transform.scale;
    effectiveScaleX = scaleX;
    effectiveScaleY = scaleY;
    effectiveScaleZ = scaleZ;
  }

  // Apply flips by negating effective scales
  if (transform.flip) {
    const [flipX, flipY, flipZ] = transform.flip;
    if (flipX) effectiveScaleX *= -1;
    if (flipY) effectiveScaleY *= -1;
    if (flipZ) effectiveScaleZ *= -1;
  }

  // Compute determinant
  const determinant = effectiveScaleX * effectiveScaleY * effectiveScaleZ;

  // Apply scaling and flips
  for (const vertex of vertices) {
    vertex.x = centroid.x + (vertex.x - centroid.x) * effectiveScaleX;
    vertex.y = centroid.y + (vertex.y - centroid.y) * effectiveScaleY;
    vertex.z = centroid.z + (vertex.z - centroid.z) * effectiveScaleZ;
  }

  // Rotate vertices around the pivot point if rotation is specified
  if (transform.rotation) {
    const [rotXDeg, rotYDeg, rotZDeg] = transform.rotation;
    const rotX = AMath.DegreesToRadians(rotXDeg);
    const rotY = AMath.DegreesToRadians(rotYDeg);
    const rotZ = AMath.DegreesToRadians(rotZDeg);

    const pivot = transform.rotationPivot
      ? {
          x: transform.rotationPivot[0],
          y: transform.rotationPivot[1],
          z: transform.rotationPivot[2],
        }
      : centroid;

    for (const vertex of vertices) {
      // Translate vertex to pivot point
      let x = vertex.x - pivot.x;
      let y = vertex.y - pivot.y;
      let z = vertex.z - pivot.z;

      // Rotation around X-axis
      if (rotX) {
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        y = y1;
        z = z1;
      }

      // Rotation around Y-axis
      if (rotY) {
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        x = x1;
        z = z1;
      }

      // Rotation around Z-axis
      if (rotZ) {
        const cosZ = Math.cos(rotZ);
        const sinZ = Math.sin(rotZ);
        const x1 = x * cosZ - y * sinZ;
        const y1 = x * sinZ + y * cosZ;
        x = x1;
        y = y1;
      }

      // Translate vertex back from pivot point
      vertex.x = x + pivot.x;
      vertex.y = y + pivot.y;
      vertex.z = z + pivot.z;
    }
  }

  // Translate vertices if position is specified
  if (transform.position) {
    const [dx, dy, dz] = transform.position;
    for (const vertex of vertices) {
      vertex.x += dx;
      vertex.y += dy;
      vertex.z += dz;
    }
  }

  // If determinant is negative, reverse vertex order
  if (determinant < 0) {
    vertices.reverse();
  }

  // Create a new quad with the transformed vertices
  const transformedQuad = Quad.Create(
    vertices.map((vertex) => Vector3Like.ToArray(vertex)) as any
  );

  return transformedQuad;
}
