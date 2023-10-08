import { PhysicsNode } from "../Nodes/PhysicsNodes.js";
import { CollisionsHanlder } from "../Collisions/CollisionsHandler.js";

export abstract class EntityBase {
  active = true;
  node = new PhysicsNode();

  abstract beforeUpdate(): void;
  abstract afterUpdate(): void;

  update() {
    if (!this.active) return;

    this.beforeUpdate();

    CollisionsHanlder.processSwpetAABB(this.node);

    this.afterUpdate();
  }
}
