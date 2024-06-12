import { QuadVerticies } from "../Geometry.types.js";
import { Vector3Like, Vector2Like } from "../../Math/Vectors.js";

export class QuadVector3VertexData {
  vertices: Record<QuadVerticies, Vector3Like> = {
    [QuadVerticies.TopRight]: Vector3Like.Create(),
    [QuadVerticies.TopLeft]: Vector3Like.Create(),
    [QuadVerticies.BottomLeft]: Vector3Like.Create(),
    [QuadVerticies.BottomRight]: Vector3Like.Create(),
  };

  getAsArray() {
    return [
      this.vertices[QuadVerticies.TopRight],
      this.vertices[QuadVerticies.TopLeft],
      this.vertices[QuadVerticies.BottomLeft],
      this.vertices[QuadVerticies.BottomRight],
    ];
  }

  setVertex(vertex: QuadVerticies, value: Vector3Like) {
    this.vertices[vertex] = value;
  }

  addToVertex(vertex: QuadVerticies, value: Vector3Like) {
    Vector3Like.AddInPlace(this.vertices[vertex], value);
  }

  subtractFromVertex(vertex: QuadVerticies, value: Vector3Like) {
    Vector3Like.SubtractInPlace(this.vertices[vertex], value);
  }

  getVertex(vertex: QuadVerticies) {
    return this.vertices[vertex];
  }

  setAll(value: Vector3Like) {
    this.vertices[QuadVerticies.TopRight] = Vector3Like.Clone(value);
    this.vertices[QuadVerticies.TopLeft] = Vector3Like.Clone(value);
    this.vertices[QuadVerticies.BottomLeft] = Vector3Like.Clone(value);
    this.vertices[QuadVerticies.BottomRight] = Vector3Like.Clone(value);
  }

  set(v1: Vector3Like, v2: Vector3Like, v3: Vector3Like, v4: Vector3Like) {
    this.vertices[QuadVerticies.TopRight] = v1;
    this.vertices[QuadVerticies.TopLeft] = v2;
    this.vertices[QuadVerticies.BottomLeft] = v3;
    this.vertices[QuadVerticies.BottomRight] = v4;
  }

  setFromQuadData(vertexData: QuadVector3VertexData) {
    this.vertices[QuadVerticies.TopRight] =
      vertexData.vertices[QuadVerticies.TopRight];
    this.vertices[QuadVerticies.TopLeft] =
      vertexData.vertices[QuadVerticies.TopLeft];
    this.vertices[QuadVerticies.BottomLeft] =
      vertexData.vertices[QuadVerticies.BottomLeft];
    this.vertices[QuadVerticies.BottomRight] =
      vertexData.vertices[QuadVerticies.BottomRight];
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

  forEach(run: (vertex: QuadVerticies, value: Vector3Like) => void) {
    run(QuadVerticies.TopRight, this.vertices[QuadVerticies.TopRight]);
    run(QuadVerticies.TopLeft, this.vertices[QuadVerticies.TopLeft]);
    run(QuadVerticies.BottomLeft, this.vertices[QuadVerticies.BottomLeft]);
    run(QuadVerticies.BottomRight, this.vertices[QuadVerticies.BottomRight]);
  }
}

export class QuadVector2VertexData {
  vertices: Record<QuadVerticies, Vector2Like> = {
    [QuadVerticies.TopRight]: Vector2Like.Create(),
    [QuadVerticies.TopLeft]: Vector2Like.Create(),
    [QuadVerticies.BottomLeft]: Vector2Like.Create(),
    [QuadVerticies.BottomRight]: Vector2Like.Create(),
  };

  getAsArray() {
    return [
      this.vertices[QuadVerticies.TopRight],
      this.vertices[QuadVerticies.TopLeft],
      this.vertices[QuadVerticies.BottomLeft],
      this.vertices[QuadVerticies.BottomRight],
    ];
  }

  setVertex(vertex: QuadVerticies, value: Vector2Like) {
    this.vertices[vertex] = value;
  }

  addToVertex(vertex: QuadVerticies, value: Vector2Like) {
    Vector2Like.AddInPlace(this.vertices[vertex], value);
  }

  subtractFromVertex(vertex: QuadVerticies, value: Vector2Like) {
    Vector2Like.SubtractInPlace(this.vertices[vertex], value);
  }

  getVertex(vertex: QuadVerticies) {
    return this.vertices[vertex];
  }

  setAll(value: Vector2Like) {
    this.vertices[QuadVerticies.TopRight] = Vector2Like.Clone(value);
    this.vertices[QuadVerticies.TopLeft] = Vector2Like.Clone(value);
    this.vertices[QuadVerticies.BottomLeft] = Vector2Like.Clone(value);
    this.vertices[QuadVerticies.BottomRight] = Vector2Like.Clone(value);
  }

  set(v1: Vector2Like, v2: Vector2Like, v3: Vector2Like, v4: Vector2Like) {
    this.vertices[QuadVerticies.TopRight] = v1;
    this.vertices[QuadVerticies.TopLeft] = v2;
    this.vertices[QuadVerticies.BottomLeft] = v3;
    this.vertices[QuadVerticies.BottomRight] = v4;
  }

