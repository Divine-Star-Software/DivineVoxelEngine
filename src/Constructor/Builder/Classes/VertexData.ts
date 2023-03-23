import { QuadVertexes } from "../Types";

export class QuadVertexData {
 vetexes: Record<QuadVertexes, number> = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
 };

 getAsArray() {
  return [this.vetexes[1], this.vetexes[2], this.vetexes[3], this.vetexes[4]];
 }

 setVertex(vertex: QuadVertexes, value: number) {
  this.vetexes[vertex] = value;
 }
 addToVertex(vertex: QuadVertexes, value: number) {
  this.vetexes[vertex] += value;
 }
 subtractFromVertex(vertex: QuadVertexes, value: number) {
  this.vetexes[vertex] -= value;
 }
 getVertex(vertex: QuadVertexes) {
  return this.vetexes[vertex];
 }

 setAll(value: number) {
  this.vetexes[1] = value;
  this.vetexes[2] = value;
  this.vetexes[3] = value;
  this.vetexes[4] = value;
 }

 set(v1: number, v2: number, v3: number, v4: number) {
  this.vetexes[1] = v1;
  this.vetexes[2] = v2;
  this.vetexes[3] = v3;
  this.vetexes[4] = v4;
 }

 setFromQuadData(vertexData: QuadVertexData) {
  this.vetexes[1] = vertexData.vetexes[1];
  this.vetexes[2] = vertexData.vetexes[2];
  this.vetexes[3] = vertexData.vetexes[3];
  this.vetexes[4] = vertexData.vetexes[4];
 }

 addAll(value: number) {
  this.vetexes[1] += value;
  this.vetexes[2] += value;
  this.vetexes[3] += value;
  this.vetexes[4] += value;
 }

 add(v1: number, v2: number, v3: number, v4: number) {
  this.vetexes[1] += v1;
  this.vetexes[2] += v2;
  this.vetexes[3] += v3;
  this.vetexes[4] += v4;
 }

 subtractAll(value: number) {
  this.vetexes[1] -= value;
  this.vetexes[2] -= value;
  this.vetexes[3] -= value;
  this.vetexes[4] -= value;
 }

 subtract(v1: number, v2: number, v3: number, v4: number) {
  this.vetexes[1] += v1;
  this.vetexes[2] += v2;
  this.vetexes[3] += v3;
  this.vetexes[4] += v4;
 }

 isEqualTo(v1: number, v2: number, v3: number, v4: number) {
  if (this.vetexes[1] != v1) return false;
  if (this.vetexes[2] != v2) return false;
  if (this.vetexes[3] != v3) return false;
  if (this.vetexes[4] != v4) return false;
  return true;
 }

 isAllEqualTo(value: number) {
  if (this.vetexes[1] != value) return false;
  if (this.vetexes[2] != value) return false;
  if (this.vetexes[3] != value) return false;
  if (this.vetexes[4] != value) return false;
  return true;
 }

 isGreaterThan(v1: number, v2: number, v3: number, v4: number) {
  if (this.vetexes[1] < v1) return false;
  if (this.vetexes[2] < v2) return false;
  if (this.vetexes[3] < v3) return false;
  if (this.vetexes[4] < v4) return false;
  return true;
 }

 isAllGreaterThan(value: number) {
  if (this.vetexes[1] < value) return false;
  if (this.vetexes[2] < value) return false;
  if (this.vetexes[3] < value) return false;
  if (this.vetexes[4] < value) return false;
  return true;
 }

 isLessThan(v1: number, v2: number, v3: number, v4: number) {
  if (this.vetexes[1] > v1) return false;
  if (this.vetexes[2] > v2) return false;
  if (this.vetexes[3] > v3) return false;
  if (this.vetexes[4] > v4) return false;
  return true;
 }

 isAllLessThan(value: number) {
  if (this.vetexes[1] > value) return false;
  if (this.vetexes[2] > value) return false;
  if (this.vetexes[3] > value) return false;
  if (this.vetexes[4] > value) return false;
  return true;
 }

 forEach(run: (vertex: QuadVertexes, value: number) => void) {
  run(1, this.vetexes[1]);
  run(2, this.vetexes[2]);
  run(3, this.vetexes[3]);
  run(4, this.vetexes[4]);
 }
}
