import type { TypedArrays } from "@divinestar/binary/DBO/Types/DBO.types";

export type MeshAttributes = [
  id: string,
  data: TypedArrays,
  stride: number,
  componentTypes?: number,
  noramlizer?: number
][];
