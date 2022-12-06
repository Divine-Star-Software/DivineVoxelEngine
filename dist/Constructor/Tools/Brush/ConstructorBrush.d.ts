import { BrushTool } from "../../../Tools/Brush/Brush.js";
export declare function GetConstructorBrush(): BrushTool & {
    requestsId: string;
    paint(this: BrushTool): BrushTool;
};
