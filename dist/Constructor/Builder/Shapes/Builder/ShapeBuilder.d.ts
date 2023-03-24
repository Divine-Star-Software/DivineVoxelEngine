import type { QuadData } from "../../Types/ShapeBuilder.types";
import { QuadVertexData } from "../../Classes/VertexData.js";
export declare const ShapeBuilder: {
    build(quads: QuadData[]): void;
    _getBrightestLight(data: QuadVertexData): void;
};
