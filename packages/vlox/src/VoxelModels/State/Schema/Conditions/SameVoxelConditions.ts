import { SameVoxelRelationsConditionData } from "../../../VoxelModel.types";
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
    if (
      !this.schema.nVoxel.loadInAt(
        this.schema.voxel.x + this.data.direction[0],
        this.schema.voxel.y + this.data.direction[1],
        this.schema.voxel.z + this.data.direction[2]
      )
    )
      return false;
    return this.schema.voxel.getId() == this.schema.nVoxel.getId();
  }
}
