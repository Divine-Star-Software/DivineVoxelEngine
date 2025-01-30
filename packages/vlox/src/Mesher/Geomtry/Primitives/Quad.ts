import {
  Mat3Array,
  Matrix3x3Like,
  Vec2Array,
  Vec3Array,
  Vector2Like,
  Vector3Like,
} from "@amodx/math";
import { QuadVector2VertexData, QuadVector3VertexData } from "./QuadVertexData";
import {
  QuadUVData,
  QuadVertexVec3Data,
  QuadVerticies,
} from "../Geometry.types";

export class Quad {
  static FullUVs: Readonly<QuadUVData> = Object.freeze([
    [1, 1],
    [0, 1],
    [0, 0],
    [1, 0],
  ]);
  static RotateUvs(
    uvs: QuadUVData | Readonly<QuadUVData>,
    rotation: number
  ): QuadUVData {
    const rotationMatrix: Mat3Array = Matrix3x3Like.RotationZ(rotation);
    const pivot: Vec2Array = [0.5, 0.5];
    const rotatedUVs: [Vec2Array, Vec2Array, Vec2Array, Vec2Array] = [
      Vector2Like.RotateAroundPivotArray(rotationMatrix, uvs[0], pivot),
      Vector2Like.RotateAroundPivotArray(rotationMatrix, uvs[1], pivot),
      Vector2Like.RotateAroundPivotArray(rotationMatrix, uvs[2], pivot),
      Vector2Like.RotateAroundPivotArray(rotationMatrix, uvs[3], pivot),
    ];
    return rotatedUVs;
  }

  static Create(
    positions?:
      | [Vec3Array, Vec3Array]
      | [Vec3Array, Vec3Array, Vec3Array, Vec3Array],
    uvs?: [Vec2Array, Vec2Array, Vec2Array, Vec2Array],
    doubleSided?: boolean,
    orientation?: 0 | 1
  ) {
    return new Quad({ positions, uvs, doubleSided, orientation });
  }

  static RotateVertices90Degrees(
    vertices: [QuadVerticies, QuadVerticies, QuadVerticies, QuadVerticies],
    times = 1
  ): [QuadVerticies, QuadVerticies, QuadVerticies, QuadVerticies] {
    while (times--) {
      vertices = [vertices[1], vertices[2], vertices[3], vertices[0]];
    }
    return vertices;
  }

