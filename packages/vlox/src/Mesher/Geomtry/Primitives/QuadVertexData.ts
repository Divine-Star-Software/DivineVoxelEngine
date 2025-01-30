import { QuadVerticies } from "../Geometry.types.js";
import { Vector3Like, Vector2Like, Vec3Array } from "@amodx/math";
export class QuadVertexData<Data> {
  constructor(public vertices: Record<QuadVerticies, Data>) {}

  getAsArray() {
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
    return new QuadVertexData<Data>({
      [QuadVerticies.TopRight]: structuredClone(
        this.vertices[QuadVerticies.TopRight]
      ),
      [QuadVerticies.TopLeft]: structuredClone(
        this.vertices[QuadVerticies.TopLeft]
      ),
      [QuadVerticies.BottomLeft]: structuredClone(
        this.vertices[QuadVerticies.BottomLeft]
      ),
      [QuadVerticies.BottomRight]: structuredClone(
        this.vertices[QuadVerticies.BottomRight]
      ),
    });
  }
}
export class QuadVec3ArrayVertexData extends QuadVertexData<Vec3Array> {
  constructor(
    public vertices: Record<QuadVerticies, Vec3Array> = {
      [QuadVerticies.TopRight]: [0, 0, 0],
      [QuadVerticies.TopLeft]: [0, 0, 0],
      [QuadVerticies.BottomLeft]: [0, 0, 0],
      [QuadVerticies.BottomRight]: [0, 0, 0],
    }
  ) {
    super(vertices);
  }

  setFromQuadData(vertexData: QuadVertexData<Vec3Array>) {
    Vector3Like.CopyArray(
      this.vertices[QuadVerticies.TopRight],
      vertexData.vertices[QuadVerticies.TopRight]
    );
    Vector3Like.CopyArray(
      this.vertices[QuadVerticies.TopLeft],
      vertexData.vertices[QuadVerticies.TopLeft]
    );
    Vector3Like.CopyArray(
      this.vertices[QuadVerticies.BottomLeft],
      vertexData.vertices[QuadVerticies.BottomLeft]
    );
    Vector3Like.CopyArray(
      this.vertices[QuadVerticies.BottomRight],
      vertexData.vertices[QuadVerticies.BottomRight]
    );
  }

  addToVertex(vertex: QuadVerticies, value: Vec3Array) {
    Vector3Like.AddArrayInPlace(this.vertices[vertex], value);
  }

  subtractFromVertex(vertex: QuadVerticies, value: Vec3Array) {
    Vector3Like.SubtractArrayInPlace(this.vertices[vertex], value);
  }

  addAll(value: Vec3Array) {
    this.addToVertex(QuadVerticies.TopRight, value);
    this.addToVertex(QuadVerticies.TopLeft, value);
    this.addToVertex(QuadVerticies.BottomLeft, value);
    this.addToVertex(QuadVerticies.BottomRight, value);
  }

  subtractAll(value: Vec3Array) {
    this.subtractFromVertex(QuadVerticies.TopRight, value);
    this.subtractFromVertex(QuadVerticies.TopLeft, value);
    this.subtractFromVertex(QuadVerticies.BottomLeft, value);
    this.subtractFromVertex(QuadVerticies.BottomRight, value);
  }

  isEqualTo(v1: Vec3Array, v2: Vec3Array, v3: Vec3Array, v4: Vec3Array) {
    return (
      Vector3Like.EqualsArray(this.vertices[QuadVerticies.TopRight], v1) &&
      Vector3Like.EqualsArray(this.vertices[QuadVerticies.TopLeft], v2) &&
      Vector3Like.EqualsArray(this.vertices[QuadVerticies.BottomLeft], v3) &&
      Vector3Like.EqualsArray(this.vertices[QuadVerticies.BottomRight], v4)
    );
  }

