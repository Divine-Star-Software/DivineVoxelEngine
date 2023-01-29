import type { VoxelShape } from "Meta/Constructor/VoxelShape.types";

export const ShapeManager = {
 shapes: <Map<string, VoxelShape>>new Map(),
 shapeCount: 0,
 registerShape(shapeObject: VoxelShape) {
  this.shapes.set(shapeObject.id, shapeObject);
 },
 getShape(shapeId: string) {
  const shape = this.shapes.get(shapeId);
  if (!shape) {
   throw new Error(`%${shapeId} does not exists.`);
  }
  return shape;
 },
};
