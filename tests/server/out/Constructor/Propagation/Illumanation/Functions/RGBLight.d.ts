import type { IlluminationManager } from "../IlluminationManager.js";
import type { Vector3 } from "Meta/Util.types";
export declare function runRGBUpdate(this: typeof IlluminationManager): void;
export declare function runRGBUpdateAt(this: typeof IlluminationManager, x: number, y: number, z: number): void;
export declare function runRGBRemoveAt(this: typeof IlluminationManager, removeVoxel: boolean, x: number, y: number, z: number): void;
export declare function runRGBRemove(this: typeof IlluminationManager, lightSource?: Vector3): void;
