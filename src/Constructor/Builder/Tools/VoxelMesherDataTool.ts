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

export class VoxelMesherDataTool extends MesherDataTool {
 relativePosition = { x: 0, y: 0, z: 0 };
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
   ["faceData", [[], 1, "32f"]],
   ["aoColors", [[], 1, "32f"]],
   ["lightColors", [[], 4, "32f"]],
   ["colors", [[], 3, "32f"]],
   ["cuv3", [[], 3, "32f"]],
   ["ocuv3", [[], 4, "32f"]],
  ]);
  this.segments.add([
   ["light", []],
   ["ao", []],
   ["level", []],
   ["uvs", []],
   ["overlay-uvs", []],
  ]);
  this.vars.add([["face-flipped", 0]]);
 }
 calculateLight(direction: DirectionNames, ignoreAO = false) {
  LightGradient.calculate(direction, this, ignoreAO);
 }
 calculateFlow() {
  FlowGradient.calculate(this);
 }
 setLight(...light: number[]) {
  this.segments.set("light", light);
  return this;
 }
 getLight() {
  return <CustomVertexData>this.segments.get("light")!;
 }
 setAO(...ao: number[]) {
  this.segments.set("ao", ao);
  return this;
 }
 getAO() {
  return <CustomVertexData>this.segments.get("ao")!;
 }
 setLevel(...levels: number[]) {
  this.segments.set("level", levels)!;
  return this;
 }
 getLevel() {
  return <CustomVertexData>this.segments.get("level")!;
 }
 setUV(...uvs: number[]) {
  this.segments.set("uvs", uvs)!;
  return this;
 }
 getUV() {
  return <[number]>this.segments.get("uvs")!;
 }
 setOverlayUV(...overlayUVs: number[]) {
  this.segments.set("overlay-uvs", overlayUVs)!;
  return this;
 }
 getOverlayUV() {
  return <CustomVertexData>this.segments.get("overlay-uvs")!;
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
