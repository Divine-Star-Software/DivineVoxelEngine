import { IlluminationManager } from "../IlluminationManager";
export declare function runRGBLightUpdate(this: IlluminationManager): void;
export declare function RGBFloodFill(this: IlluminationManager, voxelData: number[], lightEncodedData: number, chunkX: number, chunkY: number, chunkZ: number, startX: number, startY: number, startZ: number): void;
export declare function RGBFloodRemove(this: IlluminationManager, chunkX: number, chunkY: number, chunkZ: number, startX: number, startY: number, startZ: number): void;
