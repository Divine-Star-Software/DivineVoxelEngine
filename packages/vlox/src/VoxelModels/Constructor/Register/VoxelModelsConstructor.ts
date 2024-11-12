import { StateSchema } from "../../State/Schema/StateSchema";
import { CondtionalTreeReader } from "../../State/CondiotnalTreeReader";

import { StateTreeReader } from "../../State/StateTreeReader";
import { VoxelModelSyncData } from "../../VoxelModelRules.types";

export class VoxelModelConstructor {
  schema: StateSchema;
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
