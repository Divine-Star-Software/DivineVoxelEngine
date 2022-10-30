import { VoxelBrush } from "./Brush.js";
export declare const GetAdvancedBrushTool: () => VoxelBrush & {
    paintAndAwaitUpdate(): Promise<unknown>;
    ereaseAndAwaitUpdate(): Promise<unknown>;
    paintAndUpdate(onDone?: Function): void;
    ereaseAndUpdate(onDone?: Function): void;
};
