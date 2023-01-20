import type { DivineVoxelEngineConstructor } from "Constructor/DivineVoxelEngineConstructor";
import type { LocationData } from "Meta/Data/CommonTypes";
import type { Analyzer } from "./Analyzer";

type RunFunction = (
 locaton: LocationData,
 deltaTime: number,
 anayzer: typeof Analyzer,
 DVEC: DivineVoxelEngineConstructor
) => void;

export const AnalyzerUpdater = {
 _voxels: <Map<string, RunFunction>>new Map(),
 registerVoxel(id: string, run: RunFunction) {
  this._voxels.set(id, run);
 },

 getVoxel(id: string) {
  const run = this._voxels.get(id);
  if (!run) return false;
  return run;
 },
};
