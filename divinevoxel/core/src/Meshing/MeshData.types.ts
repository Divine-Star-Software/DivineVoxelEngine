import type { TypedArrays } from "@divinestar/binary";

export type MeshAttributes = [
  id: string,
  data: TypedArrays,
  stride: number,
  componentTypes?: number,
  noramlizer?: number
][];
