import type {
 RegisterObjectMapSync,
 RegisterStringMapSync,
} from "Meta/Data/DataSync.types.js";

export const MappedDataRegister = {
 stringMaps: {
  segments: <Map<string, Map<string, string[]>>>new Map(),
  sync(data: RegisterStringMapSync) {
   const [segment, id, value] = data;
   let segmentMap = this.segments.get(segment);
   if (!segmentMap) {
    segmentMap = new Map();
    this.segments.set(segment, segmentMap);
   }
   segmentMap.set(id, value);
   return;
  },
  get(segment: string, id: string, index: number) {
   const segmentMap = this.segments.get(segment);
   if (!segmentMap) return "";
   const stringMap = segmentMap.get(id);
   if (!stringMap) {
    return "";
   }
   return stringMap[index];
  },
 },
 objectMaps: {
  segments: <Map<string, Map<string, Record<number, any>>>>new Map(),
  sync(data: RegisterObjectMapSync) {
   const [segment, id, value] = data;
   let segmentMap = this.segments.get(segment);
   if (!segmentMap) {
    segmentMap = new Map();
    this.segments.set(segment, segmentMap);
   }
   segmentMap.set(id, value);
   return;
  },
  get(segment: string, id: string, index: number) {
   const segmentMap = this.segments.get(segment);
   if (!segmentMap) return null;
   const objectMap = segmentMap.get(id);
   if (!objectMap) {
    return null;
   }
   return objectMap[index];
  },
 },
};

MappedDataRegister.stringMaps.segments.set("voxel", new Map());
MappedDataRegister.stringMaps.segments.set("substance", new Map());
MappedDataRegister.objectMaps.segments.set("substance", new Map());
