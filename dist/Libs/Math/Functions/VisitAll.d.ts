import type { Position3Matrix } from "Meta/Util.types";
export declare const VisitAll: (startPoint: Position3Matrix, endPoint: Position3Matrix, visitor?: (x: number, y: number, z: number) => boolean) => number[];
