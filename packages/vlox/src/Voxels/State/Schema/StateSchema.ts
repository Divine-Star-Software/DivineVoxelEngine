import { ShapeStateRelationsNode } from "./ShapeStateRelationsNode";
import { BinarySchemaNode } from "./BinarySchemaNode";
import { DataCursorInterface } from "../../Cursor/DataCursor.interface";
import { Vector3Like } from "@amodx/math";
import { VoxelCursorInterface } from "../../Cursor/VoxelCursor.interface";
import { VoxelStateSchemaData } from "../State.types";
export class StateSchema {
  nodes: (BinarySchemaNode | ShapeStateRelationsNode)[] = [];
  position = Vector3Like.Create();
  voxel: VoxelCursorInterface;
  dataCursor: DataCursorInterface;
  constructor(schema: VoxelStateSchemaData) {
    for (const binary of schema.binary) {
      this.nodes.push(new BinarySchemaNode(binary));
    }
    for (const relational of schema.relational) {
      this.nodes.push(new ShapeStateRelationsNode(this, relational));
    }
  }
}
