import type { MesherDataTool } from "../Tools/MesherDataTools.js";
import type { QuadDimensions, QuadTransforms } from "../Types/Geometry.types";
import type { DirectionNames } from "../../../Meta/Util.types";
import type { Position3Matrix } from "../../../Math/index.js";
export declare const QuadBuilder: {
    defaultTransform: QuadTransforms;
    width: number;
    height: number;
    faceFunctions: Record<DirectionNames, (origin: Position3Matrix, tool: MesherDataTool, transform: QuadTransforms, flip?: boolean) => void>;
    create(tool: MesherDataTool, direction: DirectionNames, origin: Position3Matrix, dimensions: QuadDimensions, flip?: boolean, transform?: QuadTransforms): void;
};
