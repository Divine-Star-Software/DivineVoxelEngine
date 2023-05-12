import type { NodeMaterialData } from "../types/RenderNode.types";
import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { NodeMaterial } from "./NodeMaterial.js";
import { Color3, Vector4 } from "@babylonjs/core";
import type { RenderFogOptions } from "Meta/Render/Render/Render.options.types";
import { RecursivePartial } from "Meta";
import { NodeManager } from "../NodeManager.js";
import { DVEBabylon } from "../DVEBabylon.js";

export const NodeMaterialManager = {
 materials: new UtilMap<string, NodeMaterial>(),
 fogOptions: <RenderFogOptions>{},
 fogData: <Vector4>{},
 unifrosm: {
  //defines the light value gradient for voxxel lighting
  lightGradient: [
   0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64, 0.74,
   0.85, 0.97, 1,
  ],
 },

 init() {
  this.fogData = new DVEBabylon.system.Vector4();
  this.fogOptions = {
   mode: "volumetric",
   density: 0.0005,
   color: new DVEBabylon.system.Color3(1, 1, 1),
   volumetricOptions: {
    heightFactor: 0.25,
   },
  };
  this.updateFogOptions(this.fogOptions);
 },

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

 _updateFogData(data: Vector4) {
  this.materials._map.forEach((_) => _.updateFogOptions(data));
 },

 setSunLevel(level: number) {
  this.materials._map.forEach((_) => _.setSunLightLevel(level));
 },
 setBaseLevel(level: number) {
  this.materials._map.forEach((_) => _.setBaseLevel(level));
 },

 setOption(id: string, value: boolean) {
  this.materials._map.forEach((_) =>
   _.getMaterial().setFloat(id, value ? 1 : 0)
  );
 },

 updateFogOptions(options: RecursivePartial<RenderFogOptions>) {
  for (const key of Object.keys(options)) {
   //@ts-ignore
   const data = options[key];
   if (typeof data == "object") {
    for (const key2 of Object.keys(data)) {
     const data2 = data[key2];
     (this as any).fogOptions[key][key2] = data2;
    }
   } else {
    (this as any).fogOptions[key] = data;
   }
  }

  if (options.color && NodeManager._scene) {
   NodeManager._scene.fogColor = <Color3>options.color;
  }

  if (this.fogOptions.mode == "volumetric") {
   this.fogData.x = 1;
  }
  if (this.fogOptions.mode == "animated-volumetric") {
   this.fogData.x = 2;
  }
  this.fogData.y = this.fogOptions.density;
  this.fogData.z = this.fogOptions.volumetricOptions.heightFactor;
  this.fogData = this.fogData;
  this._updateFogData(this.fogData);
 },
};
