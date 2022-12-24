import { BrushTool } from "./Brush.js";
export declare const GetAdvancedBrushTool: () => BrushTool & {
    paintAndAwaitUpdate(): Promise<unknown>;
    eraseAndAwaitUpdate(): Promise<unknown>;
    paintAndUpdate(onDone?: Function): void;
    eraseAndUpdate(onDone?: Function): void;
    explode(radius?: number, onDone?: Function): void;
};
