import {
 FaceDataOverride,
 OverrideTypes,
} from "Meta/Constructor/OverRide.types";

type RunOverrideFunction = (data: FaceDataOverride) => boolean;

export const OverrideManager = {
 overrides: <
  Record<OverrideTypes, Map<string, Map<string, RunOverrideFunction>>>
 >{
  AO: new Map(),
  AOFlip: new Map(),
  CullFace: new Map(),
 },

 registerOverride(
  type: OverrideTypes,
  subjectId: string,
  neighborShapeId: string,
  run: RunOverrideFunction
 ) {
  let map = this.overrides[type].get(subjectId);
  if (!map) {
   map = new Map();
   this.overrides[type].set(subjectId, map);
  }
  map.set(neighborShapeId, run);
 },
 hasOverride(type: OverrideTypes, shapeId: string, neighborShapeId: string) {
  let map = this.overrides[type].get(shapeId);
  if (!map) return false;
  return map.has(neighborShapeId);
 },
 runOverride(
  type: OverrideTypes,
  shapeId: string,
  neighborShapeId: string,
  data: FaceDataOverride
 ) {
  let map = this.overrides[type].get(shapeId);
  if (!map) return data.default;
  const run = map.get(neighborShapeId);
  if (!run) return data.default;
  return run(data);
 },
};