  isAllEqualTo(v1: Vec3Array) {
    return (
      Vector3Like.EqualsArray(this.vertices[QuadVerticies.TopRight], v1) &&
      Vector3Like.EqualsArray(this.vertices[QuadVerticies.TopLeft], v1) &&
      Vector3Like.EqualsArray(this.vertices[QuadVerticies.BottomLeft], v1) &&
      Vector3Like.EqualsArray(this.vertices[QuadVerticies.BottomRight], v1)
    );
  }
  clone() {
    return new QuadVec3ArrayVertexData({
      [QuadVerticies.TopRight]: [...this.vertices[QuadVerticies.TopRight]],
      [QuadVerticies.TopLeft]: [...this.vertices[QuadVerticies.TopLeft]],
      [QuadVerticies.BottomLeft]: [...this.vertices[QuadVerticies.BottomLeft]],
      [QuadVerticies.BottomRight]: [
        ...this.vertices[QuadVerticies.BottomRight],
      ],
    });
  }
}

export class QuadVector3VertexData extends QuadVertexData<Vector3Like> {
  constructor(
    public vertices: Record<QuadVerticies, Vector3Like> = {
      [QuadVerticies.TopRight]: Vector3Like.Create(),
      [QuadVerticies.TopLeft]: Vector3Like.Create(),
      [QuadVerticies.BottomLeft]: Vector3Like.Create(),
      [QuadVerticies.BottomRight]: Vector3Like.Create(),
    }
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
    return new QuadVector3VertexData({
      [QuadVerticies.TopRight]: Vector3Like.Clone(
        this.vertices[QuadVerticies.TopRight]
      ),
      [QuadVerticies.TopLeft]: Vector3Like.Clone(
        this.vertices[QuadVerticies.TopLeft]
      ),
      [QuadVerticies.BottomLeft]: Vector3Like.Clone(
        this.vertices[QuadVerticies.BottomLeft]
      ),
      [QuadVerticies.BottomRight]: Vector3Like.Clone(
        this.vertices[QuadVerticies.BottomRight]
      ),
    });
  }
}

export class QuadVector2VertexData extends QuadVertexData<Vector2Like> {
  constructor(
    public vertices: Record<QuadVerticies, Vector2Like> = {
      [QuadVerticies.TopRight]: Vector2Like.Create(),
      [QuadVerticies.TopLeft]: Vector2Like.Create(),
      [QuadVerticies.BottomLeft]: Vector2Like.Create(),
      [QuadVerticies.BottomRight]: Vector2Like.Create(),
    }
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
  clone() {
    return new QuadVector2VertexData({
      [QuadVerticies.TopRight]: Vector2Like.Clone(
        this.vertices[QuadVerticies.TopRight]
      ),
      [QuadVerticies.TopLeft]: Vector2Like.Clone(
        this.vertices[QuadVerticies.TopLeft]
      ),
      [QuadVerticies.BottomLeft]: Vector2Like.Clone(
        this.vertices[QuadVerticies.BottomLeft]
      ),
      [QuadVerticies.BottomRight]: Vector2Like.Clone(
        this.vertices[QuadVerticies.BottomRight]
      ),
    });
  }
}

export class QuadScalarVertexData extends QuadVertexData<number> {
  constructor(
    public vertices: Record<QuadVerticies, number> = {
      [QuadVerticies.TopRight]: 0,
      [QuadVerticies.TopLeft]: 0,
      [QuadVerticies.BottomLeft]: 0,
      [QuadVerticies.BottomRight]: 0,
    }
  ) {
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
    return new QuadScalarVertexData({
      [QuadVerticies.TopRight]: this.vertices[QuadVerticies.TopRight],
      [QuadVerticies.TopLeft]: this.vertices[QuadVerticies.TopLeft],
      [QuadVerticies.BottomLeft]: this.vertices[QuadVerticies.BottomLeft],
      [QuadVerticies.BottomRight]: this.vertices[QuadVerticies.BottomRight],
    });
  }
}
