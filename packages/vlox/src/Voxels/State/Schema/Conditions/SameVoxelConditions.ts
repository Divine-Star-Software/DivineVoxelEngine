import { SameVoxelRelationsConditionData } from "../../State.types";
import { ShapeStateSchemaRelationsCondition } from "./ShapeStateSchemaRelationsCondition";
import { StateSchema } from "../StateSchema";

export class SameVoxelCondition extends ShapeStateSchemaRelationsCondition {
  constructor(
    schema: StateSchema,
    public data: SameVoxelRelationsConditionData
  ) {
    super(schema);
  }

  evulate(): boolean {
    const nx = this.schema.position.x + this.data.direction[0];
    const ny = this.schema.position.y + this.data.direction[1];
    const nz = this.schema.position.z + this.data.direction[2];
    const nVoxel = this.schema.dataCursor.getVoxel(nx, ny, nz);
    if (!nVoxel) return false;
    return this.schema.voxel.isSameVoxel(nVoxel);
  }
}
