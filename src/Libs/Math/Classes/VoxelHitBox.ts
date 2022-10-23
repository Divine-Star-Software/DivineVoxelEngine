import { BoundingBox } from "./BoundingBox";

export class VoxelHitBox {
 boundingBoxes: BoundingBox[] = [];

 constructor(boundingBoxes: BoundingBox[]) {
  this.boundingBoxes = boundingBoxes;
 }
}
