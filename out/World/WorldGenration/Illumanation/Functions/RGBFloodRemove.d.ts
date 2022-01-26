import type { IlluminationManager } from "../IlluminationManager";
export declare function RGBFloodRemoveCheckNeighors(this: IlluminationManager, x: number, y: number, z: number): void;
export declare function RGBFloodRemoveUpdateAirLightVoxel(this: IlluminationManager, airBlock: any[], x: number, y: number, z: number): void;
export declare function RGBFloodRemoveSetAirLightVoxel(this: IlluminationManager, x: number, y: number, z: number): void;
export declare function RGBFloodRemove(this: IlluminationManager, chunkX: number, chunkY: number, chunkZ: number, startX: number, startY: number, startZ: number): void;
