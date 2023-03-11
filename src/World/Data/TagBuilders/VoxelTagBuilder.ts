import type { TagBuilderNodes } from "Meta/Data/Tags/TagBuilder.types";
import type { TagManagerBase } from "divine-binary-tags";
import { VoxelTagIDs } from "../../../Data/Constants/Tags/VoxelTagIds.js";
import { TagManager } from "divine-binary-tags";
import { DataSync } from "../DataSync.js";
import { Register } from "../../../Data/Register/Register.js";
import { RegisterStringMapSync } from "Meta/Data/DataSync.types.js";

export const VoxelTagBuilder = {
 _nodeMap: <Map<string, TagBuilderNodes>>new Map(),
 _stringMaps: <
  Map<
   string,
   {
    count: number;
    found: Record<string, number>;
    map: string[];
    allowedComms: string[];
   }
  >
 >new Map(),
 _defaults: <Map<string, number>>new Map(),

 addNode(node: TagBuilderNodes | TagBuilderNodes[]) {
  if (Array.isArray(node)) {
   for (const n of node) {
    this._nodeMap.set(n.id, n);
   }
   return;
  }
  this._nodeMap.set(node.id, node);
 },

 getNode(id: string) {
  return this._nodeMap.get(id);
 },

 setDefaults(tagManager: TagManagerBase) {
  for (const [key, node] of this._nodeMap) {
   const defaultValue = this._defaults.get(key);
   if (!defaultValue) continue;
   tagManager.setTag(key, Number(defaultValue));
  }
 },

 hasNode(id: string) {
  return this._nodeMap.has(id);
 },

 setNode(
  id: string,
  value: string | number | boolean | number[],
  tagManager: TagManagerBase
 ) {
  const node = this.getNode(id);
  if (!node) return;
  if (node.type == "number") {
   tagManager.setTag(node.id, Number(value));
  }
  if (node.type == "boolean") {
   tagManager.setTag(node.id, Number(value));
  }
  if (node.type == "number-array") {
   if (!Array.isArray(value)) return false;
   let i = value.length;
   while (i--) {
    tagManager.setArrayTagValue(node.id, i, value[i]);
   }
  }
  if (node.type == "string-map") {
   const data = this._stringMaps.get(node.id);
   if (!data) return false;
   const v = String(value).trim();
   if (data.found[v] === undefined) {
    data.map.push(v);
    data.found[v] = data.count;
    data.count++;
   }
   tagManager.setTag(node.id, data.found[v]);
  }
 },

 $INIT(totalVoxels: number) {
  const tags = new TagManager("voxel-tag-manager");
  for (const [key, node] of this._nodeMap) {
   if (node.type == "number") {
    tags.registerTag({
     id: node.id,
     type: "typed-number",
     numberType: node.numberType,
    });
    this._defaults.set(node.id, node.default);
    continue;
   }
   if (node.type == "number-array") {
    tags.registerTag({
     id: node.id,
     type: "typed-number-array",
     numberType: node.numberType,
     length: node.length,
    });
    continue;
   }
   if (node.type == "boolean") {
    tags.registerTag({
     id: node.id,
     type: "boolean",
    });
    this._defaults.set(node.id, node.default ? 1 : 0);
   }
   if (node.type == "string-map") {
    tags.registerTag({
     id: node.id,
     type: "typed-number",
     numberType: "16ui",
    });
    this._stringMaps.set(node.id, {
     count: 0,
     found: {},
     map: [],
     allowedComms: node.allowedComms,
    });
   }
  }
  tags.$INIT({
   indexBufferMode: "shared",
   numberOfIndexes: totalVoxels,
  });
  return tags.initData;
 },

 $SYNC() {
  for (const [key, map] of this._stringMaps) {
   const data: RegisterStringMapSync = ["voxel", key, map.map];
   if (map.allowedComms.includes("world")) {
    Register.stringMaps.syncStringMap(data);
   }
   DataSync.loopThroughComms((comm) => {
    if (comm.name == "world") return;
    if (map.allowedComms.includes(comm.name)) {
     DataSync.stringMap.syncInThread(comm.name, data);
    }
   });
  }
 },
};
VoxelTagBuilder.addNode([
 {
  id: VoxelTagIDs.substance,
  type: "string-map",
  allowedComms: ["constructor", "nexus", "fx", "world"],
 },
 {
  id: VoxelTagIDs.shapeID,
  type: "string-map",
  allowedComms: ["constructor"],
 },
 {
  id: VoxelTagIDs.colliderID,
  type: "string-map",
  allowedComms: ["nexus"],
 },
 {
  id: VoxelTagIDs.checkCollisions,
  type: "boolean",
  default: false,
 },
 {
  id: VoxelTagIDs.material,
  type: "string-map",
  allowedComms: ["nexus"],
 },
 {
  id: VoxelTagIDs.isLightSource,
  type: "boolean",
  default: false,
 },
 {
  id: VoxelTagIDs.lightValue,
  type: "number",
  numberType: "16ui",
  default: 0,
 },
 {
  id: VoxelTagIDs.isRich,
  type: "boolean",
  default: false,
 },
 {
  id: VoxelTagIDs.hardness,
  type: "number",
  numberType: "32ui",
  default: 0,
 },
]);
