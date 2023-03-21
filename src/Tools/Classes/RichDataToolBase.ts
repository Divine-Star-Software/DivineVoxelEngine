import type { RichDataSchema } from "Meta/Data/RichWorldData.types";
import { DataToolBase } from "./DataToolBase.js";

export abstract class RichDataSegmentTool extends DataToolBase {
 sceham: RichDataSchema = {};
 segment: string = "voxel";
 constructor() {
  super();
 }
 setSegment(segment: string) {
  this.segment = segment;
  if (!this.sceham[segment]) {
   this.sceham[segment] = {};
  }
  return this;
 }
 getSegment() {
  const segment = this.sceham[this.segment];
  if (segment) return segment;
  return false;
 }

 getAll() {
  if (this.sceham) return this.sceham;
  return false;
 }
}
