import type { VoxelShapeInterface } from "Meta/Constructor/VoxelShape.types";

export const ShapeManager = {
 shapes: <Record<number, VoxelShapeInterface>>{},
 shapeMap: <Record<string, number>>{},
 shapeCount: 0,
 registerShape(shapeObject: VoxelShapeInterface) {
  this.shapes[this.shapeCount] = shapeObject;
  this.shapeMap[shapeObject.id] = this.shapeCount;
  this.shapeCount++;
 },
 getShape(shapeId: number) {
  if (!this.shapes[shapeId]) {
   throw new Error(`%${shapeId} does not exists.`);
  }
  return this.shapes[shapeId];
 },
 getShapeId(shapeId : string) {
    if(!this.shapeMap[shapeId]) {
        throw new Error(`%${shapeId} does not exists.`);  
    }
    return this.shapeMap[shapeId];
 },
 getShapeMap() {
  return this.shapeMap;
 },
};
