import type { Dimension2Matrix, Position3Matrix } from "Math";
import type { DirectionNames } from "Meta";
import { QuadTransforms, QuadVertexes } from "../Types/Geometry.types.js";
import { MesherDataTool } from "./MesherDataTools.js";
export declare class MeshBuilderTool {
    direction: DirectionNames;
    tool: MesherDataTool;
    constructor();
    setMesherTool(tool: MesherDataTool): this;
    quad: QuadBuilderTool;
}
export declare class QuadBuilderTool {
    tool: MesherDataTool;
    setMesherTool(tool: MesherDataTool): this;
    _fliped: boolean;
    _direction: DirectionNames;
    _position: Position3Matrix;
    _cachedPosition: Position3Matrix;
    _dimension: Dimension2Matrix;
    _transform: QuadTransforms;
    setDimensions(width: number, height: number): this;
    setPosition(x?: number, y?: number, z?: number): this;
    updatePosition(x?: number, y?: number, z?: number): this;
    updatePositionInPlace(x?: number, y?: number, z?: number): this;
    setTransform(vertex: QuadVertexes, x?: number, y?: number, z?: number): this;
    clearTransform(): this;
    setFlipped(flipped: boolean): this;
    setDirection(direction: DirectionNames): this;
    create(): this;
    clear(): this;
}
