import { GeometryBuildData, QuadDimensions, QuadTransforms } from "Meta/Constructor/Geometry/Geometry.types";
import type { DirectionNames, Vector3 } from "Meta/Util.types";
declare const defaultTransform: QuadTransforms;
export declare const QuadBuilder: {
    faceFunctions: Record<DirectionNames, (origin: Vector3, data: GeometryBuildData, transform: typeof defaultTransform, flip?: boolean) => void>;
    create(direction: DirectionNames, origin: Vector3, dimensions: QuadDimensions, data: GeometryBuildData, flip?: boolean, transform?: QuadTransforms): void;
};
export {};
