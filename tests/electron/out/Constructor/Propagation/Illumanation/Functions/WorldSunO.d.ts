import type { IlluminationManager } from "../IlluminationManager";
export declare function PopulateWorldColumnWithSunLight(this: typeof IlluminationManager, x: number, z: number, maxY: number): void;
export declare function SunLightAboveCheck(this: typeof IlluminationManager, x: number, y: number, z: number): boolean | undefined;
export declare function RunSunLightFloodDown(this: typeof IlluminationManager, cx: number, cz: number): void;
export declare function RunSunLightFloodOut(this: typeof IlluminationManager, x: number, z: number): void;
export declare function RunSunLightUpdateAtMaxY(this: typeof IlluminationManager, x: number, z: number, maxY: number): void;
