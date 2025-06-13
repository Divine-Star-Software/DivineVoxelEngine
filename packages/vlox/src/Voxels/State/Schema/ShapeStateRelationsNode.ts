import { VoxelModelRelationsSchemaNodes } from "../State.types";
import { SameVoxelCondition } from "./Conditions/SameVoxelConditions";
import { ShapeStateSchemaRelationsCondition } from "./Conditions/ShapeStateSchemaRelationsCondition";
import { StateSchema } from "./StateSchema";

export class ShapeStateRelationsNode {
  name: string;

  conditions: ShapeStateSchemaRelationsCondition[] = [];
  constructor(
    public schema: StateSchema,
    data: VoxelModelRelationsSchemaNodes
  ) {
    this.name = data.name;
    for (const cond of data.conditions) {
      if (cond.type == "same-voxel") {
        this.conditions.push(new SameVoxelCondition(schema, cond));
      }
    }
  }

  getValue() {
    let value = 1;
    const conditionsLength = this.conditions.length;
    for (let i = 0; i < conditionsLength; i++) {
      if (!this.conditions[i].evulate()) {
        value = 0;
        break;
      }
    }
    return value;
  }
}
