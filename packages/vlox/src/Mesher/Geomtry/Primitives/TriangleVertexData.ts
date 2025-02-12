import { Vector3Like, Vector2Like, Vec3Array, Vec2Array } from "@amodx/math";
import { TriangleVerticies } from "../Geometry.types";
type TriangleDataType<Data> = [Data, Data, Data];

export class TriangleVertexData<Data> {
  constructor(public vertices: TriangleDataType<Data>) {}

  toArray() {
    return [
      this.vertices[TriangleVerticies.One],
      this.vertices[TriangleVerticies.Two],
      this.vertices[TriangleVerticies.Three],
    ];
  }

  setVertex(vertex: TriangleVerticies, value: Data) {
    this.vertices[vertex] = value;
  }

  getVertex(vertex: TriangleVerticies) {
    return this.vertices[vertex];
  }

  setAll(value: Data) {
    this.vertices[TriangleVerticies.One] = value;
    this.vertices[TriangleVerticies.Two] = value;
    this.vertices[TriangleVerticies.Three] = value;
  }

  set(v1: Data, v2: Data, v3: Data) {
    this.vertices[TriangleVerticies.One] = v1;
    this.vertices[TriangleVerticies.Two] = v2;
    this.vertices[TriangleVerticies.Three] = v3;
  }

  isEqualTo(v1: Data, v2: Data, v3: Data) {
    if (this.vertices[TriangleVerticies.One] != v1) return false;
    if (this.vertices[TriangleVerticies.Two] != v2) return false;
    if (this.vertices[TriangleVerticies.Three] != v3) return false;
    return true;
  }

  isAllEqualTo(value: Data) {
    if (this.vertices[TriangleVerticies.One] != value) return false;
    if (this.vertices[TriangleVerticies.Two] != value) return false;
    if (this.vertices[TriangleVerticies.Three] != value) return false;
    return true;
  }

