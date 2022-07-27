import type { ColliderObject, ColliderReturnData } from "Meta/Physics/Collider.type.js";

const collisionReturn : ColliderReturnData = [
 {
  name: "main",
  boundingBox: {
   w: 1,
   h: 1,
   d: 1,
  },
  position: [0, 0, 0],
 },
];

export const BoxCollider: ColliderObject = {
 id: "Box",
 getColliderData(x, y, z) {
  collisionReturn[0].position[0] = x;
  collisionReturn[0].position[1] = y;
  collisionReturn[0].position[2] = z;
  return collisionReturn;
 },
};
