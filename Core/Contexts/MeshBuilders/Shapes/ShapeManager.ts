import type { VoxelShapeInterface } from "Meta/Voxels/Shapes/VoxelShape.interface";

export class ShapeManager {
 shapes: Record<number, VoxelShapeInterface> = {};

 registerShape(id: number, shapeObject: VoxelShapeInterface) {
  this.shapes[id] = shapeObject;
 }
}
