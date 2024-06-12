import type { TypedArrays } from "@divinestar/binary";

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
