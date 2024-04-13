import { QuadVerticies } from "../Geometry.types.js";

export class QuadVertexData {
 vertices: Record<QuadVerticies, number> = {
  [QuadVerticies.TopRight]: 0,
  [QuadVerticies.TopLeft]: 0,
  [QuadVerticies.BottomLeft]: 0,
  [QuadVerticies.BottomRight]: 0,
 };

 getAsArray() {
  return [this.vertices[1], this.vertices[2], this.vertices[3], this.vertices[4]];
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

 setFromQuadData(vertexData: QuadVertexData) {
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
