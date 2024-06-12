import {
  BinaryNumberTypes,
  TypedArrays,
  TypedArrayClassMap,
} from "@divinestar/binary/";
import {
  MeshDefaultAttributes,
  type MeshAttributes,
} from "../MeshData.types.js";

import { QuadScalarVertexData } from "../Classes/VertexData.js";

export class MesherDataTool {
  indicieIndex = 0;
  vars = new Map<string, number>();
  segments = new Map<string, number[]>();
  quadVertexData = new Map<string, QuadScalarVertexData>();
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
    [MeshDefaultAttributes.Position, [[], 3, BinaryNumberTypes.Float32]],
    [MeshDefaultAttributes.Normal, [[], 3, BinaryNumberTypes.Float32]],
    [MeshDefaultAttributes.Indices, [[], 1, BinaryNumberTypes.Uint16]],
  ]);

  get positions() {
    return this.attributes.get(MeshDefaultAttributes.Position)![0];
  }
  get normals() {
    return this.attributes.get(MeshDefaultAttributes.Normal)![0];
  }
  get indices() {
    return this.attributes.get(MeshDefaultAttributes.Indices)![0];
  }

  getAttribute(id: string) {
    return this.attributes.get(id)![0];
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
    this.resetAttributes();
    this.resetVars();
    return this;
  }

  resetAttributes() {
    for (const [key, v] of this.attributes) {
      v[0].length = 0;
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
