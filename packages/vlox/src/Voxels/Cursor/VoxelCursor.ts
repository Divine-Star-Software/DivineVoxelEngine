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
    let levleData = 0;
    if (data.level !== undefined)
      levleData = VoxelStateReader.setLevel(levleData, data.level);
    if (data.levelState !== undefined)
      levleData = VoxelStateReader.setLevelState(levleData, data.levelState);

    return [id, light, levleData, data.state || 0, data.mod || 0, secondaryId];
  }

  ids: number[] = [0];
  light: number[] = [0];
  level: number[] = [0];
  state: number[] = [0];
  secondary: number[] = [0];
  mod: number[] = [0];

  loadIn() {}
}
