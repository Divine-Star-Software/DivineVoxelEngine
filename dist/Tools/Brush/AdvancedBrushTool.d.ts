import { BrushTool } from "./Brush.js";
import { TaskRunModes } from "../Tasks/TasksTool.js";
export declare const GetAdvancedBrushTool: () => BrushTool & {
    mode: TaskRunModes;
    setMode(mode: TaskRunModes): any;
    paintAndAwaitUpdate(): Promise<unknown>;
    eraseAndAwaitUpdate(): Promise<unknown>;
    paintAndUpdate(onDone?: Function): void;
    eraseAndUpdate(onDone?: Function): void;
    update(onDone?: Function): void;
    updateAndAwait(): Promise<unknown>;
    explode(radius?: number, onDone?: Function): void;
    explodeAwaitUpdate(radius?: number): Promise<unknown>;
};
