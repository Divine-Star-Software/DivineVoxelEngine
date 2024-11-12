import { ShapeStateRelationsNode } from "./ShapeStateRelationsNode";
import { BinarySchemaNode } from "./BinarySchemaNode";
import { VoxelModelStateSchemaData } from "../State.types";
import { DataTool } from "../../../Tools/Data/DataTool";

export class StateSchema {
  voxel = new DataTool();
  nVoxel = new DataTool();
  nodes: (BinarySchemaNode | ShapeStateRelationsNode)[] = [];
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
