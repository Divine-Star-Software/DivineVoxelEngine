import { CullFaceOverride } from "Meta/Constructor/OverRide.types";
import { DirectionNames } from "Meta/Util.types";
import { stairBuildData } from "./StairBuilder";
export declare const StairData: Record<number, Record<DirectionNames, stairBuildData>>;
export declare const exposedChecks: Record<number, (data: CullFaceOverride) => boolean>;
