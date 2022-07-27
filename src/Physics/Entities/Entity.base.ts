import { DVEM } from "../../Math/DivineVoxelEngineMath.js";
import { WorldMatrix } from "../../Matrix/WorldMatrix.js";
import { DVEPH } from "../DivineVoxelEnginePhysics.js";

export const EntityBase = {
 collideWithLevel: true,
 //current position
 x: 0,
 y: 0,
 z: 0,
 //previous position
 px: 0,
 py: 0,
 pz: 0,
 //dimensions
 hx: 0.8,
 hy: 1.9,
 hz: 0.8,

 velocity: DVEM.getVector3(0, 0, 0),

 onGround: false,

 veloctiy: DVEM.getVector3(0, 0, 0),
 boundingBox: { w: 0, h: 0, d: 0 },
 doCollision(
  x: number,
  y: number,
  z: number,
  colliderName: string,
  collisionData: { h: number; nx: number; ny: number; nz: number }
 ) {},

 setPosition(x: number, y: number, z: number) {
  this.x = x;
  this.y = y;
  this.z = z;
 },
 syncPosition(position: Float32Array) {
  position[0] = this.x;
  position[1] = this.y;
  position[2] = this.z;
 },
 cachePosition() {
  this.px = this.x;
  this.py = this.y;
  this.pz = this.z;
 },
 setVelocity(x: number, y: number, z: number) {
  this.velocity.updateVector(x, y, z);
 },
 applyVelocity() {
  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.z += this.velocity.z;
 },

 beforeUpdate() {},
 afterUpdate() {},

 update() {
  this.beforeUpdate();
  this.cachePosition();
  this.applyVelocity();
  if (!this.collideWithLevel) return;
  this.onGround = false;
  //Notice there is a cycle. We may have to run the algorithm several times until the collision is resolved
  while (true) {
   // First we calculate the movement vector for this frame
   // This is the entity's current position minus its last position.
   // The last position is set at the beggining of each frame.
   const dx = this.x - this.px;
   const dy = this.y - this.py;
   const dz = this.z - this.pz;

   // These are the bounds of the AABB that may collide with the entity.
   const minXi = Math.floor(Math.min(this.x, this.px) - this.hx / 2);
   const maxXi = Math.floor(Math.max(this.x, this.px) + this.hx / 2);
   const minYi = Math.floor(Math.min(this.y, this.py) - this.hy / 2);
   const maxYi = Math.floor(Math.max(this.y, this.py) + this.hy / 2);
   const minZi = Math.floor(Math.min(this.z, this.pz) - this.hz / 2);
   const maxZi = Math.floor(Math.max(this.z, this.pz) + this.hz / 2);

   let r = { h: 1, nx: 0, ny: 0, nz: 0 };

   // For each voxel that may collide with the entity, find the first that colides with it
   for (let yi = minYi; yi <= maxYi; yi++) {
    for (let zi = minZi; zi <= maxZi; zi++) {
     for (let xi = minXi; xi <= maxXi; xi++) {
      const colliderObject = DVEPH.getCollider(xi, yi, zi);
      if (!colliderObject) continue;

      const colliders = colliderObject.getColliderData(xi, yi, zi);
      const collidersLength = colliders.length;
      for (let i = 0; i < collidersLength; i++) {
       const collider = colliders[i];
       // Check swept collision
       const c = DVEPH.collisions.sweepAABB(
        this.px - this.hx / 2,
        this.py - this.hy / 2,
        this.pz - this.hz / 2,
        this.hx,
        this.hy,
        this.hz,
        collider.position[0],
        collider.position[1],
        collider.position[2],
        collider.boundingBox.w,
        collider.boundingBox.h,
        collider.boundingBox.d,
        dx,
        dy,
        dz
       );
       if (c.ny == 1) {
        this.onGround = true;
       }

       if (c.h < 1) {
        this.doCollision(xi, yi, zi, collider.name, c);
       }
       //Check if this collision is closer than the closest so far.
       if (c.h < r.h) {
        r = c;
       }
      }
     }
    }
   }

   // Update the entity's position
   // We move the entity slightly away from the block in order to miss seams.
   const ep = 0.001;
   this.x = this.px + r.h * dx + ep * r.nx;
   this.y = this.py + r.h * dy + ep * r.ny;
   this.z = this.pz + r.h * dz + ep * r.nz;

   // If there was no collision, end the algorithm.
   if (r.h == 1) break;

   // Wall Sliding
   // c = a - (a.b)/(b.b) b
   // c - slide vector (rejection of a over b)
   // b - normal to the block
   // a - remaining speed (= (1-h)*speed)
   const BdotB = r.nx * r.nx + r.ny * r.ny + r.nz * r.nz;
   if (BdotB != 0) {
    // Store the current position for the next iteration
    this.px = this.x;
    this.py = this.y;
    this.pz = this.z;

    // Apply Slide
    const AdotB = (1 - r.h) * (dx * r.nx + dy * r.ny + dz * r.nz);
    this.x += (1 - r.h) * dx - (AdotB / BdotB) * r.nx;
    this.y += (1 - r.h) * dy - (AdotB / BdotB) * r.ny;
    this.z += (1 - r.h) * dz - (AdotB / BdotB) * r.nz;
   }
  }
  this.afterUpdate();
 },
};