  setFromQuadData(vertexData: QuadVector2VertexData) {
    this.vertices[QuadVerticies.TopRight] =
      vertexData.vertices[QuadVerticies.TopRight];
    this.vertices[QuadVerticies.TopLeft] =
      vertexData.vertices[QuadVerticies.TopLeft];
    this.vertices[QuadVerticies.BottomLeft] =
      vertexData.vertices[QuadVerticies.BottomLeft];
    this.vertices[QuadVerticies.BottomRight] =
      vertexData.vertices[QuadVerticies.BottomRight];
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

  forEach(run: (vertex: QuadVerticies, value: Vector2Like) => void) {
    run(QuadVerticies.TopRight, this.vertices[QuadVerticies.TopRight]);
    run(QuadVerticies.TopLeft, this.vertices[QuadVerticies.TopLeft]);
    run(QuadVerticies.BottomLeft, this.vertices[QuadVerticies.BottomLeft]);
    run(QuadVerticies.BottomRight, this.vertices[QuadVerticies.BottomRight]);
  }
}

export class QuadScalarVertexData {
  vertices: Record<QuadVerticies, number> = {
    [QuadVerticies.TopRight]: 0,
    [QuadVerticies.TopLeft]: 0,
    [QuadVerticies.BottomLeft]: 0,
    [QuadVerticies.BottomRight]: 0,
  };

  getAsArray() {
    return [
      this.vertices[1],
      this.vertices[2],
      this.vertices[3],
      this.vertices[4],
    ];
  }

  setVertex(vertex: QuadVerticies, value: number) {
    this.vertices[vertex] = value;
  }
  addToVertex(vertex: QuadVerticies, value: number) {
    this.vertices[vertex] += value;
  }
  subtractFromVertex(vertex: QuadVerticies, value: number) {
    this.vertices[vertex] -= value;
  }
  getVertex(vertex: QuadVerticies) {
    return this.vertices[vertex];
  }

  setAll(value: number) {
    this.vertices[1] = value;
    this.vertices[2] = value;
    this.vertices[3] = value;
    this.vertices[4] = value;
  }

  set(v1: number, v2: number, v3: number, v4: number) {
    this.vertices[1] = v1;
    this.vertices[2] = v2;
    this.vertices[3] = v3;
    this.vertices[4] = v4;
  }

  setFromQuadData(vertexData: QuadScalarVertexData) {
    this.vertices[1] = vertexData.vertices[1];
    this.vertices[2] = vertexData.vertices[2];
    this.vertices[3] = vertexData.vertices[3];
    this.vertices[4] = vertexData.vertices[4];
  }

  addAll(value: number) {
    this.vertices[1] += value;
    this.vertices[2] += value;
    this.vertices[3] += value;
    this.vertices[4] += value;
  }

  add(v1: number, v2: number, v3: number, v4: number) {
    this.vertices[1] += v1;
    this.vertices[2] += v2;
    this.vertices[3] += v3;
    this.vertices[4] += v4;
  }

  subtractAll(value: number) {
    this.vertices[1] -= value;
    this.vertices[2] -= value;
    this.vertices[3] -= value;
    this.vertices[4] -= value;
  }

  subtract(v1: number, v2: number, v3: number, v4: number) {
    this.vertices[1] += v1;
    this.vertices[2] += v2;
    this.vertices[3] += v3;
    this.vertices[4] += v4;
  }

  isEqualTo(v1: number, v2: number, v3: number, v4: number) {
    if (this.vertices[1] != v1) return false;
    if (this.vertices[2] != v2) return false;
    if (this.vertices[3] != v3) return false;
    if (this.vertices[4] != v4) return false;
    return true;
  }

  isAllEqualTo(value: number) {
    if (this.vertices[1] != value) return false;
    if (this.vertices[2] != value) return false;
    if (this.vertices[3] != value) return false;
    if (this.vertices[4] != value) return false;
    return true;
  }

  isGreaterThan(v1: number, v2: number, v3: number, v4: number) {
    if (this.vertices[1] < v1) return false;
    if (this.vertices[2] < v2) return false;
    if (this.vertices[3] < v3) return false;
    if (this.vertices[4] < v4) return false;
    return true;
  }

  isAllGreaterThan(value: number) {
    if (this.vertices[1] < value) return false;
    if (this.vertices[2] < value) return false;
    if (this.vertices[3] < value) return false;
    if (this.vertices[4] < value) return false;
    return true;
  }

  isLessThan(v1: number, v2: number, v3: number, v4: number) {
    if (this.vertices[1] > v1) return false;
    if (this.vertices[2] > v2) return false;
    if (this.vertices[3] > v3) return false;
    if (this.vertices[4] > v4) return false;
    return true;
  }

  isAllLessThan(value: number) {
    if (this.vertices[1] > value) return false;
    if (this.vertices[2] > value) return false;
    if (this.vertices[3] > value) return false;
    if (this.vertices[4] > value) return false;
    return true;
  }

  forEach(run: (vertex: QuadVerticies, value: number) => void) {
    run(1, this.vertices[1]);
    run(2, this.vertices[2]);
    run(3, this.vertices[3]);
    run(4, this.vertices[4]);
  }
}
