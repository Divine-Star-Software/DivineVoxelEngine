import { CompiledVoxelGeometrySyncData } from "../../../Voxels/Models/CompiledVoxelModel.types";
import { QuadVoxelGometryNode } from "./Default/QuadVoxelGeometryNode";
import { TriangleVoxelGeometryNode } from "./Default/TriangleVoxelGeometryNode";
import { GeoemtryNode } from "./GeometryNode";
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
      if (node.type == "custom") {
        const nodeClass = VoxelModelConstructorRegister.getCustomNode(node.id);
        const newNode = new nodeClass(geometryPaletteId, this, node);
        newNode.init();
        this.nodes.push(newNode);
      }
    }
    for (const node of data.nodes) {
      if (node.type == "quad") {
        const newNode = new QuadVoxelGometryNode(geometryPaletteId, this, node);
        newNode.init();
        this.nodes.push(newNode);
      }
      if (node.type == "triangle") {
        const newNode = new TriangleVoxelGeometryNode(
          geometryPaletteId,
          this,
          node
        );
        newNode.init();
        this.nodes.push(newNode);
      }
    }
  }
}