  [Symbol.iterator](): Iterator<Data> {
    let index = TriangleVerticies.One;
    const items = this.vertices;

    return {
      next(): IteratorResult<Data> {
        if (index < TriangleVerticies.Three) {
          return { value: items[index++ as TriangleVerticies], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }

  clone() {
    return new TriangleVertexData<Data>([
      structuredClone(this.vertices[TriangleVerticies.One]),
      structuredClone(this.vertices[TriangleVerticies.Two]),
      structuredClone(this.vertices[TriangleVerticies.Three]),
    ]);
  }
}

export class TriangleVector3VertexData extends TriangleVertexData<Vector3Like> {
  constructor(
    public vertices: TriangleDataType<Vector3Like> = [
      Vector3Like.Create(),
      Vector3Like.Create(),
      Vector3Like.Create(),
    ]
  ) {
    super(vertices);
  }

  setFromQuadData(vertexData: TriangleVertexData<Vector3Like>) {
    Vector3Like.Copy(
      this.vertices[TriangleVerticies.One],
      vertexData.vertices[TriangleVerticies.One]
    );
    Vector3Like.Copy(
      this.vertices[TriangleVerticies.Two],
      vertexData.vertices[TriangleVerticies.Two]
    );
    Vector3Like.Copy(
      this.vertices[TriangleVerticies.Three],
      vertexData.vertices[TriangleVerticies.Three]
    );
  }

  addToVertex(vertex: TriangleVerticies, value: Vector3Like) {
    Vector3Like.AddInPlace(this.vertices[vertex], value);
  }

  subtractFromVertex(vertex: TriangleVerticies, value: Vector3Like) {
    Vector3Like.SubtractInPlace(this.vertices[vertex], value);
  }

  addAll(value: Vector3Like) {
    this.addToVertex(TriangleVerticies.One, value);
    this.addToVertex(TriangleVerticies.Two, value);
    this.addToVertex(TriangleVerticies.Three, value);
  }

  subtractAll(value: Vector3Like) {
    this.subtractFromVertex(TriangleVerticies.One, value);
    this.subtractFromVertex(TriangleVerticies.Two, value);
    this.subtractFromVertex(TriangleVerticies.Three, value);
  }

  isEqualTo(v1: Vector3Like, v2: Vector3Like, v3: Vector3Like) {
    return (
      Vector3Like.Equals(this.vertices[TriangleVerticies.One], v1) &&
      Vector3Like.Equals(this.vertices[TriangleVerticies.Two], v2) &&
      Vector3Like.Equals(this.vertices[TriangleVerticies.Three], v3)
    );
  }

  isAllEqualTo(v1: Vector3Like) {
    return (
      Vector3Like.Equals(this.vertices[TriangleVerticies.One], v1) &&
      Vector3Like.Equals(this.vertices[TriangleVerticies.Two], v1) &&
      Vector3Like.Equals(this.vertices[TriangleVerticies.Three], v1)
    );
  }
  clone() {
    return new TriangleVector3VertexData([
      Vector3Like.Clone(this.vertices[TriangleVerticies.One]),
      Vector3Like.Clone(this.vertices[TriangleVerticies.Two]),
      Vector3Like.Clone(this.vertices[TriangleVerticies.Three]),
    ]);
  }

  toVec3Array(): [Vec3Array, Vec3Array, Vec3Array] {
    return [
      Vector3Like.ToArray(this.vertices[0]),
      Vector3Like.ToArray(this.vertices[1]),
      Vector3Like.ToArray(this.vertices[2]),
    ];
  }
}

export class TriangleVector2VertexData extends TriangleVertexData<Vector2Like> {
  constructor(
    public vertices: TriangleDataType<Vector2Like> = [
      Vector2Like.Create(),
      Vector2Like.Create(),
      Vector2Like.Create(),
    ]
  ) {
    super(vertices);
  }

  setFromQuadData(vertexData: TriangleVertexData<Vector3Like>) {
    Vector2Like.Copy(
      this.vertices[TriangleVerticies.One],
      vertexData.vertices[TriangleVerticies.One]
    );
    Vector2Like.Copy(
      this.vertices[TriangleVerticies.Two],
      vertexData.vertices[TriangleVerticies.Two]
    );
    Vector2Like.Copy(
      this.vertices[TriangleVerticies.Three],
      vertexData.vertices[TriangleVerticies.Three]
    );
  }

  addToVertex(vertex: TriangleVerticies, value: Vector2Like) {
    Vector2Like.AddInPlace(this.vertices[vertex], value);
  }

  subtractFromVertex(vertex: TriangleVerticies, value: Vector2Like) {
    Vector2Like.SubtractInPlace(this.vertices[vertex], value);
  }

  addAll(value: Vector2Like) {
    this.addToVertex(TriangleVerticies.One, value);
    this.addToVertex(TriangleVerticies.Two, value);
    this.addToVertex(TriangleVerticies.Three, value);
  }

  subtractAll(value: Vector2Like) {
    this.subtractFromVertex(TriangleVerticies.One, value);
    this.subtractFromVertex(TriangleVerticies.Two, value);
    this.subtractFromVertex(TriangleVerticies.Three, value);
  }

  isEqualTo(v1: Vector2Like, v2: Vector2Like, v3: Vector2Like) {
    return (
      Vector2Like.Equals(this.vertices[TriangleVerticies.One], v1) &&
      Vector2Like.Equals(this.vertices[TriangleVerticies.Two], v2) &&
      Vector2Like.Equals(this.vertices[TriangleVerticies.Three], v3)
    );
  }
  isAllEqualTo(v1: Vector2Like) {
    return (
      Vector2Like.Equals(this.vertices[TriangleVerticies.One], v1) &&
      Vector2Like.Equals(this.vertices[TriangleVerticies.Two], v1) &&
      Vector2Like.Equals(this.vertices[TriangleVerticies.Three], v1)
    );
  }

  toVec2Array(): [Vec2Array, Vec2Array, Vec2Array] {
    return [
      Vector2Like.ToArray(this.vertices[0]),
      Vector2Like.ToArray(this.vertices[1]),
      Vector2Like.ToArray(this.vertices[2]),
    ];
  }

  clone() {
    return new TriangleVector2VertexData([
      Vector2Like.Clone(this.vertices[TriangleVerticies.One]),
      Vector2Like.Clone(this.vertices[TriangleVerticies.Two]),
      Vector2Like.Clone(this.vertices[TriangleVerticies.Three]),
    ]);
  }
}

export class TriangleScalarVertexData extends TriangleVertexData<number> {
  constructor(public vertices: TriangleDataType<number> = [0, 0, 0]) {
    super(vertices);
  }

  setFromQuadData(vertexData: TriangleVertexData<number>) {
    this.vertices[TriangleVerticies.One] =
      vertexData.vertices[TriangleVerticies.One];
    this.vertices[TriangleVerticies.Two] =
      vertexData.vertices[TriangleVerticies.Two];
    this.vertices[TriangleVerticies.Three] =
      vertexData.vertices[TriangleVerticies.Three];
  }

  subtractFromVertex(vertex: TriangleVerticies, value: number) {
    this.vertices[vertex] -= value;
  }

  addAll(value: number) {
    this.vertices[TriangleVerticies.One] += value;
    this.vertices[TriangleVerticies.Two] += value;
    this.vertices[TriangleVerticies.Three] += value;
  }

  add(v1: number, v2: number, v3: number, v4: number) {
    this.vertices[TriangleVerticies.One] += v1;
    this.vertices[TriangleVerticies.Two] += v2;
    this.vertices[TriangleVerticies.Three] += v3;
  }

  subtractAll(value: number) {
    this.vertices[TriangleVerticies.One] -= value;
    this.vertices[TriangleVerticies.Two] -= value;
    this.vertices[TriangleVerticies.Three] -= value;
  }

  subtract(v1: number, v2: number, v3: number, v4: number) {
    this.vertices[TriangleVerticies.One] += v1;
    this.vertices[TriangleVerticies.Two] += v2;
    this.vertices[TriangleVerticies.Three] += v3;
  }

  isGreaterThan(v1: number, v2: number, v3: number, v4: number) {
    if (this.vertices[TriangleVerticies.One] < v1) return false;
    if (this.vertices[TriangleVerticies.Two] < v2) return false;
    if (this.vertices[TriangleVerticies.Three] < v3) return false;

    return true;
  }

  isAllGreaterThan(value: number) {
    if (this.vertices[TriangleVerticies.One] < value) return false;
    if (this.vertices[TriangleVerticies.Two] < value) return false;
    if (this.vertices[TriangleVerticies.Three] < value) return false;

    return true;
  }

  isLessThan(v1: number, v2: number, v3: number, v4: number) {
    if (this.vertices[TriangleVerticies.One] > v1) return false;
    if (this.vertices[TriangleVerticies.Two] > v2) return false;
    if (this.vertices[TriangleVerticies.Three] > v3) return false;

    return true;
  }

  isAllLessThan(value: number) {
    if (this.vertices[TriangleVerticies.One] > value) return false;
    if (this.vertices[TriangleVerticies.Two] > value) return false;
    if (this.vertices[TriangleVerticies.Three] > value) return false;

    return true;
  }

  clone() {
    return new TriangleScalarVertexData([
      this.vertices[TriangleVerticies.One],
      this.vertices[TriangleVerticies.Two],
      this.vertices[TriangleVerticies.Three],
    ]);
  }
}
