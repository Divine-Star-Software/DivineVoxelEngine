import { BinaryNumberTypes, TypedArrays,TypedArrayClassMap } from "@divinestar/binary/";
import type { MeshAttributes } from "../MeshData.types.js";

import { QuadVertexData } from "../Classes/VertexData.js";

export class MesherDataTool {
  indicieIndex = 0;
  vars = new Map<string, number>();
  segments = new Map<string, number[]>();
  quadVertexData = new Map<string, QuadVertexData>();
  attributes = new Map<
    string,
    [
      value: number[],
      stride: number,
      dataType: Exclude<
        BinaryNumberTypes,
        BinaryNumberTypes.BigInt | BinaryNumberTypes.BigUint
      >
    ]
  >([
    ["position", [[], 3, BinaryNumberTypes.Float32]],
    ["normal", [[], 3, BinaryNumberTypes.Float32]],
    ["indices", [[], 1, BinaryNumberTypes.Uint16]],
  ]);
  addPositions(...positions: number[]) {
    this.attributes.get("position")![0].push(...positions);
    return this;
  }
  addNormals(...normals: number[]) {
    this.attributes.get("normal")![0].push(...normals);
    return this;
  }
  addIndices(...indices: number[]) {
    this.attributes.get("indices")![0].push(...indices);
    return this;
  }
  addToAttribute(id: string, ...data: number[]) {
    const attribute = this.attributes.get(id);
    if (!attribute) return this;
    attribute[0].push(...data);
    return this;
  }
  getAttribute(id: string) {
    return this.attributes.get(id)![0];
  }
  addToSegment(id: string, ...normals: number[]) {
    const segment = this.segments.get(id);
    if (!segment) return this;
    segment.push(...normals);
    return this;
  }
  setVar(id: string, value: number) {
    if (this.vars.has(id)) {
      this.vars.set(id, value);
    }
    return this;
  }
  getVar(id: string) {
    return this.vars.get(id);
  }
  resetAll() {
    this.resetSegments();
    this.resetAttributes();
    this.resetVars();
    return this;
  }
  resetSegments() {
    for (const [key, v] of this.segments) {
      this.segments.set(key, []);
    }
    return this;
  }
  resetAttributes() {
    for (const [key, v] of this.attributes) {
      this.attributes.set(key, [[], v[1], v[2]]);
    }

    this.indicieIndex = 0;
    return this;
  }
  resetVars() {
    for (const key of this.vars.keys()) {
      this.vars.set(key, 0);
    }
    return this;
  }

  getMeshData() {
    const arrays: any[] = [];
    const strides: number[] = [];
    const trasnfers: any[] = [];
    for (const [key, [value, stride, type]] of this.attributes) {
      //@ts-ignore
      const newArray: Uint8Array = TypedArrayClassMap[type].from(value);
      arrays.push(newArray);
      strides.push(stride);
      trasnfers.push(newArray.buffer);
    }

    return <[TypedArrays[], ArrayBuffer[], number[]]>[
      arrays,
      trasnfers,
      strides,
    ];
  }

  getAllAttributes(): [MeshAttributes, ArrayBuffer[]] {
    const data: MeshAttributes = [];
    const trasnfers: ArrayBuffer[] = [];
    for (const [key, [value, stride, type]] of this.attributes) {
      //@ts-ignore
      const newArray: Uint8Array = TypedArrayClassMap[type].from(value);
      trasnfers.push(newArray.buffer);
      data.push([key, newArray, stride]);
    }
    return [data, trasnfers];
  }
}
