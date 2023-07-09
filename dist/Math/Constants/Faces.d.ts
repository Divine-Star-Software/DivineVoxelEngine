import type { DirectionNames } from "Meta/Util.types";
import type { CompassDirectionNames } from "Math/Types/Math.types";
export declare const FaceMap: DirectionNames[];
export declare const FaceRecord: Record<DirectionNames, number>;
export declare const FaceNormals: Record<DirectionNames | CompassDirectionNames, number[]>;
