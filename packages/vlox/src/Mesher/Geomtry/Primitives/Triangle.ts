import {
  Mat3Array,
  Matrix2x2Like,
  Matrix3x3Like,
  Vec2Array,
  Vec2ArrayLike,
  Vec3Array,
  Vec3ArrayLike,
  Vector2Like,
  Vector3Like,
} from "@amodx/math";
import {
  TriangleScalarVertexData,
  TriangleVector2VertexData,
  TriangleVector3VertexData,
} from "./TriangleVertexData";
import { GetBounds } from "../Functions/GetBounds";
// You would import the triangle-based vertex-data classes here, e.g.:
// import { TriVector3VertexData, TriVector2VertexData } from "./TriVertexData";
// or however you have named them and placed them in your codebase.
//
// For example:
// import { TriUVData, TriVertexVec3Data } from "../Geometry.types";

/**
 * Example "TriUVData" type for clarity:
 * export type TriUVData = [Vec2Array, Vec2Array, Vec2Array];
 *
 * Example "TriVertexVec3Data" type:
 * export type TriVertexVec3Data = [Vec3Array, Vec3Array, Vec3Array];
 */

export class Triangle {
  /**
   * A simple set of "full" UVs for a triangle, in whichever ordering convention you prefer.
   * Adapt this to your own standard. Below is just a quick example:
   */
  static FullUVs: Readonly<[Vec2Array, Vec2Array, Vec2Array]> = Object.freeze([
    [0, 0], // p1
    [1, 0], // p2
    [0, 1], // p3
  ]);

  /**
   * Rotate triangle UVs about a pivot, defaulting to [0.5, 0.5] if you wish (or you can adapt).
   * This example matches the style of the Quad rotation.
   */
  static RotateUvs(
    uvs: [Vec2Array, Vec2Array, Vec2Array],
    rotation: number
  ): [Vec2Array, Vec2Array, Vec2Array] {
    const rotationMatrix = Matrix2x2Like.Rotation(rotation);
    const pivot: Vec2Array = [0.5, 0.5];

    return [
      Vec2ArrayLike.RotateAroundPivot(rotationMatrix, uvs[0], pivot),
      Vec2ArrayLike.RotateAroundPivot(rotationMatrix, uvs[1], pivot),
      Vec2ArrayLike.RotateAroundPivot(rotationMatrix, uvs[2], pivot),
    ];
  }

  /**
   * Factory method for creating a Tri instance.
   */
  static Create(
    positions?: [Vec3Array, Vec3Array, Vec3Array],
    uvs?: [Vec2Array, Vec2Array, Vec2Array],
    doubleSided?: boolean
  ) {
    return new Triangle({ positions, uvs, doubleSided });
  }

  /**
   * Computes a right-handed normal for a triangle given three points p1, p2, p3.
   * The cross product is (p2 - p1) x (p3 - p1).
   * This returns a single normal, but we place it in a triple for each vertex
   * in case you want distinct normal per vertex.
   */
  static GetNormalRightHanded(
    p1: Vec3Array,
    p2: Vec3Array,
    p3: Vec3Array
  ): [Vec3Array, Vec3Array, Vec3Array] {
    const v1 = Vec3ArrayLike.Subtract(p2, p1);
    const v2 = Vec3ArrayLike.Subtract(p3, p1);
    const normal = Vec3ArrayLike.Normalize(Vec3ArrayLike.Cross(v1, v2));
    // By default, each vertex gets the same face-normal (flat shading).
    return [normal, normal, normal];
  }

  /**
   * Computes a left-handed normal for a triangle. This is simply flipping the sign
   * of the right-handed normal (or reversing the cross).
   */
  static GetNormalLeftHanded(
    p1: Vec3Array,
    p2: Vec3Array,
    p3: Vec3Array
  ): [Vec3Array, Vec3Array, Vec3Array] {
    const v1 = Vec3ArrayLike.Subtract(p2, p1);
    const v2 = Vec3ArrayLike.Subtract(p3, p1);
    // Multiply by -1 for a left-handed version
    const normal = Vec3ArrayLike.MultiplyScalar(
      Vec3ArrayLike.Normalize(Vec3ArrayLike.Cross(v1, v2)),
      -1
    );
    return [normal, normal, normal];
  }

