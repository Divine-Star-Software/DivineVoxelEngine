"use strict";
/* import { DimensionsVector3 } from "Math/Types/Math.types.js";
import { PhysicsObject } from "Meta/Physics/Physics.object.type";
import { DVEPH } from "../../DivineVoxelEnginePhysics.js";

const origion = DVEPH.math.getVector3(0, 0, 0);
const dimensions: DimensionsVector3 = { w: 1, h: 1, d: 1 };
const boundingBox = DVEPH.math.getSimpleBoundingBox(origion, dimensions);

const collisionReturn = [
 {
  name: "main",
 },
];

export const BoxPhysicsObject: PhysicsObject = {
 id: "Box",
 setOrigin(x, y, z) {
  boundingBox.updateOrigin(x, y, z);
 },
 checkCollision(boundingBox) {
  if (boundingBox.doesBoxIntersect(boundingBox.bounds)) {
   return collisionReturn;
  } else {
   return [];
  }
 },
};
 */ 
