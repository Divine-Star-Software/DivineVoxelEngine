import { Quad } from "@amodx/meshing/Primitives/Quad";
import { QuadVerticies } from "@amodx/meshing/Geometry.types";
import { Vector3Like } from "@amodx/math";
import { VoxelGeometryTransform } from "../../VoxelData/VoxelSyncData";

// Utility function to convert degrees to radians
function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

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
    const rotX = degreesToRadians(rotXDeg);
    const rotY = degreesToRadians(rotYDeg);
    const rotZ = degreesToRadians(rotZDeg);

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

export function TransformBox(
  quads: [Quad, Quad, Quad, Quad, Quad, Quad],
  transform: VoxelGeometryTransform
): [Quad, Quad, Quad, Quad, Quad, Quad] {
  // Collect all unique vertices from the quads
  const vertexMap = new Map<string, Vector3Like>();

  for (const quad of quads) {
    const vertices = [
      quad.positions.vertices[QuadVerticies.TopRight],
      quad.positions.vertices[QuadVerticies.TopLeft],
      quad.positions.vertices[QuadVerticies.BottomLeft],
      quad.positions.vertices[QuadVerticies.BottomRight],
    ];

    for (const vertex of vertices) {
      const key = `${vertex.x},${vertex.y},${vertex.z}`;
      if (!vertexMap.has(key)) {
        vertexMap.set(key, { ...vertex });
      }
    }
  }

  const uniqueVertices = Array.from(vertexMap.values());

  // Compute the centroid of the box
  const centroid = { x: 0, y: 0, z: 0 };
  for (const vertex of uniqueVertices) {
    centroid.x += vertex.x;
    centroid.y += vertex.y;
    centroid.z += vertex.z;
  }
  centroid.x /= uniqueVertices.length;
  centroid.y /= uniqueVertices.length;
  centroid.z /= uniqueVertices.length;

  let scaled = false;
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
    scaled = true;
  }

  // Apply flips by negating effective scales
  if (transform.flip) {
    const [flipX, flipY, flipZ] = transform.flip;
    if (flipX) effectiveScaleX *= -1;
    if (flipY) effectiveScaleY *= -1;
    if (flipZ) effectiveScaleZ *= -1;
    scaled = true;
  }

  // Compute determinant
  const determinant = effectiveScaleX * effectiveScaleY * effectiveScaleZ;

  if (scaled) {
    // Apply scaling and flips to each unique vertex
    for (const vertex of uniqueVertices) {
      vertex.x = centroid.x + (vertex.x - centroid.x) * effectiveScaleX;
      vertex.y = centroid.y + (vertex.y - centroid.y) * effectiveScaleY;
      vertex.z = centroid.z + (vertex.z - centroid.z) * effectiveScaleZ;
    }
  }

  // Rotate around a pivot point if specified
  if (transform.rotation) {
    const [rotXDeg, rotYDeg, rotZDeg] = transform.rotation;
    const rotX = degreesToRadians(rotXDeg);
    const rotY = degreesToRadians(rotYDeg);
    const rotZ = degreesToRadians(rotZDeg);


    const pivot = transform.rotationPivot
      ? {
          x: transform.rotationPivot[0],
          y: transform.rotationPivot[1],
          z: transform.rotationPivot[2],
        }
      : centroid;

  
    for (const vertex of uniqueVertices) {
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
    for (const vertex of uniqueVertices) {
      vertex.x += dx;
      vertex.y += dy;
      vertex.z += dz;
    }
  }

  // Update the quads with transformed vertices
  const transformedQuads: Quad[] = [];

  for (const quad of quads) {
    const originalVertices = [
      quad.positions.vertices[QuadVerticies.TopRight],
      quad.positions.vertices[QuadVerticies.TopLeft],
      quad.positions.vertices[QuadVerticies.BottomLeft],
      quad.positions.vertices[QuadVerticies.BottomRight],
    ];

    const transformedVertices = originalVertices.map((vertex) => {
      const key = `${vertex.x},${vertex.y},${vertex.z}`;
      return vertexMap.get(key)!;
    });

    // If determinant is negative, reverse the vertex order
    if (determinant < 0) {
      transformedVertices.reverse();
    }

    const newQuad = Quad.Create(
      transformedVertices.map((v) => Vector3Like.ToArray(v)) as any
    );
    transformedQuads.push(newQuad);
  }

  return transformedQuads as [Quad, Quad, Quad, Quad, Quad, Quad];
}
