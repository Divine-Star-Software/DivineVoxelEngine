import { PhysicsNode } from "Nodes/PhysicsNodes";
import { Vec3Array } from "@divinevoxel/core/Math";
import { Vector3 } from "@divinevoxel/core/Math/Classes/Vector3.js";

export class PhysicsProbe {
  voxels = {
    _position: new Vector3(0, 0, 0),
    *queryWithNode(node: PhysicsNode): Generator<Vec3Array> {
      this._position.updateFromVec3(node.position);
      node.boundingBox.setPosition(node.position);
      for (const [x, y, z] of node.boundingBox.query()) {
        if (!node.dataTool.loadInAt(x, y, z)) continue;
        if (node.dataTool.isAir()) continue;
        const collider = node.dataTool.getColliderObj();
        if (!collider) continue;
        const nodes = collider.getNodes(node.dataTool);
        for (const colliderNode of nodes) {
          colliderNode.boundingBox.setPosition(this._position.set(x, y, z));
          if (node.boundingBox.doesIntersect(colliderNode.boundingBox)) {
            yield [x, y, z];
            break;
          }
        }
      }
    },
    *queryWithNodeAtPosition(
      position: Vector3,
      node: PhysicsNode
    ): Generator<Vec3Array> {
      this._position.updateFromVec3(position);
      node.boundingBox.setPosition(position);
      for (const [x, y, z] of node.boundingBox.query()) {
        if (!node.dataTool.loadInAt(x, y, z)) continue;
        if (node.dataTool.isAir()) continue;
        const collider = node.dataTool.getColliderObj();
        if (!collider) continue;
        const nodes = collider.getNodes(node.dataTool);
        for (const colliderNode of nodes) {
          colliderNode.boundingBox.setPosition(this._position.set(x, y, z));
          if (node.boundingBox.doesIntersect(colliderNode.boundingBox)) {
            yield [x, y, z];
            break;
          }
        }
      }
    },
  };
}
