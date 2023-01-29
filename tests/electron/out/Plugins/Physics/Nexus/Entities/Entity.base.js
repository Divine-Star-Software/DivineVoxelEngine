import { DataTool } from "../../../../Tools/Data/DataTool.js";
import { VoxelMath } from "../../../../Math/VoxelMath.js";
import { DVP } from "../DivineVoxelPhysics.js";
const ep = 0.001;
const dt = new DataTool();
export class EntityBase {
    dataTool = dt;
    active = true;
    //current position
    position = VoxelMath.getVector3(0, 0, 0);
    direction = VoxelMath.getVector3(0, 0, 0);
    //previous position
    previousPosiiton = VoxelMath.getVector3(0, 0, 0);
    //dimensions
    hitBox = { w: 0.8, h: 1.8, d: 0.8 };
    speed = 0.01;
    velocity = VoxelMath.getVector3(0, 0, 0);
    onGround = false;
    veloctiy = VoxelMath.getVector3(0, 0, 0);
    boundingBox = { w: 0, h: 0, d: 0 };
    doCollision(colliderName, collisionData) { }
    setPosition(x, y, z) {
        this.position.updateVector(x, y, z);
    }
    syncPosition(position) {
        position.x = this.position.x;
        position.y = this.position.y;
        position.z = this.position.z;
    }
    cachePosition() {
        this.previousPosiiton.updateFromVec3(this.position);
    }
    setVelocity(x, y, z) {
        this.velocity.updateVector(x, y, z);
    }
    applyVelocity() {
        this.position.addFromVec3(this.velocity);
    }
    beforeUpdate() { }
    afterUpdate() { }
    update() {
        if (!this.active)
            return;
        this.beforeUpdate();
        this.cachePosition();
        this.applyVelocity();
        this.onGround = false;
        //Notice there is a cycle. We may have to run the algorithm several times until the collision is resolved
        while (true) {
            // First we calculate the movement vector for this frame
            // This is the entity's current position minus its last position.
            // The last position is set at the beggining of each frame.
            const dx = this.position.x - this.previousPosiiton.x;
            const dy = this.position.y - this.previousPosiiton.y;
            const dz = this.position.z - this.previousPosiiton.z;
            // These are the bounds of the AABB that may collide with the entity.
            const minX = Math.floor(Math.min(this.position.x, this.previousPosiiton.x) - this.hitBox.w / 2);
            const maxX = Math.floor(Math.max(this.position.x, this.previousPosiiton.x) + this.hitBox.w / 2);
            const minY = Math.floor(Math.min(this.position.y, this.previousPosiiton.y) - this.hitBox.h / 2);
            const maxY = Math.floor(Math.max(this.position.y, this.previousPosiiton.y) + this.hitBox.h / 2);
            const minZ = Math.floor(Math.min(this.position.z, this.previousPosiiton.z) - this.hitBox.d / 2);
            const maxZ = Math.floor(Math.max(this.position.z, this.previousPosiiton.z) + this.hitBox.d / 2);
            let r = { h: 1, nx: 0, ny: 0, nz: 0 };
            // For each voxel that may collide with the entity, find the first that colides with it
            for (let y = minY; y <= maxY; y++) {
                for (let z = minZ; z <= maxZ; z++) {
                    for (let x = minX; x <= maxX; x++) {
                        if (!this.dataTool.loadInAt(x, y, z))
                            continue;
                        const colliderObject = DVP.getCollider(x, y, z);
                        if (!colliderObject)
                            continue;
                        const colliders = colliderObject.getColliderData(x, y, z);
                        const collidersLength = colliders.length;
                        for (let i = 0; i < collidersLength; i++) {
                            const collider = colliders[i];
                            // Check swept collision
                            const c = DVP.collisions.sweepAABB(this.previousPosiiton.x - this.hitBox.w / 2, this.previousPosiiton.y - this.hitBox.h / 2, this.previousPosiiton.z - this.hitBox.d / 2, this.hitBox.w, this.hitBox.h, this.hitBox.d, collider.position[0], collider.position[1], collider.position[2], collider.boundingBox.w, collider.boundingBox.h, collider.boundingBox.d, dx, dy, dz);
                            if (c.ny == 1 && c.h < 0.3) {
                                this.onGround = true;
                            }
                            if (c.h < 1) {
                                this.doCollision(collider.name, c);
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
            this.position.x = this.previousPosiiton.x + r.h * dx + ep * r.nx;
            this.position.y = this.previousPosiiton.y + r.h * dy + ep * r.ny;
            this.position.z = this.previousPosiiton.z + r.h * dz + ep * r.nz;
            // If there was no collision, end the algorithm.
            if (r.h == 1)
                break;
            // Wall Sliding
            // c = a - (a.b)/(b.b) b
            // c - slide vector (rejection of a over b)
            // b - normal to the block
            // a - remaining speed (= (1-h)*speed)
            const BdotB = r.nx * r.nx + r.ny * r.ny + r.nz * r.nz;
            if (BdotB != 0) {
                // Store the current position for the next iteration
                this.cachePosition();
                // Apply Slide
                const AdotB = (1 - r.h) * (dx * r.nx + dy * r.ny + dz * r.nz);
                this.position.x += (1 - r.h) * dx - (AdotB / BdotB) * r.nx;
                this.position.y += (1 - r.h) * dy - (AdotB / BdotB) * r.ny;
                this.position.z += (1 - r.h) * dz - (AdotB / BdotB) * r.nz;
            }
        }
        this.afterUpdate();
    }
}
