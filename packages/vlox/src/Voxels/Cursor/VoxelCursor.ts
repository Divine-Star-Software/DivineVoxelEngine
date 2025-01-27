
import { VoxelCursorInterface } from "./VoxelCursor.interface";
import { PaintVoxelData, RawVoxelData } from "../Types/Voxel.types";
import { VoxelPalette } from "../../Voxels/Palettes/VoxelPalette";
import { VoxelStateReader } from "../../Voxels/VoxelStateReader";

export class VoxelCursor extends VoxelCursorInterface {
  static VoxelDataToRaw(
    data: Partial<PaintVoxelData>,
    light = 0
  ): RawVoxelData {
    const id =
      (data.id !== undefined && VoxelPalette.ids.getNumberId(data.id)) || 0;
    const secondaryId =
      (data.secondaryVoxelId !== undefined &&
        VoxelPalette.ids.getNumberId(data.secondaryVoxelId)) ||
      0;
    let stateData = 0;

    if (data.level !== undefined)
      stateData = VoxelStateReader.setLevel(stateData, data.level);
    if (data.levelState !== undefined)
      stateData = VoxelStateReader.setLevelState(stateData, data.levelState);
    if (data.shapeState !== undefined)
      stateData = VoxelStateReader.setShapeState(stateData, data.shapeState);

    return [id, light, stateData, secondaryId, data.mod || 0];
  }

  ids: number[] = [0];
  light: number[] = [0];
  state: number[] = [0];
  secondary: number[] = [0];
  mod: number[] = [0];

  loadIn() {}
}
