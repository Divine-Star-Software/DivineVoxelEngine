import { CompiledVoxelGeometrySyncData } from "../../../Voxels/Models/CompiledVoxelModel.types";
import { BoxVoxelGometryNode } from "./Ruled/BoxVoxelGeometryNode";
import { QuadVoxelGometryNode } from "./Ruled/QuadVoxelGeometryNode";
import { RulelessQuadVoxelGeometryNode } from "./Ruleless/RulelessQuadVoxelGeometryNode";
import { GeoemtryNode } from "./GeometryNode";
import { RulelessBoxVoxelGeometryNode } from "./Ruleless/RulelessBoxVoxelGeometryNode";
import { VoxelModelConstructorRegister } from "../VoxelModelConstructorRegister";
import { CullingProcedureData } from "../../../Voxels/Models/VoxelModel.types";

export class VoxelGeometryConstructor {
  nodes: GeoemtryNode<any, any>[] = [];
  cullingProcedure: CullingProcedureData;
  constructor(
    public geometryPaletteId: number,
    data: CompiledVoxelGeometrySyncData
  ) {
    this.cullingProcedure = data.cullingProcedure;
    for (const node of data.nodes) {
      if (node.node.type == "custom") {
        const nodeClass = VoxelModelConstructorRegister.getCustomNode(
          node.node.id
        );
        const newNode = new nodeClass(
          geometryPaletteId,
          this,
          node.node,
          node.tranform
        );
        newNode.init();
        this.nodes.push(newNode);
      }
    }
    if (data?.ruleless) {
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
      const faces = data.faceIndexes!;
      let index = 0;
      for (const node of data.nodes) {
        if (node.node.type == "box") {
          const newNode = new BoxVoxelGometryNode(
            geometryPaletteId,
            this,
            node.node,
            node.tranform
          );
          for (let i = 0; i < 6; i++) {
            newNode.faceIndexes[i] = faces[index];
            index++;
          }

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
          newNode.trueFaceIndex = faces[index];
          index++;
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
