import { FaceDataOverride, OverrideTypes } from "../../Types/Override.types";
type RunOverrideFunction = (data: FaceDataOverride) => boolean;
export declare const OverrideManager: {
    overrides: Record<OverrideTypes, Map<string, Map<string, RunOverrideFunction>>>;
    registerOverride(type: OverrideTypes, subjectId: string, neighborShapeId: string, run: RunOverrideFunction): void;
    hasOverride(type: OverrideTypes, shapeId: string, neighborShapeId: string): boolean;
    runOverride(type: OverrideTypes, firstId: string, secondOverride: string, data: FaceDataOverride): boolean;
};
export {};
