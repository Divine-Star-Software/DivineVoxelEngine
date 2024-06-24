import { ShapeTool } from "../../ShapeTool.js";
import { QuadScalarVertexData } from "@amodx/meshing/Classes/QuadVertexData";
import { VoxelGeometry } from "../../../Geometry/VoxelGeometry.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { VoxelShapeBase } from "../../VoxelShapeBase.js";
import { Quad } from "@amodx/meshing/Classes/Quad.js";
import { DataTool } from "../../../../Tools/Data/DataTool.js";

const animationState = new QuadScalarVertexData();

const Quads: Quad[] = [
  //1
  Quad.Create(
    [
      [1, 1, 1], 
      [0, 1, 0], 
      [0, 0, 0], 
      [1, 0, 1], 
    ],
    [
      [1, 1], 
      [0, 1], 
      [0, 0],
      [1, 0], 
    ],
    true
  ),
  //2
  Quad.Create(
    [
      [0, 1, 1], 
      [1, 1, 0], 
      [1, 0, 0], 
      [0, 0, 1], 
    ],
    [
      [0, 1], 
      [1, 1],
      [1, 0], 
      [0, 0], 
    ],
    true
  ),
];
class CrossedPanelsClass extends VoxelShapeBase {
  id = "#dve_crossed_panels";
  init() {}
  build() {
    let topANIM = 0;
    let bottomANIM = 0;
    if (ShapeTool.data.voxel.getSubstanceStringId() == "#dve_flora") {
      ShapeTool.data.nVoxel.loadInAt(
        ShapeTool.data.voxel.x,
        ShapeTool.data.voxel.y + 1,
        ShapeTool.data.voxel.z
      );
      if (ShapeTool.data.voxel.isSameVoxel(ShapeTool.data.nVoxel)) {
        topANIM = 3;
        bottomANIM = 3;
      } else {
        topANIM = 1;
      }
    }
    animationState.set(topANIM, topANIM, bottomANIM, bottomANIM);
    const { x, y, z } = ShapeTool.data.voxel;
    const voxelPOS = WorldSpaces.voxel.getPositionXYZ(x, y, z);
    for (const data of Quads) {
      VoxelGeometry.addQuad(ShapeTool.data, voxelPOS, data);
    }
  }
}

export const CrossedPanelsVoxelShape = new CrossedPanelsClass();
