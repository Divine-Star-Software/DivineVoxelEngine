import type { FaceDataOverride } from "../Types/Override.types";
import type { DirectionNames } from "Meta/Util.types.js";
import type { CustomVertexData } from "../Types/Geometry.types.js";

//objects
import { LightGradient } from "../Calc/Light/LightGradient.js";
import { FlowGradient } from "../Calc/Flow/FlowGradient.js";
import { OverrideManager } from "../Rules/Overrides/OverridesManager.js";
import { SubstanceRules } from "../Rules/SubstanceRules.js";

//tools
import { BuilderDataTool } from "./BuilderDataTool.js";
import { MesherDataTool } from "./MesherDataTools.js";

//data
import { FaceNormals } from "../../../Data/Constants/Util/Faces.js";
import { QuadVertexData } from "../Classes/VertexData.js";

export class VoxelMesherDataTool extends MesherDataTool {
 voxel = new BuilderDataTool();
 nVoxel = new BuilderDataTool();
 faceDataOverride = <FaceDataOverride>{
  face: "south",
  default: false,
  currentVoxel: <BuilderDataTool>{},
  neighborVoxel: <BuilderDataTool>{},
 };
 constructor() {
  super();
  this.faceDataOverride.currentVoxel = this.voxel;
  this.faceDataOverride.neighborVoxel = this.nVoxel;
  this.attributes.add([
   ["voxelData", [[], 1, "32f"]],
   ["cuv3", [[], 3, "32f"]],
   ["ocuv3", [[], 4, "32f"]],
   ["colors", [[], 3, "32f"]],
  ]);
  this.segments.add([
   ["uvs", []],
   ["overlay-uvs", []],
  ]);
  this.quadVertexData.add([
   ["light", new QuadVertexData()],
   ["ao", new QuadVertexData()],
   ["level", new QuadVertexData()],
   ["overlay-uvs", new QuadVertexData()],
  ]);

  this.vars.add([
   ["face-flipped", 0],
   ["uv", 0],
  ]);
 }
 calculateLight(direction: DirectionNames, ignoreAO = false) {
  LightGradient.calculate(direction, this, ignoreAO);
 }
 calculateFlow() {
  FlowGradient.calculate(this);
 }

 getWorldLight() {
  return this.quadVertexData.get("light")!;
 }

 getWorldAO() {
  return this.quadVertexData.get("ao")!;
 }

 getWorldLevel() {
  return this.quadVertexData.get("level")!;
 }

 getOverlayTextures() {
  return this.quadVertexData.get("overlay-uvs")!;
 }

 setTexture(uv: number) {
  this.vars.set("uv", uv)!;
  return this;
 }

 getUV() {
  return this.vars.get("uv")!;
 }

 setFaceFlipped(value: boolean) {
  this.vars.set("face-flipped", value ? 1 : 0);
  return this;
 }

 isFaceFlipped() {
  return this.vars.get("face-flipped")! == 1;
 }

 isFaceExposed(face: DirectionNames) {
  const voxelExists = this.nVoxel.loadInAt(
   FaceNormals[face][0] + this.voxel.x,
   FaceNormals[face][1] + this.voxel.y,
   FaceNormals[face][2] + this.voxel.z
  );

  if (!voxelExists || !this.nVoxel.isRenderable()) return true;
  let finalResult = false;
  let substanceRuleResult = SubstanceRules.exposedCheck(
   this.voxel.getSubstance(),
   this.nVoxel.getSubstance()
  );
  this.faceDataOverride.face = face;
  this.faceDataOverride.default = substanceRuleResult;
  finalResult = substanceRuleResult;
  this.faceDataOverride.default = finalResult;
  finalResult = OverrideManager.runOverride(
   "CullFace",
   this.voxel.getShapeId(),
   "Any",
   this.faceDataOverride
  );
  this.faceDataOverride.default = finalResult;
  finalResult = OverrideManager.runOverride(
   "CullFace",
   this.voxel.getShapeId(),
   this.nVoxel.getShapeId(),
   this.faceDataOverride
  );
  this.faceDataOverride.default = finalResult;
  finalResult = OverrideManager.runOverride(
   "CullFace",
   this.voxel.getStringId(),
   this.nVoxel.getShapeId(),
   this.faceDataOverride
  );
  return finalResult;
 }
}
