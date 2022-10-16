import { VoxelPalette, VoxelPaletteMap } from "./WorldData.types";

export type DataSyncTypes = "chunk" | "voxel-data" | "iten-data" | "shape-map";

/**### ChunkSyncData
 * indexes:
 * - 0 -> dimesnion ID
 * - 1 -> chunk X
 * - 2 -> chunk Y
 * - 3 -> chunk Z
 * - 4 -> Chunk SAB
 */
export type ChunkSyncData = [number, number, number, number, SharedArrayBuffer];

/**### ChunkUnSyncData
 * indexes:
 * - 0 -> dimesnion ID
 * - 1 -> chunk X
 * - 2 -> chunk Y
 * - 3 -> chunk Z
 */
export type ChunkUnSyncData = [number, number, number, number];

/**### VoxelPaletteSyncData
 * indexes:
 * - 0 -> VoxelPalette
 * - 1 -> VoxelPaletteMap
 */
export type VoxelPaletteSyncData = [VoxelPalette, VoxelPaletteMap];


/**### VoxelDataSync
 * indexes:
 * - 0 -> SharedArrayBuffer | Voxel Data
 * - 1 -> SharedArrayBuffer | Voxel Map DAta
 */
 export type VoxelDataSync = [SharedArrayBuffer, SharedArrayBuffer];