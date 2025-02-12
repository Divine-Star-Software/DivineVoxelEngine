import { QuadVerticies } from "../Geometry.types.js";
import { Vector3Like, Vector2Like, Vec3Array, Vec2Array } from "@amodx/math";
type QuadDataType<Data> = [Data, Data, Data, Data];

export class QuadVertexData<Data> {
  constructor(public vertices: QuadDataType<Data>) {}

  toArray() {
    return [
      this.vertices[QuadVerticies.TopRight],
      this.vertices[QuadVerticies.TopLeft],
      this.vertices[QuadVerticies.BottomLeft],
      this.vertices[QuadVerticies.BottomRight],
    ];
  }

  setVertex(vertex: QuadVerticies, value: Data) {
    this.vertices[vertex] = value;
  }

  getVertex(vertex: QuadVerticies) {
    return this.vertices[vertex];
  }

  setAll(value: Data) {
    this.vertices[QuadVerticies.TopRight] = value;
    this.vertices[QuadVerticies.TopLeft] = value;
    this.vertices[QuadVerticies.BottomLeft] = value;
    this.vertices[QuadVerticies.BottomRight] = value;
  }

  set(v1: Data, v2: Data, v3: Data, v4: Data) {
    this.vertices[QuadVerticies.TopRight] = v1;
    this.vertices[QuadVerticies.TopLeft] = v2;
    this.vertices[QuadVerticies.BottomLeft] = v3;
    this.vertices[QuadVerticies.BottomRight] = v4;
  }

  isEqualTo(v1: Data, v2: Data, v3: Data, v4: Data) {
    if (this.vertices[QuadVerticies.TopRight] != v1) return false;
    if (this.vertices[QuadVerticies.TopLeft] != v2) return false;
    if (this.vertices[QuadVerticies.BottomLeft] != v3) return false;
    if (this.vertices[QuadVerticies.BottomRight] != v4) return false;
    return true;
  }

  isAllEqualTo(value: Data) {
    if (this.vertices[QuadVerticies.TopRight] != value) return false;
    if (this.vertices[QuadVerticies.TopLeft] != value) return false;
    if (this.vertices[QuadVerticies.BottomLeft] != value) return false;
    if (this.vertices[QuadVerticies.BottomRight] != value) return false;
    return true;
  }

