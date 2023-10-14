import { Vector3 } from "@divinevoxel/core/Math/Classes/Vector3.js";
import { PhysicsDataTool } from "../Tools/Data/PhysicsDataTool.js";
import { Position3Matrix } from "@divinevoxel/core/Math/index.js";
import { LocationData } from "@divinestar/voxelspaces";
import { BoundingBox } from "../Classes/BoundingBox.js";
import type { Collider } from "../Classes/Collider.js";
import { CollisionNode } from "../Classes/CollisionNode.js";
import { PhysicsProbe } from "../Tools/Data/PhysicsProbe.js";

type ColliderHanlder = (
  collider: Collider,
  colisionNode: CollisionNode,
  dataTool: PhysicsDataTool
) => void;

/**# Physics Node
 * Holds the most basic information for a physics based object.
 *
 */
export class PhysicsNode {
  __previousPosiiton = new Vector3(0, 0, 0);
  __delta = new Vector3(0, 0, 0);

  acceleration = new Vector3(1, 1, 1);
  velocity = new Vector3(0, 0, 0);

  position = new Vector3(0, 0, 0);
  direction = new Vector3(0, 0, 0);
  delta = new Vector3(0, 0, 0);
  boundingBox = new BoundingBox();
  probe = new PhysicsProbe();
  dataTool = new PhysicsDataTool();

  doCollision: ColliderHanlder

  setCollisionHanlder(handler: ColliderHanlder) {
    this.doCollision = handler;
  }

  setLocation(location: LocationData) {
    this.dataTool.setLocation(location);
    this.position.x = location[1];
    this.position.y = location[2];
    this.position.z = location[3];
  }
  setPosition(x: number, y: number, z: number) {
    this.position.set(x, y, z);
  }
  syncPosition(position: Position3Matrix) {
    position.x = this.position.x;
    position.y = this.position.y;
    position.z = this.position.z;
  }

  applyForces() {
    this.position.x = this.position.x + this.acceleration.x * this.velocity.x;
    this.position.y = this.position.y + this.acceleration.y * this.velocity.y;
    this.position.z = this.position.z + this.acceleration.z * this.velocity.z;
  }

  calculateFinalDirection(forwardDirection: Vector3, sideDirection: Vector3) {
    //reset direction
    this.direction.scaleXYZ(0);
    //get forward direction from where the player is looking
    forwardDirection.normalize();
    //get side direction from where the player is looking
    sideDirection.normalize();
    //apply any changes on the direction vector based on player's state
    //finally add, nomalize, then scale
    this.direction.addFromVec3(forwardDirection);
    this.direction.addFromVec3(sideDirection);
    if (!this.direction.isZero()) {
      this.direction.normalize();
    }
  }
}
