import type { RegisterStringMapSync } from "Meta/Data/DataSync.types.js";

export const Register = {
 stringMaps: {
  segments: <Map<string, Map<string, string[]>>>new Map(),
  syncStringMap(data: RegisterStringMapSync) {
   const [segment, id, value] = data;
   let segmentMap = this.segments.get(segment);
   if (!segmentMap) {
    segmentMap = new Map();
    this.segments.set(segment, segmentMap);
   }
   segmentMap.set(id, value);
   return;
  },
  getStringMapValue(segment: string, id: string, index: number) {
   const segmentMap = this.segments.get(segment);
   if (!segmentMap) return "";
   const map = segmentMap.get(id);
   if (!map) {
   // throw new Error(`${id} does not exists`);
    return "";
   }
   return map[index];
  },
 },
};

Register.stringMaps.segments.set("voxel", new Map());