  // If you need an equivalent "OrderTriVertices" or any other specialized
  // re-ordering method, you can add it here. For many triangle uses, you
  // might not need a sorting or "direction" function as in the Quad.

  // Replace these with your own triangle-based vertex-data classes:
  // e.g. TriVector3VertexData, TriVector2VertexData, etc.
  positions /*: TriVector3VertexData*/;
  normals /*: TriVector3VertexData*/;
  uvs /*: TriVector2VertexData*/;
  doubleSided = false;
  bounds: [min: Vec3Array, max: Vec3Array] = [
    [0, 0, 0],
    [0, 0, 0],
  ];
  constructor(data: {
    positions?: [Vec3Array, Vec3Array, Vec3Array];
    uvs?: [Vec2Array, Vec2Array, Vec2Array];
    doubleSided?: boolean;
  }) {
    // Replace these with your Tri* vertex data:
    // (The code below assumes you have classes like TriVector3VertexData, TriVector2VertexData
    //  that behave similarly to your Quad-based classes.)
    this.positions = new TriangleVector3VertexData();
    this.normals = new TriangleVector3VertexData();
    this.uvs = new TriangleVector2VertexData();

    if (data.positions) this.setPositions(data.positions);
    if (data.uvs) this.setUVs(data.uvs);
    if (data.doubleSided) this.doubleSided = data.doubleSided;
  }

  setUVs([uv1, uv2, uv3]: [Vec2Array, Vec2Array, Vec2Array]) {
    this.uvs.vertices[0].x = uv1[0];
    this.uvs.vertices[0].y = uv1[1];
    this.uvs.vertices[0].x = uv1[0];
    this.uvs.vertices[0].y = uv1[1];

    // e.g. this.uvs.set(Vector2Like.FromArray(uv1), Vector2Like.FromArray(uv2), Vector2Like.FromArray(uv3));
    // Adapt to however your TriVector2VertexData sets 3 corners.
    return this;
  }

  /**
   * Scales all positions of the triangle by the given x, y, z factors.
   */
  scale(x: number, y: number, z: number) {
    const scale = Vector3Like.Create(x, y, z);
    for (const position of this.positions) {
      Vector3Like.MultiplyInPlace(position, scale);
    }
    return this;
  }

  /**
   * Translates all positions by (x, y, z).
   */
  transform(x: number, y: number, z: number) {
    const shift = Vector3Like.Create(x, y, z);
    for (const position of this.positions) {
      Vector3Like.AddInPlace(position, shift);
    }
    return this;
  }

  /**
   * Sets positions, computing a left-handed normal by default (matching your Quad).
   * Adapt if you need right-handed or detect it automatically.
   */
  setPositions(positions: [Vec3Array, Vec3Array, Vec3Array]) {
    // Compute normals
    const [n1, n2, n3] = Triangle.GetNormalLeftHanded(...positions);
    this.positions.set(
      Vector3Like.FromArray(positions[0]),
      Vector3Like.FromArray(positions[1]),
      Vector3Like.FromArray(positions[2])
    );
    this.normals.set(
      Vector3Like.FromArray(n1),
      Vector3Like.FromArray(n2),
      Vector3Like.FromArray(n3)
    );

    this.bounds = GetBounds(...this.positions);

    return this;
  }

  /**
   * Clones the triangle, copying position and UV data.
   */
  clone() {
    const cloned = Triangle.Create(
      this.positions.toVec3Array(),
      this.uvs.toVec2Array(),
      this.doubleSided
    );
    // if needed, set those data explicitly:
    // cloned.positions.setFromTriData(this.positions);
    // cloned.uvs.setFromTriData(this.uvs);
    return cloned;
  }
}
