import { QuadVertexData } from "../../Classes/VertexData.js";
import type { QuadData } from "../../Types/ShapeBuilder.types";
export declare const ShapeBuilder: {
    build(quads: QuadData[]): void;
    _getBrightestLight(data: QuadVertexData): void;
};
