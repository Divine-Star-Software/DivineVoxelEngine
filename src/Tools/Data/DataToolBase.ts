import type { TagManager } from "Libs/DivineBinaryTags/TagManager";

export class DataToolBase {
 _c: ArrayBuffer | SharedArrayBuffer | DataView;

 constructor(public tags: TagManager) {}
 getTagValue(id: string) {
  this.tags.setBuffer(this._c);
  return this.tags.getTag(id);
 }
 setTagValue(id: string, value: number) {
  this.tags.setBuffer(this._c);
  return this.tags.setTag(id, value);
 }

 getArrayTagValue(id: string, index: number) {
  this.tags.setBuffer(this._c);
  return this.tags.getArrayTagValue(id, index);
 }
 setArrayTagValue(id: string, index: number, value: number) {
  this.tags.setBuffer(this._c);
  return this.tags.setArrayTagValue(id, index, value);
 }
}
