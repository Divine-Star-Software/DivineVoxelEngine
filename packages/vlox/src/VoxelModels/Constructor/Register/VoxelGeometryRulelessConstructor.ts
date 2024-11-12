import { VoxelGeometryRulelessSyncData } from "../../VoxelModelRules.types";
import { RulelessBoxVoxelGeometryNode } from "../Nodes/Ruleless/RulelessBoxVoxelGeometryNode";
import { RulelessQuadVoxelGeometryNode } from "../Nodes//Ruleless/RulelessQuadVoxelGeometryNode";

export class VoxelGeometryRulelessConstructor {
  nodes: (RulelessBoxVoxelGeometryNode | RulelessQuadVoxelGeometryNode)[] = [];

  constructor(
    public geometryPaletteId: number,
    public data: VoxelGeometryRulelessSyncData
  ) {
    for (const node of data.nodes) {
      if (node.node.type == "box") {
        this.nodes.push(
          new RulelessBoxVoxelGeometryNode(
            geometryPaletteId,
            this,
            node.node,
            node.tranform
          )
        );
      }
      if (node.node.type == "quad") {
        this.nodes.push(
          new RulelessQuadVoxelGeometryNode(
            geometryPaletteId,
            this,
            node.node,
            node.tranform
          )
        );
      }
    }
    let faceCount = 0;
    let vertexCount = 0;
    for (const node of this.nodes) {
      node.faceIndex = faceCount;
      node.vertexIndex = vertexCount;
      faceCount += node.faceCount;
      vertexCount += node.vertexCount;
    }
  }
}
