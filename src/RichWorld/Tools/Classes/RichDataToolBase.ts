import type { RichDataSchema } from "Meta/Data/RichWorldData.types";
import { DataToolBase } from "Tools/Classes/DataToolBase";

export abstract class RichDataToolBase extends DataToolBase {
 sceham: RichDataSchema;
 segment: string;
 setSegment(segment: string) {
  this.segment = segment;
  if(!this.sceham[segment]){
    this.sceham[segment] = {};
  }
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
