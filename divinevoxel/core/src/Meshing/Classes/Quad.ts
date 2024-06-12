import { Vec2Array, Vec3Array, Vector2Like, Vector3Like } from "../../Math";
import { QuadVector2VertexData, QuadVector3VertexData } from "./VertexData";

export class Quad {
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

  static GetQuadNormal(
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

    return [n1, n2, n3, n4];
  }
  static CalculateQuadPoints(start: Vec3Array, end: Vec3Array) {
    const plane = start
      .map((value, index) => (end[index] !== value ? index : -1))
      .filter((index) => index !== -1);

    let topLeft: Vec3Array, bottomRight: Vec3Array;
    const topRight = end;
    const bottomLeft = start;

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
      //@ts-ignore
      points: [topRight, topLeft, bottomLeft, bottomRight],
      normal,
    } as const;
  }

  positions = new QuadVector3VertexData();
  normals = new QuadVector3VertexData();
  uvs = new QuadVector2VertexData();
  flip = false;
  doubleSided = false;
  orientation: 0 | 1 = 1;
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
    v4: Vec2Array
  ]) {
    this.uvs.set(
      Vector2Like.FromArray(v1),
      Vector2Like.FromArray(v2),
      Vector2Like.FromArray(v3),
      Vector2Like.FromArray(v4)
    );
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
      const [n1, n2, n3, n4] = Quad.GetQuadNormal(...positions);
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
  }
}
