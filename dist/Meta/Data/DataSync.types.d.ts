import { VoxelPalette, VoxelPaletteMap } from "./WorldData.types";
export declare type DataSyncTypes = "chunk" | "voxel-data" | "iten-data" | "shape-map";
/**### ChunkSyncData
 * indexes:
 * - 0 -> dimesnion ID
 * - 1 -> chunk X
 * - 2 -> chunk Y
 * - 3 -> chunk Z
 * - 4 -> Chunk SAB
 */
export declare type ChunkSyncData = [number, number, number, number, SharedArrayBuffer];
/**### ChunkUnSyncData
 * indexes:
 * - 0 -> dimesnion ID
 * - 1 -> chunk X
 * - 2 -> chunk Y
 * - 3 -> chunk Z
 */
export declare type ChunkUnSyncData = [number, number, number, number];
/**### VoxelPaletteSyncData
 * indexes:
 * - 0 -> VoxelPalette
 * - 1 -> VoxelPaletteMap
 */
export declare type VoxelPaletteSyncData = [VoxelPalette, VoxelPaletteMap];
/**### VoxelDataSync
 * indexes:
 * - 0 -> SharedArrayBuffer | Voxel Data
 * - 1 -> SharedArrayBuffer | Voxel Map DAta
 */
export declare type VoxelDataSync = [SharedArrayBuffer, SharedArrayBuffer];
