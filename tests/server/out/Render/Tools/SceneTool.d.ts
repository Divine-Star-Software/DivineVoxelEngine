import type { DVEFogTypes } from "Meta/Render/Render/Render.options.types";
export declare class SceneTool {
    constructor();
    sky: {
        _s: SceneTool;
        setColor(r: number, g: number, b: number): SceneTool;
    };
    fog: {
        _s: SceneTool;
        setHeightFactor(v: number): SceneTool;
        setDensity(v: number): SceneTool;
        setMode(mode: DVEFogTypes): SceneTool;
        setColor(r: number, g?: number, b?: number): SceneTool;
    };
    effects: {
        _s: SceneTool;
        setFloraEffects(enabled: boolean): SceneTool;
        setLiquidEffects(enabled: boolean): SceneTool;
    };
    levels: {
        _s: SceneTool;
        setBase(v: number): SceneTool;
        setSun(v: number): SceneTool;
    };
}
