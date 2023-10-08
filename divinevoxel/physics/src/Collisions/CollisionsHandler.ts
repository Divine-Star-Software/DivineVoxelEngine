import type { PhysicsNode } from "Nodes/PhysicsNodes";
import { Vector3 } from "@divinevoxel/core/Math/Classes/Vector3.js";
import { Scalar } from "@divinevoxel/core/Math/Classes/Scalar.js";
import { BoundingBox } from "Classes/BoundingBox.js";
import { CollisionNode } from "Classes/CollisionNode.js";
import { CollisionResult } from "../Classes/CollisionResult.js";
import { Line } from "../Classes/Line.js";
import { Plane } from "../Classes/Plane.js";

/** # CollisionsHanlder
 * Handles collision handling for physics nodes.
 * ***
 *
 * The swept AABB code was adapted from this article:
 * https://luisreis.net/blog/aabb_collision_handling/
 */
export const CollisionsHanlder = {
  get COLLISION_CHECK_POSITION_OFFSET() {
    return 0.001;
  },

  aabb: {
    start: new Vector3(0, 0, 0),
    delta: new Vector3(0, 0, 0),
    results: new CollisionResult(),
    line: new Line(),
    plane: new Plane(),
    dimensions: new Vector3(0, 0, 0),
  },

  /** # sweepAABBN
   * Calculates the collision for physics node against a bounding box.
   * @param physicsNodePosition
   * @param boundingBox
   * @param collisionNode
   * @param velocity Delata aka velocity of the physics object
   * @returns
   */
  sweepAABBN(
    physicsNodePosition: Vector3,
    boundingBox: BoundingBox,
    collisionNode: CollisionNode,
    velocity: Vector3
  ) {
    let mx, my, mz, mhx, mhy, mhz;

    mx = collisionNode.position.x - (physicsNodePosition.x + boundingBox.width);
    my =
      collisionNode.position.y - (physicsNodePosition.y + boundingBox.height);
    mz = collisionNode.position.z - (physicsNodePosition.z + boundingBox.depth);
    mhx = boundingBox.width + collisionNode.boundingBox.width;
    mhy = boundingBox.height + collisionNode.boundingBox.height;
    mhz = boundingBox.depth + collisionNode.boundingBox.depth;

    collisionNode.results.reset();
    let hitDepth;
    const data = collisionNode.results.raw;

    this.aabb.line.update(Vector3.Zero, velocity);

    hitDepth = this.aabb.plane
      .update(this.aabb.dimensions.set(mx, my, mz), Vector3.West)
      .lineToPlane(this.aabb.line);
    // X min
    if (
      hitDepth >= 0 &&
      velocity.x > 0 &&
      hitDepth < data.hitDepth &&
      Scalar.Between(hitDepth * velocity.y, my, my + mhy) &&
      Scalar.Between(hitDepth * velocity.z, mz, mz + mhz)
    ) {
      collisionNode.results.update(hitDepth, -1, 0, 0);
    }

    hitDepth = this.aabb.plane
      .update(this.aabb.dimensions.set(mx + mhx, my, mz), Vector3.East)
      .lineToPlane(this.aabb.line);
    // X max
    if (
      hitDepth >= 0 &&
      velocity.x < 0 &&
      hitDepth < data.hitDepth &&
      Scalar.Between(hitDepth * velocity.y, my, my + mhy) &&
      Scalar.Between(hitDepth * velocity.z, mz, mz + mhz)
    ) {
      collisionNode.results.update(hitDepth, 1, 0, 0);
    }

    // Y min
    hitDepth = this.aabb.plane
      .update(this.aabb.dimensions.set(mx, my, mz), Vector3.Bottom)
      .lineToPlane(this.aabb.line);
    if (
      hitDepth >= 0 &&
      velocity.y > 0 &&
      hitDepth < data.hitDepth &&
      Scalar.Between(hitDepth * velocity.x, mx, mx + mhx) &&
      Scalar.Between(hitDepth * velocity.z, mz, mz + mhz)
    ) {
      collisionNode.results.update(hitDepth, 0, -1, 0);
    }

    // Y max
    hitDepth = this.aabb.plane
      .update(this.aabb.dimensions.set(mx, my + +mhy, mz), Vector3.Top)
      .lineToPlane(this.aabb.line);
    if (
      hitDepth >= 0 &&
      velocity.y < 0 &&
      hitDepth < data.hitDepth &&
      Scalar.Between(hitDepth * velocity.x, mx, mx + mhx) &&
      Scalar.Between(hitDepth * velocity.z, mz, mz + mhz)
    ) {
      collisionNode.results.update(hitDepth, 0, 1, 0);
    }

    // Z min
    hitDepth = this.aabb.plane
      .update(this.aabb.dimensions.set(mx, my, mz), Vector3.South)
      .lineToPlane(this.aabb.line);
    if (
      hitDepth >= 0 &&
      velocity.z > 0 &&
      hitDepth < data.hitDepth &&
      Scalar.Between(hitDepth * velocity.x, mx, mx + mhx) &&
      Scalar.Between(hitDepth * velocity.y, my, my + mhy)
    ) {
      collisionNode.results.update(hitDepth, 0, 0, -1);
    }

    // Z max
    hitDepth = this.aabb.plane
      .update(this.aabb.dimensions.set(mx, my, mz + mhz), Vector3.South)
      .lineToPlane(this.aabb.line);
    if (
      hitDepth >= 0 &&
      velocity.z < 0 &&
      hitDepth < data.hitDepth &&
      Scalar.Between(hitDepth * velocity.x, mx, mx + mhx) &&
      Scalar.Between(hitDepth * velocity.y, my, my + mhy)
    ) {
      collisionNode.results.update(hitDepth, 0, 0, 1);
    }

    //  node.results.update(h, nx, ny, nz);
    return collisionNode.results.raw;
  },

  between(x: number, a: number, b: number) {
    return x >= a && x <= b;
  },

  processSwpetAABB(node: PhysicsNode) {
    if (Number.isNaN(node.position.x)) {
      node.position.x = 0;
    }
    if (Number.isNaN(node.position.y)) {
      node.position.y = 0;
    }
    if (Number.isNaN(node.position.z)) {
      node.position.z = 0;
    }
    node.__previousPosiiton.updateFromVec3(node.position);
    node.applyForces();

    //Notice there is a cycle. We may have to run the algorithm several times until the collision is resolved
    while (true) {
      // First we calculate the movement vector for this frame
      // This is the entity's current position minus its last position.
      // The last position is set at the beggining of each frame.

      this.aabb.delta.x = node.position.x - node.__previousPosiiton.x;
      this.aabb.delta.y = node.position.y - node.__previousPosiiton.y;
      this.aabb.delta.z = node.position.z - node.__previousPosiiton.z;
      node.__delta.updateFromVec3(node.position);

      // These are the bounds of the AABB that may collide with the entity.
      const minX = Math.floor(
        Math.min(node.position.x, node.__previousPosiiton.x) -
          node.boundingBox.halfWidth
      );
      const maxX = Math.floor(
        Math.max(node.position.x, node.__previousPosiiton.x) +
          node.boundingBox.halfWidth
      );
      const minY = Math.floor(
        Math.min(node.position.y, node.__previousPosiiton.y) -
          node.boundingBox.halfHeight
      );
      const maxY = Math.floor(
        Math.max(node.position.y, node.__previousPosiiton.y) +
          node.boundingBox.halfHeight
      );
      const minZ = Math.floor(
        Math.min(node.position.z, node.__previousPosiiton.z) -
          node.boundingBox.halfDepth
      );
      const maxZ = Math.floor(
        Math.max(node.position.z, node.__previousPosiiton.z) +
          node.boundingBox.halfDepth
      );

      this.aabb.results.reset();
      let collisionResults = this.aabb.results.raw;

      // For each voxel that may collide with the entity, find the first that colides with it
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          for (let x = minX; x <= maxX; x++) {
            if (!node.dataTool.loadInAt(x, y, z)) continue;
            const collider = node.dataTool.getColliderObj();

            if (!collider) continue;

            const nodes = collider.getNodes(node.dataTool);
            const collidersLength = nodes.length;
            for (let i = 0; i < collidersLength; i++) {
              const colliderNode = nodes[i];
              // Check swept collision

              this.aabb.start.x =
                node.__previousPosiiton.x - node.boundingBox.halfWidth;
              this.aabb.start.y =
                node.__previousPosiiton.y - node.boundingBox.halfHeight;
              this.aabb.start.z =
                node.__previousPosiiton.z - node.boundingBox.halfDepth;

              const collisionCheck = this.sweepAABBN(
                this.aabb.start,
                node.boundingBox,
                colliderNode,
                this.aabb.delta
              );

              if (collisionCheck.hitDepth < 1) {
                node.doCollision(collider, colliderNode, node.dataTool);
              }
              //If the voxel will not stop the entity continue
              if (!node.dataTool.isSolid() || !collider.isSolid) continue;
              //Check if this collision is closer than the closest so far.
              if (collisionCheck.hitDepth < collisionResults.hitDepth) {
                this.aabb.results.loadIn(colliderNode.results);
              }
            }
          }
        }
      }

      // Update the entity's position
      // We move the entity slightly away from the block in order to miss seams.

      node.position.x =
        node.__previousPosiiton.x +
        collisionResults.hitDepth * this.aabb.delta.x +
        this.COLLISION_CHECK_POSITION_OFFSET * collisionResults.nx;
      node.position.y =
        node.__previousPosiiton.y +
        collisionResults.hitDepth * this.aabb.delta.y +
        this.COLLISION_CHECK_POSITION_OFFSET * collisionResults.ny;
      node.position.z =
        node.__previousPosiiton.z +
        collisionResults.hitDepth * this.aabb.delta.z +
        this.COLLISION_CHECK_POSITION_OFFSET * collisionResults.nz;

      // If there was no collision, end the algorithm.
      if (collisionResults.hitDepth == 1) break;

      // Wall Sliding
      // c = a - (a.b)/(b.b) b
      // c - slide vector (rejection of a over b)
      // b - normal to the block
      // a - remaining speed (= (1-h)*speed)
      const BdotB =
        collisionResults.nx * collisionResults.nx +
        collisionResults.ny * collisionResults.ny +
        collisionResults.nz * collisionResults.nz;
      if (BdotB != 0) {
        // Store the current position for the next iteration
        node.__previousPosiiton.updateFromVec3(node.position);

        // Apply Slide
        const AdotB =
          (1 - collisionResults.hitDepth) *
          (this.aabb.delta.x * collisionResults.nx +
            this.aabb.delta.y * collisionResults.ny +
            this.aabb.delta.z * collisionResults.nz);
        node.position.x +=
          (1 - collisionResults.hitDepth) * this.aabb.delta.x -
          (AdotB / BdotB) * collisionResults.nx;
        node.position.y +=
          (1 - collisionResults.hitDepth) * this.aabb.delta.y -
          (AdotB / BdotB) * collisionResults.ny;
        node.position.z +=
          (1 - collisionResults.hitDepth) * this.aabb.delta.z -
          (AdotB / BdotB) * collisionResults.nz;
      }

      node.delta.set(
        node.position.x - node.__delta.x,
        node.position.y - node.__delta.y,
        node.position.z - node.__delta.z
      );
    }
  },
};
