import { StateSchema } from "../../../VoxelState/Schema/StateSchema";
import { CondtionalTreeReader } from "../../../VoxelState/CondiotnalTreeReader";

import { StateTreeReader } from "../../../VoxelState/StateTreeReader";
import { VoxelModelSyncData } from "../../../VoxelData/VoxelSyncData";
import { VoxelModelEffect } from "./VoxelModelEffect";

export class VoxelModelConstructor {
  schema: StateSchema;
  effects: VoxelModelEffect;
  shapeStateTree: StateTreeReader;

  condtioanlShapeStateTree: CondtionalTreeReader;
  constructor(public data: VoxelModelSyncData) {
    this.schema = new StateSchema(data.schema);
    this.shapeStateTree = new StateTreeReader(
      this.schema,
      0,
      data.shapeStateTree
    );
    this.condtioanlShapeStateTree = new CondtionalTreeReader(
      this.schema,
      data.condiotnalStatements,
      data.condiotnalStateTree
    );

    this.effects = new VoxelModelEffect(this);
  }

  getShapeStateTransaprentByteIndex(shapeState: number, geomtryId: number) {
    return this.data.relativeGeometryByteIndexMap[
      this.data.shapeStateRelativeGeometryMap[shapeState][geomtryId]
    ];
  }
  getCondtionalStateTransaprentByteIndex(
    shapeState: number,
    geomtryId: number
  ) {
    return this.data.relativeGeometryByteIndexMap[
      this.data.condiotnalShapeStateRelativeGeometryMap[shapeState][geomtryId]
    ];
  }
}
