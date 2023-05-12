import type { DivineVoxelEngineConstructor } from "Constructor/DivineVoxelEngineConstructor";
import type { LocationData } from "voxelspaces";
import type { Analyzer } from "./Analyzer";
type RunFunction = (locaton: LocationData, deltaTime: number, anayzer: typeof Analyzer, DVEC: DivineVoxelEngineConstructor) => void;
export declare const AnalyzerUpdater: {
    _voxels: Map<string, RunFunction>;
    registerVoxel(id: string, run: RunFunction): void;
    getVoxel(id: string): false | RunFunction;
};
export {};
