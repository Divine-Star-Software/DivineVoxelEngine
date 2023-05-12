import type { DVEFogTypes } from "Meta/Render/Render/Render.options.types";
export declare class SceneTool {
    constructor();
    sky: {
        setColor: (r: number, g: number, b: number) => SceneTool;
    };
    fog: {
        setHeightFactor: (v: number) => SceneTool;
        setDensity: (v: number) => SceneTool;
        setMode: (mode: DVEFogTypes) => SceneTool;
        setColor: (r: number, g?: number, b?: number) => SceneTool;
    };
    levels: {
        setBase: (v: number) => SceneTool;
        setSun: (v: number) => SceneTool;
    };
    options: {
        doColor: (v: boolean) => any;
        doAO: (v: boolean) => any;
        doSun: (v: boolean) => any;
        doRGB: (v: boolean) => any;
        doEffects: (v: boolean) => any;
    };
}
