import { ShapeStateRelationsNode } from "./ShapeStateRelationsNode";
import { BinarySchemaNode } from "./BinarySchemaNode";
import { VoxelModelStateSchemaData } from "../State.types";
import { DataCursorInterface } from "../../Cursor/DataCursor.interface";
import { Vector3Like } from "@amodx/math";
import { VoxelCursorInterface } from "../../Cursor/VoxelCursor.interface";
export class StateSchema {
  nodes: (BinarySchemaNode | ShapeStateRelationsNode)[] = [];
  position = Vector3Like.Create();
  voxel: VoxelCursorInterface;
  dataCursor: DataCursorInterface;
  constructor(schema: VoxelModelStateSchemaData[]) {
    for (const node of schema) {
      if (node.type == "binary") {
        this.nodes.push(new BinarySchemaNode(node));
      }

      if (node.type == "relation") {
        this.nodes.push(new ShapeStateRelationsNode(this, node));
      }
    }
  }
}
