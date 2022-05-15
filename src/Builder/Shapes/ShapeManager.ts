import type { VoxelShapeInterface } from "Meta/Builder/Shapes/VoxelShape.interface";

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
   console.error(`%${shapeId} does not exists.`);
  }
  return this.shapes[shapeId];
 },
 getShapeMap() {
  return this.shapeMap;
 },
};
