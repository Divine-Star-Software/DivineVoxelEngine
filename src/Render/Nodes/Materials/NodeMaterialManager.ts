import type { NodeMaterialData } from "../types/RenderNode.types";
import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { NodeMaterial } from "./NodeMaterial.js";
import { Vector4 } from "@babylonjs/core";

export const NodeMaterialManager = {
 materials: new UtilMap<string, NodeMaterial>(),

 get(id: string) {
  const material = this.materials.get(id);
  if (!material) return null;
  return material;
 },

 create(materials: NodeMaterialData[]) {
  for (const data of materials) {
   this.materials.add([[data.id, new NodeMaterial(data)]]);
  }
 },

 updateFogOptions(data: Vector4) {
  this.materials._map.forEach((_) => _.updateFogOptions(data));
 },

 setSunLevel(level: number) {
  this.materials._map.forEach((_) => _.setSunLightLevel(level));
 },
 setBaseLevel(level: number) {
  this.materials._map.forEach((_) => _.setBaseLevel(level));
 },
};
