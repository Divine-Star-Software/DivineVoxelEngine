import { ShapeTool } from "../../ShapeTool.js";
import { VoxelGeometry } from "../../../Geometry/VoxelGeometry.js";
import { WorldSpaces } from "../../../../Data/World/WorldSpaces.js";
import { VoxelShapeBase } from "../../VoxelShapeBase.js";
import { Quad } from "@amodx/meshing/Primitives/Quad.js";
import { VoxelShaderData } from "../../../../Data/VoxelShaderData.js";
import { QuadVerticies } from "@amodx/meshing/Geometry.types.js";

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
    let upANIM = 0;
    let downANIM = 0;
    let doubleSided = true;
    if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
      ShapeTool.data.nVoxel.loadInAt(
        ShapeTool.data.voxel.x,
        ShapeTool.data.voxel.y + 1,
        ShapeTool.data.voxel.z
      );
      if (ShapeTool.data.voxel.isSameVoxel(ShapeTool.data.nVoxel)) {
        upANIM = VoxelShaderData.AnimationStates.WindAffected.Box;
        downANIM = VoxelShaderData.AnimationStates.WindAffected.Box;
      } else {
        upANIM = VoxelShaderData.AnimationStates.WindAffected.CrossPanel;
      }
      const animData = ShapeTool.data.getAnimationData();

      animData.vertices[QuadVerticies.TopRight] = upANIM;
      animData.vertices[QuadVerticies.TopLeft] = upANIM;
      animData.vertices[QuadVerticies.BottomRight] = downANIM;
      animData.vertices[QuadVerticies.BottomLeft] = downANIM;
    }
    if (ShapeTool.data.voxel.getSubstnaceData().isBackFaceCulled()) {
      doubleSided = false;
    }

    const { x, y, z } = ShapeTool.data.voxel;
    const voxelPOS = WorldSpaces.voxel.getPositionXYZ(x, y, z);
    for (const data of Quads) {
      data.doubleSided = doubleSided;
      VoxelGeometry.addQuad(ShapeTool.data, voxelPOS, data);
    }
  }
}

export const CrossedPanelsVoxelShape = new CrossedPanelsClass();
