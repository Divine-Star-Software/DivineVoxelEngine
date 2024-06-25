import { QuadScalarVertexData } from "@amodx/meshing/Classes/QuadVertexData";
import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";

import { ShapeTool } from "../../ShapeTool.js";
import { VoxelShapeBase } from "../../VoxelShapeBase.js";
import { QuadUVData } from "../../../Geometry/Geometry.types.js";
import { Quad } from "@amodx/meshing/Classes/Quad.js";
import { DirectionNames } from "@divinevoxel/core";
import { VoxelGeometry } from "../../../Geometry/VoxelGeometry.js";
const animationState = new QuadScalarVertexData();

const uvs: QuadUVData = [
  [1, 1],
  [0, 1],
  [0, 0],
  [1, 0],
];

enum PanelStates {
  South,
  North,
  East,
  West,
  Bottom,
  Top,
}
const near = 0.05;
const far = 0.95;
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
    animationState.setAll(0);

    if (ShapeTool.data.voxel.getSubstanceStringId() == "#dve_flora") {
      animationState.setAll(2);
    }

    const quad = QuadsPanel[ShapeTool.data.voxel.getShapeState()];
    quad.flip = ShapeTool.data.isFaceFlipped();
    VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, quad);
  }
}

export const PanelVoxelShape = new PanelVoxelShapeClass();
