import { BrushTool } from "./Brush.js";
export declare const GetAdvancedBrushTool: () => BrushTool & {
    paintAndAwaitUpdate(): Promise<unknown>;
    ereaseAndAwaitUpdate(): Promise<unknown>;
    paintAndUpdate(onDone?: Function): void;
    ereaseAndUpdate(onDone?: Function): void;
    explode(radius?: number, onDone?: Function): void;
};
