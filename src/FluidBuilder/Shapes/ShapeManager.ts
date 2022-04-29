import type { VoxelShapeInterface } from "Meta/Builder/Shapes/VoxelShape.interface";

export class ShapeManager {
 shapes: Record<number, VoxelShapeInterface> = {};


 shapeMap : Record<string,number> = {};
 shapeCount  = 0;

 registerShape( shapeObject: VoxelShapeInterface) {
  this.shapes[this.shapeCount] = shapeObject;
  this.shapeMap[shapeObject.id] = this.shapeCount;
  this.shapeCount++;
 }

 getShape(shapeId : number) {
     if(!this.shapes[shapeId]) {
         console.log(`%${shapeId}`,"font-size:20px; color: red;")
     }
     return this.shapes[shapeId];
 }

 getShapeMap() {
     return this.shapeMap;
 }
}