  [Symbol.iterator](): Iterator<Data> {
    let index = QuadVerticies.TopRight;
    const items = this.vertices;

    return {
      next(): IteratorResult<Data> {
        if (index < QuadVerticies.BottomRight) {
          return { value: items[index++ as QuadVerticies], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }

  clone() {
    return new QuadVertexData<Data>([
      structuredClone(this.vertices[QuadVerticies.TopRight]),
      structuredClone(this.vertices[QuadVerticies.TopLeft]),
      structuredClone(this.vertices[QuadVerticies.BottomLeft]),
      structuredClone(this.vertices[QuadVerticies.BottomRight]),
    ]);
  }
}

export class QuadVector3VertexData extends QuadVertexData<Vector3Like> {
  constructor(
    public vertices: QuadDataType<Vector3Like> = [
      Vector3Like.Create(),
      Vector3Like.Create(),
      Vector3Like.Create(),
      Vector3Like.Create(),
    ]
  ) {
    super(vertices);
  }

  setFromQuadData(vertexData: QuadVertexData<Vector3Like>) {
    Vector3Like.Copy(
      this.vertices[QuadVerticies.TopRight],
      vertexData.vertices[QuadVerticies.TopRight]
    );
    Vector3Like.Copy(
      this.vertices[QuadVerticies.TopLeft],
      vertexData.vertices[QuadVerticies.TopLeft]
    );
    Vector3Like.Copy(
      this.vertices[QuadVerticies.BottomLeft],
      vertexData.vertices[QuadVerticies.BottomLeft]
    );
    Vector3Like.Copy(
      this.vertices[QuadVerticies.BottomRight],
      vertexData.vertices[QuadVerticies.BottomRight]
    );
  }

  addToVertex(vertex: QuadVerticies, value: Vector3Like) {
    Vector3Like.AddInPlace(this.vertices[vertex], value);
  }

  subtractFromVertex(vertex: QuadVerticies, value: Vector3Like) {
    Vector3Like.SubtractInPlace(this.vertices[vertex], value);
  }

  addAll(value: Vector3Like) {
    this.addToVertex(QuadVerticies.TopRight, value);
    this.addToVertex(QuadVerticies.TopLeft, value);
    this.addToVertex(QuadVerticies.BottomLeft, value);
    this.addToVertex(QuadVerticies.BottomRight, value);
  }

  subtractAll(value: Vector3Like) {
    this.subtractFromVertex(QuadVerticies.TopRight, value);
    this.subtractFromVertex(QuadVerticies.TopLeft, value);
    this.subtractFromVertex(QuadVerticies.BottomLeft, value);
    this.subtractFromVertex(QuadVerticies.BottomRight, value);
  }

  isEqualTo(
    v1: Vector3Like,
    v2: Vector3Like,
    v3: Vector3Like,
    v4: Vector3Like
  ) {
    return (
      Vector3Like.Equals(this.vertices[QuadVerticies.TopRight], v1) &&
      Vector3Like.Equals(this.vertices[QuadVerticies.TopLeft], v2) &&
      Vector3Like.Equals(this.vertices[QuadVerticies.BottomLeft], v3) &&
      Vector3Like.Equals(this.vertices[QuadVerticies.BottomRight], v4)
    );
  }

  isAllEqualTo(v1: Vector3Like) {
    return (
      Vector3Like.Equals(this.vertices[QuadVerticies.TopRight], v1) &&
      Vector3Like.Equals(this.vertices[QuadVerticies.TopLeft], v1) &&
      Vector3Like.Equals(this.vertices[QuadVerticies.BottomLeft], v1) &&
      Vector3Like.Equals(this.vertices[QuadVerticies.BottomRight], v1)
    );
  }
  clone() {
    return new QuadVector3VertexData([
      Vector3Like.Clone(this.vertices[QuadVerticies.TopRight]),
      Vector3Like.Clone(this.vertices[QuadVerticies.TopLeft]),
      Vector3Like.Clone(this.vertices[QuadVerticies.BottomLeft]),
      Vector3Like.Clone(this.vertices[QuadVerticies.BottomRight]),
    ]);
  }

  toVec3Array(): [Vec3Array, Vec3Array, Vec3Array, Vec3Array] {
    return [
      Vector3Like.ToArray(this.vertices[0]),
      Vector3Like.ToArray(this.vertices[1]),
      Vector3Like.ToArray(this.vertices[2]),
      Vector3Like.ToArray(this.vertices[3]),
    ];
  }
}

export class QuadVector2VertexData extends QuadVertexData<Vector2Like> {
  constructor(
    public vertices: QuadDataType<Vector2Like> = [
      Vector2Like.Create(),
      Vector2Like.Create(),
      Vector2Like.Create(),
      Vector2Like.Create(),
    ]
  ) {
    super(vertices);
  }

  setFromQuadData(vertexData: QuadVertexData<Vector3Like>) {
    Vector2Like.Copy(
      this.vertices[QuadVerticies.TopRight],
      vertexData.vertices[QuadVerticies.TopRight]
    );
    Vector2Like.Copy(
      this.vertices[QuadVerticies.TopLeft],
      vertexData.vertices[QuadVerticies.TopLeft]
    );
    Vector2Like.Copy(
      this.vertices[QuadVerticies.BottomLeft],
      vertexData.vertices[QuadVerticies.BottomLeft]
    );
    Vector2Like.Copy(
      this.vertices[QuadVerticies.BottomRight],
      vertexData.vertices[QuadVerticies.BottomRight]
    );
  }

  addToVertex(vertex: QuadVerticies, value: Vector2Like) {
    Vector2Like.AddInPlace(this.vertices[vertex], value);
  }

  subtractFromVertex(vertex: QuadVerticies, value: Vector2Like) {
    Vector2Like.SubtractInPlace(this.vertices[vertex], value);
  }

  addAll(value: Vector2Like) {
    this.addToVertex(QuadVerticies.TopRight, value);
    this.addToVertex(QuadVerticies.TopLeft, value);
    this.addToVertex(QuadVerticies.BottomLeft, value);
    this.addToVertex(QuadVerticies.BottomRight, value);
  }

  subtractAll(value: Vector2Like) {
    this.subtractFromVertex(QuadVerticies.TopRight, value);
    this.subtractFromVertex(QuadVerticies.TopLeft, value);
    this.subtractFromVertex(QuadVerticies.BottomLeft, value);
    this.subtractFromVertex(QuadVerticies.BottomRight, value);
  }

  isEqualTo(
    v1: Vector2Like,
    v2: Vector2Like,
    v3: Vector2Like,
    v4: Vector2Like
  ) {
    return (
      Vector2Like.Equals(this.vertices[QuadVerticies.TopRight], v1) &&
      Vector2Like.Equals(this.vertices[QuadVerticies.TopLeft], v2) &&
      Vector2Like.Equals(this.vertices[QuadVerticies.BottomLeft], v3) &&
      Vector2Like.Equals(this.vertices[QuadVerticies.BottomRight], v4)
    );
  }
  isAllEqualTo(v1: Vector2Like) {
    return (
      Vector2Like.Equals(this.vertices[QuadVerticies.TopRight], v1) &&
      Vector2Like.Equals(this.vertices[QuadVerticies.TopLeft], v1) &&
      Vector2Like.Equals(this.vertices[QuadVerticies.BottomLeft], v1) &&
      Vector2Like.Equals(this.vertices[QuadVerticies.BottomRight], v1)
    );
  }

  toVec2Array(): [Vec2Array, Vec2Array, Vec2Array, Vec2Array] {
    return [
      Vector2Like.ToArray(this.vertices[0]),
      Vector2Like.ToArray(this.vertices[1]),
      Vector2Like.ToArray(this.vertices[2]),
      Vector2Like.ToArray(this.vertices[3]),
    ];
  }

  clone() {
    return new QuadVector2VertexData([
      Vector2Like.Clone(this.vertices[QuadVerticies.TopRight]),
      Vector2Like.Clone(this.vertices[QuadVerticies.TopLeft]),
      Vector2Like.Clone(this.vertices[QuadVerticies.BottomLeft]),
      Vector2Like.Clone(this.vertices[QuadVerticies.BottomRight]),
    ]);
  }
}

export class QuadScalarVertexData extends QuadVertexData<number> {
  constructor(public vertices: QuadDataType<number> = [0, 0, 0, 0]) {
    super(vertices);
  }

  setFromQuadData(vertexData: QuadVertexData<number>) {
    this.vertices[QuadVerticies.TopRight] =
      vertexData.vertices[QuadVerticies.TopRight];
    this.vertices[QuadVerticies.TopLeft] =
      vertexData.vertices[QuadVerticies.TopLeft];
    this.vertices[QuadVerticies.BottomLeft] =
      vertexData.vertices[QuadVerticies.BottomLeft];
    this.vertices[QuadVerticies.BottomRight] =
      vertexData.vertices[QuadVerticies.BottomRight];
  }

  subtractFromVertex(vertex: QuadVerticies, value: number) {
    this.vertices[vertex] -= value;
  }

  addAll(value: number) {
    this.vertices[QuadVerticies.TopRight] += value;
    this.vertices[QuadVerticies.TopLeft] += value;
    this.vertices[QuadVerticies.BottomLeft] += value;
    this.vertices[QuadVerticies.BottomRight] += value;
  }

  add(v1: number, v2: number, v3: number, v4: number) {
    this.vertices[QuadVerticies.TopRight] += v1;
    this.vertices[QuadVerticies.TopLeft] += v2;
    this.vertices[QuadVerticies.BottomLeft] += v3;
    this.vertices[QuadVerticies.BottomRight] += v4;
  }

  subtractAll(value: number) {
    this.vertices[QuadVerticies.TopRight] -= value;
    this.vertices[QuadVerticies.TopLeft] -= value;
    this.vertices[QuadVerticies.BottomLeft] -= value;
    this.vertices[QuadVerticies.BottomRight] -= value;
  }

  subtract(v1: number, v2: number, v3: number, v4: number) {
    this.vertices[QuadVerticies.TopRight] += v1;
    this.vertices[QuadVerticies.TopLeft] += v2;
    this.vertices[QuadVerticies.BottomLeft] += v3;
    this.vertices[QuadVerticies.BottomRight] += v4;
  }

  isGreaterThan(v1: number, v2: number, v3: number, v4: number) {
    if (this.vertices[QuadVerticies.TopRight] < v1) return false;
    if (this.vertices[QuadVerticies.TopLeft] < v2) return false;
    if (this.vertices[QuadVerticies.BottomLeft] < v3) return false;
    if (this.vertices[QuadVerticies.BottomRight] < v4) return false;
    return true;
  }

  isAllGreaterThan(value: number) {
    if (this.vertices[QuadVerticies.TopRight] < value) return false;
    if (this.vertices[QuadVerticies.TopLeft] < value) return false;
    if (this.vertices[QuadVerticies.BottomLeft] < value) return false;
    if (this.vertices[QuadVerticies.BottomRight] < value) return false;
    return true;
  }

  isLessThan(v1: number, v2: number, v3: number, v4: number) {
    if (this.vertices[QuadVerticies.TopRight] > v1) return false;
    if (this.vertices[QuadVerticies.TopLeft] > v2) return false;
    if (this.vertices[QuadVerticies.BottomLeft] > v3) return false;
    if (this.vertices[QuadVerticies.BottomRight] > v4) return false;
    return true;
  }

  isAllLessThan(value: number) {
    if (this.vertices[QuadVerticies.TopRight] > value) return false;
    if (this.vertices[QuadVerticies.TopLeft] > value) return false;
    if (this.vertices[QuadVerticies.BottomLeft] > value) return false;
    if (this.vertices[QuadVerticies.BottomRight] > value) return false;
    return true;
  }

  clone() {
    return new QuadScalarVertexData([
      this.vertices[QuadVerticies.TopRight],
      this.vertices[QuadVerticies.TopLeft],
      this.vertices[QuadVerticies.BottomLeft],
      this.vertices[QuadVerticies.BottomRight],
    ]);
  }
}
