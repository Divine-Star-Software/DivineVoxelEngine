import { TypedArrays } from "@amodx/binary";
import { Vec3Array } from "@amodx/math";
/* export type CompactMeshIndex = [
  id: string,
  array: TypedArrays,
  stride: number,
][];
 */
export type CompactSubMesh = [
  materialId: string,
  vertexBuffer: Float32Array,
  indexBuffer: Uint32Array | Uint16Array,
  minBounds: Vec3Array,
  maxBounds: Vec3Array,
];
export type CompactMeshData =
  | [type: 0, meshes: CompactSubMesh[]]
  | [
      type: 1,
      vertexBuffer: ArrayBuffer,
      indexBuffer: Uint32Array,
      bvhTreeBuffer: Float32Array,
      bvhIndexBuffer: Uint32Array,
      minBounds: Vec3Array,
      maxBounds: Vec3Array,
    ];
