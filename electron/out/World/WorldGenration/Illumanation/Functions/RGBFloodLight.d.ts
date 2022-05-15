import type { IlluminationManager } from "../IlluminationManager";
import type { PositionMatrix } from "Meta/Util.types";
export declare function runRGBFloodFill(this: typeof IlluminationManager): void;
export declare function runRGBFloodFillAt(this: typeof IlluminationManager, x: number, y: number, z: number): void;
export declare function runRGBFloodRemoveAt(this: typeof IlluminationManager, removeVoxel: boolean, x: number, y: number, z: number): void;
export declare function runRGBFloodRemove(this: typeof IlluminationManager, lightSource?: PositionMatrix): void;
