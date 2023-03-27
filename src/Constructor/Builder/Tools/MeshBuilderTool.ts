import type { Dimension2Matrix, Position3Matrix } from "Math";
import type { DirectionNames } from "Meta";

import { QuadBuilder } from "../Geometry/QuadBuilder.js";
import { QuadUVs } from "../Geometry/QuadUVs.js";
import {
 QuadTransforms,
 QuadVertexes,
 TextureRotations,
} from "../Types/Geometry.types.js";
import { MesherDataTool } from "./MesherDataTools.js";

export class MeshBuilderTool {
 direction: DirectionNames = "top";
 tool: MesherDataTool;
 constructor() {}

 setMesherTool(tool: MesherDataTool) {
  this.tool = tool;
  this.quad.setMesherTool(tool);
  return this;
 }

 quad = new QuadBuilderTool();
}

export class QuadBuilderTool {
 tool: MesherDataTool;
 builder = QuadBuilder;
 uvs = new QuadUVTool(this,"cuv3");

 setMesherTool(tool: MesherDataTool) {
  this.tool = tool;
  return this;
 }
 _fliped = false;
 _direction: DirectionNames = "top";
 _position: Position3Matrix = { x: 0, y: 0, z: 0 };
 _cachedPosition: Position3Matrix = { x: 0, y: 0, z: 0 };
 _dimension: Dimension2Matrix = { height: 0, width: 0 };
 _transform: QuadTransforms = {
  1: { x: 0, y: 0, z: 0 },
  2: { x: 0, y: 0, z: 0 },
  3: { x: 0, y: 0, z: 0 },
  4: { x: 0, y: 0, z: 0 },
 };
 setDimensions(width: number, height: number) {
  this._dimension.width = width;
  this._dimension.height = height;
  return this;
 }
 setPosition(x: number = 0, y: number = 0, z: number = 0) {
  this._position.x = x;
  this._position.y = y;
  this._position.z = z;
  this._cachedPosition.x = x;
  this._cachedPosition.y = y;
  this._cachedPosition.z = z;
  return this;
 }
 updatePosition(x: number = 0, y: number = 0, z: number = 0) {
  this._position.x = this._cachedPosition.x + x;
  this._position.y = this._cachedPosition.y + y;
  this._position.z = this._cachedPosition.z + z;
  return this;
 }
 updatePositionInPlace(x: number = 0, y: number = 0, z: number = 0) {
  this._position.x += x;
  this._position.y += y;
  this._position.z += z;
  return this;
 }
 setTransform(vertex: QuadVertexes, x = 0, y = 0, z = 0) {
  const t = this._transform[vertex];
  t.x = x;
  t.y = y;
  t.z = z;
  return this;
 }
 clearTransform() {
  this.setTransform(1);
  this.setTransform(2);
  this.setTransform(3);
  this.setTransform(4);
  return this;
 }
 setFlipped(flipped: boolean) {
  this._fliped = flipped;
  return this;
 }
 setDirection(direction: DirectionNames) {
  this._direction = direction;

  return this;
 }
 create() {
  this.builder.create(
   this.tool,
   this._direction,
   this._position,
   this._dimension,
   this._fliped,
   this._transform
  );
  return this;
 }
 clear() {
  this._cachedPosition.x = 0;
  this._cachedPosition.y = 0;
  this._cachedPosition.z = 0;
  this._fliped = false;
  this._dimension.width = 1;
  this._dimension.height = 1;
  for (let i = 1; i < 5; i++) {
   this._transform[i as QuadVertexes].x = 0;
   this._transform[i as QuadVertexes].y = 0;
   this._transform[i as QuadVertexes].z = 0;
  }
  return this;
 }
}

export class QuadUVTool<T extends QuadBuilderTool> {

 uvs = QuadUVs;
 _data = {
  width: [0, 1],
  height: [0, 1],
 };
 _fliped = false;
 advancedUVs = {
  hs1: 0,
  hs2: 0,
  he1: 1,
  he2: 1,
  ws1: 0,
  ws2: 0,
  we1: 1,
  we2: 1,
 };
 _rotation: TextureRotations = 0;
 constructor(public quad: T,public attributeId : string) {}

 resetAdvancedUVs() {
  this.advancedUVs.hs1 = 0;
  this.advancedUVs.hs2 = 0;
  this.advancedUVs.he1 = 1;
  this.advancedUVs.he2 = 1;
  this.advancedUVs.ws1 = 0;
  this.advancedUVs.ws2 = 0;
  this.advancedUVs.we1 = 1;
  this.advancedUVs.we2 = 1;
  return this;
 }

 setFlipped(flipped: boolean) {
  this._fliped = flipped;
  return this;
 }
 setWidth(start: number, end: number) {
  this._data.width[0] = start;
  this._data.width[1] = end;
  return this;
 }
 setHeight(start: number, end: number) {
  this._data.height[0] = start;
  this._data.height[1] = end;
  return this;
 }
 setRoation(rotation: TextureRotations) {
  this._rotation = rotation;
  return this;
 }

 addAdvancedUVs(textureId: number) {
  this.uvs.addAdvancedUVs(
   this.quad._direction,
   textureId,
   this.quad.tool.getAttribute(this.attributeId),
   this.advancedUVs,
   this._fliped
  );
  return this;
 }

 add(textureId: number) {
  this.uvs.addUVs({
   direction: this.quad._direction,
   uvs: this.quad.tool.getAttribute(this.attributeId),
   uv: textureId as number,
   width: { start: this._data.width[0], end: this._data.width[1] },
   height: { start: this._data.height[0], end: this._data.height[1] },
   flipped: this._fliped,
   rotoate: this._rotation,
  });
  return this.quad;
 }
 clear() {
  this._data.width[0] = 0;
  this._data.width[1] = 1;
  this._data.height[0] = 0;
  this._data.height[1] = 1;
  this._fliped = false;
  this._rotation = 0;
  this.resetAdvancedUVs();
  return this.quad;
 }
}
