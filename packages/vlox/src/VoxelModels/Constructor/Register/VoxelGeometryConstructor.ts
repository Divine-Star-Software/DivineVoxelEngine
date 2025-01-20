import { VoxelFaceCullResultsIndex } from "../../Indexing/VoxelFaceCullResultsIndex";
import { VoxelAOResultsIndex } from "../../Indexing/VoxelAOResultsIndex";
import {
  VoxelGeometryRulelessSyncData,
  VoxelGeometrySyncData,
} from "../../../VoxelData/VoxelSyncData";
import { BoxVoxelGometryNode } from "../Nodes/Ruled/BoxVoxelGeometryNode";
import { QuadVoxelGometryNode } from "../Nodes/Ruled/QuadVoxelGeometryNode";
import { RulelessQuadVoxelGeometryNode } from "../Nodes/Ruleless/RulelessQuadVoxelGeometryNode";
import { GeoemtryNode } from "../Nodes/GeometryNode";
import { RulelessBoxVoxelGeometryNode } from "../Nodes/Ruleless/RulelessBoxVoxelGeometryNode";
import { VoxelModelConstructorRegister } from "./VoxelModelConstructorRegister";

export class VoxelGeometryConstructor {
  nodes: GeoemtryNode<any, any>[] = [];
  faceCullMap: number[][];
  vertexHitMap: number[][];
  cullIndex: VoxelFaceCullResultsIndex;
  aoIndex: VoxelAOResultsIndex;
  constructor(
    public geometryPaletteId: number,
    data: VoxelGeometrySyncData | VoxelGeometryRulelessSyncData
  ) {
    for (const node of data.nodes) {
      if (node.node.type == "custom") {
        const nodeClass = VoxelModelConstructorRegister.getCustomNode(node.node.id);
        const newNode = new nodeClass(
          geometryPaletteId,
          this,
          node.node,
          node.tranform
        )
        newNode.init();
        this.nodes.push(newNode);
        console.error("process custom node", node.node.type);
      }
    }
    if ((data as VoxelGeometryRulelessSyncData)?.ruleless) {
      data = data as VoxelGeometryRulelessSyncData;
      for (const node of data.nodes) {
        if (node.node.type == "box") {
          const newNode = new RulelessBoxVoxelGeometryNode(
            geometryPaletteId,
            this,
            node.node,
            node.tranform
          );
          newNode.init();
          this.nodes.push(newNode);
        }
        if (node.node.type == "quad") {
          const newNode = new RulelessQuadVoxelGeometryNode(
            geometryPaletteId,
            this,
            node.node,
            node.tranform
          );
          newNode.init();
          this.nodes.push(newNode);
        }
      }
    } else {
      data = data as VoxelGeometrySyncData;
      this.faceCullMap = data.faceCullMap!;
      this.vertexHitMap = data.vertexHitMap!;
      this.cullIndex = new VoxelFaceCullResultsIndex(data.cullIndex!);
      this.aoIndex = new VoxelAOResultsIndex(data.aoIndex!);
      for (const node of data.nodes) {
        if (node.node.type == "box") {
          const newNode = new BoxVoxelGometryNode(
            geometryPaletteId,
            this,
            node.node,
            node.tranform
          );
          newNode.init();
          this.nodes.push(newNode);
        }
        if (node.node.type == "quad") {
          const newNode = new QuadVoxelGometryNode(
            geometryPaletteId,
            this,
            node.node,
            node.tranform
          );
          newNode.init();
          this.nodes.push(newNode);
        }
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
