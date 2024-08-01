import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { ShapeTool } from "../../ShapeTool.js";
import { VoxelShapeBase } from "../../VoxelShapeBase.js";
import { QuadUVData } from "@amodx/meshing/Geometry.types.js";
import { Quad } from "@amodx/meshing/Classes/Quad.js";
import { VoxelGeometry } from "../../../Geometry/VoxelGeometry.js";
import { VoxelShaderData } from "../../../../../Data/VoxelShaderData.js";
import { PanelStates } from "./PanelStates.js";

const uvs: QuadUVData = [
  [1, 1],
  [0, 1],
  [0, 0],
  [1, 0],
];

const near = 0.05;
const far = 0.85;
const QuadsPanel: Record<number, Quad> = {
  [PanelStates.South]: Quad.Create(
    [
      [0, 0, near],
      [1, 1, near],
    ],
    uvs,
    true,
    0
  ),
  [PanelStates.North]: Quad.Create(
    [
      [0, 0, far],
      [1, 1, far],
    ],
    uvs,
    true,
    1
  ),
  [PanelStates.East]: Quad.Create(
    [
      [far, 0, 0],
      [far, 1, 1],
    ],
    uvs,
    true,
    0
  ),
  [PanelStates.West]: Quad.Create(
    [
      [near, 0, 0],
      [near, 1, 1],
    ],
    uvs,
    false,
    1
  ),
  [PanelStates.Bottom]: Quad.Create(
    [
      [0, near, 0],
      [1, near, 1],
    ],
    uvs,
    false,
    1
  ),
  [PanelStates.Top]: Quad.Create(
    [
      [0, far, 0],
      [1, far, 1],
    ],
    uvs,
    false,
    0
  ),
};

class PanelVoxelShapeClass extends VoxelShapeBase {
  id = "#dve_panel";
  init() {

    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      OverrideManager.ANY,
      (data) => {
        if (data.currentVoxel.getSubstanceStringId() == "#dve_flora") {
          return false;
        }
        return data.default;
      }
    );
  }
  build() {
    let doubleSided = true;
    if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
      ShapeTool.data
        .getAnimationData()
        .setAll(VoxelShaderData.AnimationStates.WindAffected.Panel);
    }

    if (ShapeTool.data.voxel.getSubstnaceData().isBackFaceCulled()) {
      doubleSided = false;
    }
    const quad = QuadsPanel[ShapeTool.data.voxel.getShapeState()];
    quad.flip = ShapeTool.data.isFaceFlipped();
    quad.doubleSided = doubleSided;
    VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, quad);
  }
}

export const PanelVoxelShape = new PanelVoxelShapeClass();
