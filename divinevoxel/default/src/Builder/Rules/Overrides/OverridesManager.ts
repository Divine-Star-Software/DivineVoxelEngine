import {
    FaceDataOverride,
 OverrideTypes,
} from "../../Types/Override.types";

type RunOverrideFunction = (data: FaceDataOverride) => boolean;

export const OverrideManager = {
 overrides: <
  Record<OverrideTypes, Map<string, Map<string, RunOverrideFunction>>>
 >{
  AO: new Map(),
  AOFlipFace: new Map(),
  CullFace: new Map(),
  FlipFace: new Map(),
  DarkenFaceUnderneath: new Map(),
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
  firstId: string,
  secondOverride: string,
  data: FaceDataOverride
 ) {
  let map = this.overrides[type].get(firstId);
  if (!map) return data.default;
  const run = map.get(secondOverride);
  if (!run) return data.default;
  return run(data);
 },
};
