import { PositionMatrix } from "Meta/Util.types";
import { IlluminationManager } from "../IlluminationManager";
export declare function runRGBFloodFill(this: IlluminationManager): void;
export declare function runRGBFloodFillAt(this: IlluminationManager, x: number, y: number, z: number): void;
export declare function runRGBFloodRemoveAt(this: IlluminationManager, removeVoxel: boolean, x: number, y: number, z: number): void;
export declare function runRGBFloodRemove(this: IlluminationManager, lightSource?: PositionMatrix): void;
