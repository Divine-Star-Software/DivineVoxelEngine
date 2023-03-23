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
    builder: {
        defaultTransform: QuadTransforms;
        width: number;
        height: number;
        faceFunctions: Record<DirectionNames, (origin: Position3Matrix, tool: MesherDataTool, transform: QuadTransforms, flip?: boolean | undefined) => void>;
        create(tool: MesherDataTool, direction: DirectionNames, origin: Position3Matrix, dimensions: import("../Types/Geometry.types.js").QuadDimensions, flip?: boolean, transform?: QuadTransforms | undefined): void;
    };
    uvs: {
        uvRotations: Record<"top" | "bottom" | "side", Record<import("../Types/Geometry.types.js").TextureRotations, (uv: number, ws: number, we: number, hs: number, he: number, flipped: boolean, uvs: number[]) => void>>;
        advancedUVs: Record<"top" | "bottom" | "side", (uv: number, data: import("../Types/Geometry.types.js").AdvancedUVs, uvs: number[], flipped: boolean) => void>;
        uvFunctions: Record<DirectionNames, (data: import("../Types/Geometry.types.js").AddQuadUVsData) => void>;
        addUVs(data: import("../Types/Geometry.types.js").AddQuadUVsData): void;
        addAdvancedUVs(direction: DirectionNames, uv: number, uvs: number[], data: import("../Types/Geometry.types.js").AdvancedUVs, flipped?: boolean): void;
    };
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
