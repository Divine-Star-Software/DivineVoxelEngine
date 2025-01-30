import type { TypedArrays } from "@amodx/binary";

export enum MeshDefaultAttributes {
  Position = "position",
  Normal = "normal",
  Indices = "indices",
}

export type MeshAttributes = [
  id: string,
  data: TypedArrays,
  stride: number,
  componentTypes?: number,
  noramlizer?: number
][];
