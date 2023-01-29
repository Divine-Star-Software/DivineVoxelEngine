import { FaceDataOverride, OverrideTypes } from "Meta/Constructor/OverRide.types";
declare type RunOverrideFunction = (data: FaceDataOverride) => boolean;
export declare const OverrideManager: {
    overrides: Record<OverrideTypes, Map<string, Map<string, RunOverrideFunction>>>;
    registerOverride(type: OverrideTypes, subjectId: string, neighborShapeId: string, run: RunOverrideFunction): void;
    hasOverride(type: OverrideTypes, shapeId: string, neighborShapeId: string): boolean;
    runOverride(type: OverrideTypes, shapeId: string, neighborShapeId: string, data: FaceDataOverride): boolean;
};
export {};