  static GetQuadNormalRightHanded(
    p1: Vec3Array,
    p2: Vec3Array,
    p3: Vec3Array,
    p4: Vec3Array
  ): [n1: Vec3Array, n2: Vec3Array, n3: Vec3Array, n4: Vec3Array] {
    const vectorA1: Vec3Array = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
    const vectorA2: Vec3Array = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]];
    const normalA = Vector3Like.NormalizeArray(
      Vector3Like.CrossArray(vectorA1, vectorA2)
    );
    const vectorB1: Vec3Array = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]];
    const vectorB2: Vec3Array = [p4[0] - p1[0], p4[1] - p1[1], p4[2] - p1[2]];
    const normalB = Vector3Like.NormalizeArray(
      Vector3Like.CrossArray(vectorB1, vectorB2)
    );
    const n1 = Vector3Like.NormalizeArray([
      (normalA[0] + normalB[0]) / 2,
      (normalA[1] + normalB[1]) / 2,
      (normalA[2] + normalB[2]) / 2,
    ]);
    const n2 = normalA;
    const n3 = Vector3Like.NormalizeArray([
      (normalA[0] + normalB[0]) / 2,
      (normalA[1] + normalB[1]) / 2,
      (normalA[2] + normalB[2]) / 2,
    ]);
    const n4 = normalB;
    const normals: any = [n1, n2, n3, n4];

    for (let i = 0; i < normals.length; i++) {
      const n = normals[i];
      for (let j = 0; j < 3; j++) {
        if (Math.abs(n[j]) === 0) n[j] = 0;
      }
    }
    return normals;
  }
  static GetQuadNormalLeftHanded(
    p1: Vec3Array,
    p2: Vec3Array,
    p3: Vec3Array,
    p4: Vec3Array
  ): [n1: Vec3Array, n2: Vec3Array, n3: Vec3Array, n4: Vec3Array] {
    const vectorA1: Vec3Array = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
    const vectorA2: Vec3Array = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]];
    // Reverse the cross product direction for left-handed system
    const normalA = Vector3Like.MultiplyScalarArray(
      Vector3Like.NormalizeArray(Vector3Like.CrossArray(vectorA1, vectorA2)),
      -1
    );

    const vectorB1: Vec3Array = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]];
    const vectorB2: Vec3Array = [p4[0] - p1[0], p4[1] - p1[1], p4[2] - p1[2]];
    // Reverse the cross product direction for left-handed system
    const normalB = Vector3Like.MultiplyScalarArray(
      Vector3Like.NormalizeArray(Vector3Like.CrossArray(vectorB1, vectorB2)),
      -1
    );

    const n1 = Vector3Like.NormalizeArray([
      (normalA[0] + normalB[0]) / 2,
      (normalA[1] + normalB[1]) / 2,
      (normalA[2] + normalB[2]) / 2,
    ]);
    const n2 = normalA;
    const n3 = Vector3Like.NormalizeArray([
      (normalA[0] + normalB[0]) / 2,
      (normalA[1] + normalB[1]) / 2,
      (normalA[2] + normalB[2]) / 2,
    ]);
    const n4 = normalB;

    const normals: any = [n1, n2, n3, n4];

    for (let i = 0; i < normals.length; i++) {
      const n = normals[i];
      for (let j = 0; j < 3; j++) {
        if (Math.abs(n[j]) === 0) n[j] = 0;
      }
    }
    return normals;
  }
  static CalculateQuadPoints(
    start: Vec3Array,
    end: Vec3Array
  ): {
    points: QuadVertexVec3Data;
    normal: Vec3Array;
  } {
    const plane = start
      .map((value, index) => (end[index] !== value ? index : -1))
      .filter((index) => index !== -1);

    let topLeft: Vec3Array, bottomRight: Vec3Array;
    const topRight: Vec3Array = end;
    const bottomLeft: Vec3Array = start;

    if (plane.includes(0) && plane.includes(2)) {
      // XZ plane
      topLeft = [start[0], start[1], end[2]];
      bottomRight = [end[0], start[1], start[2]];
    } else if (plane.includes(0) && plane.includes(1)) {
      // XY plane
      topLeft = [start[0], end[1], start[2]];
      bottomRight = [end[0], start[1], start[2]];
    } else if (plane.includes(1) && plane.includes(2)) {
      // YZ plane
      topLeft = [start[0], end[1], start[2]];
      bottomRight = [start[0], start[1], end[2]];
    }

    const delta = [end[0] - start[0], end[1] - start[1], end[2] - start[2]];

    let normal: Vec3Array = [0, 0, 0];
    if (delta[0] === 0) {
      // Constant X, so normal is along X
      normal[0] = 1;
    } else if (delta[1] === 0) {
      // Constant Y, so normal is along Y
      normal[1] = 1;
    } else if (delta[2] === 0) {
      // Constant Z, so normal is along Z
      normal[2] = 1;
    }

    return {
      points: [topRight, topLeft!, bottomLeft, bottomRight!],
      normal,
    };
  }

  static OrderQuadVertices(
    vertices: [Vec3Array, Vec3Array, Vec3Array, Vec3Array],
    direction: "north" | "south" | "east" | "west" | "up" | "down"
  ): [Vec3Array, Vec3Array, Vec3Array, Vec3Array] {
    const projections = {
      north: (v: Vec3Array) => [v[0], v[1]] as Vec2Array,
      south: (v: Vec3Array) => [v[0], v[1]] as Vec2Array,
      east: (v: Vec3Array) => [v[2], v[1]] as Vec2Array,
      west: (v: Vec3Array) => [v[2], v[1]] as Vec2Array,
      up: (v: Vec3Array) => [v[0], v[2]] as Vec2Array,
      down: (v: Vec3Array) => [v[0], v[2]] as Vec2Array,
    };

    // Project vertices onto the 2D plane
    const projectedVertices = vertices.map((v) => projections[direction](v));

    // Calculate the center of the quad
    const center: Vec2Array = [
      (projectedVertices[0][0] +
        projectedVertices[1][0] +
        projectedVertices[2][0] +
        projectedVertices[3][0]) /
        4,
      (projectedVertices[0][1] +
        projectedVertices[1][1] +
        projectedVertices[2][1] +
        projectedVertices[3][1]) /
        4,
    ];

    // Function to calculate the angle relative to the center
    const angleFromCenter = (v: Vec2Array) =>
      Math.atan2(v[1] - center[1], v[0] - center[0]);

    // Map vertices to their angles
    const verticesWithAngles = vertices.map((v, i) => ({
      vertex: v,
      angle: angleFromCenter(projectedVertices[i]),
    }));

    // Sort vertices by angle
    verticesWithAngles.sort((a, b) => a.angle - b.angle);

    // Return sorted vertices in the order of Top Right, Top Left, Bottom Left, Bottom Right
    return [
      verticesWithAngles[2].vertex,
      verticesWithAngles[3].vertex,
      verticesWithAngles[0].vertex,
      verticesWithAngles[1].vertex,
    ];
  }

  positions = new QuadVector3VertexData();
  normals = new QuadVector3VertexData();
  uvs = new QuadVector2VertexData();
  flip = false;
  doubleSided = false;
  orientation: 0 | 1 = 0;

  constructor(data: {
    positions?:
      | [Vec3Array, Vec3Array]
      | [Vec3Array, Vec3Array, Vec3Array, Vec3Array];
    uvs?: [Vec2Array, Vec2Array, Vec2Array, Vec2Array];
    doubleSided?: boolean;
    orientation?: 0 | 1;
  }) {
    if (data.positions) this.setPositions(data.positions);
    if (data.uvs) this.setUVs(data.uvs);
    if (data.doubleSided) this.doubleSided = data.doubleSided;
    if (data.orientation !== undefined) this.orientation = data.orientation;
  }

  setUVs([v1, v2, v3, v4]: [
    v1: Vec2Array,
    v2: Vec2Array,
    v3: Vec2Array,
    v4: Vec2Array,
  ]) {
    this.uvs.set(
      Vector2Like.FromArray(v1),
      Vector2Like.FromArray(v2),
      Vector2Like.FromArray(v3),
      Vector2Like.FromArray(v4)
    );
    return this;
  }

  scale(x: number, y: number, z: number) {
    const scale = Vector3Like.Create(x, y, z);
    for (const position of this.positions) {
      Vector3Like.MultiplyInPlace(position, scale);
    }
    return this;
  }

  transform(x: number, y: number, z: number) {
    const transform = Vector3Like.Create(x, y, z);
    for (const position of this.positions) {
      Vector3Like.AddInPlace(position, transform);
    }
    return this;
  }

  setPositions(
    positions:
      | [Vec3Array, Vec3Array]
      | [Vec3Array, Vec3Array, Vec3Array, Vec3Array]
  ) {
    if (positions.length == 2) {
      const { points, normal } = Quad.CalculateQuadPoints(
        positions[0],
        positions[1]
      );

      this.positions.set(
        Vector3Like.FromArray(points[0]),
        Vector3Like.FromArray(points[1]),
        Vector3Like.FromArray(points[2]),
        Vector3Like.FromArray(points[3])
      );
      this.normals.set(
        Vector3Like.FromArray(normal),
        Vector3Like.FromArray(normal),
        Vector3Like.FromArray(normal),
        Vector3Like.FromArray(normal)
      );
    }
    if (positions.length == 4) {
      const [n1, n2, n3, n4] = Quad.GetQuadNormalLeftHanded(...positions);
      this.positions.set(
        Vector3Like.FromArray(positions[0]),
        Vector3Like.FromArray(positions[1]),
        Vector3Like.FromArray(positions[2]),
        Vector3Like.FromArray(positions[3])
      );
      this.normals.set(
        Vector3Like.FromArray(n1),
        Vector3Like.FromArray(n2),
        Vector3Like.FromArray(n3),
        Vector3Like.FromArray(n4)
      );
    }
    return this;
  }

  clone() {
    return Quad.Create(
      this.positions
        .getAsArray()
        .map((_) => Vector3Like.ToArray(_)) as QuadVertexVec3Data,
      this.uvs.getAsArray().map((_) => Vector2Like.ToArray(_)) as QuadUVData
    );
  }
}
