import { VoxelBrush } from "./Brush.js";
export declare const GetBrush: () => VoxelBrush & {
    paintAndAwaitUpdate(): Promise<unknown>;
    ereaseAndAwaitUpdate(): Promise<unknown>;
    paintAndUpdate(onDone?: Function): void;
    ereaseAndUpdate(onDone?: Function): void;
};
