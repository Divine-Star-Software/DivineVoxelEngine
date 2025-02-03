import { VoxelCursorInterface } from "./VoxelCursor.interface";
import { PaintVoxelData, RawVoxelData } from "../Types/Voxel.types";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { VoxelLevelReader } from "./VoxelLevelReader";

export class VoxelCursor extends VoxelCursorInterface {
  static VoxelDataToRaw(
    data: Partial<PaintVoxelData>,
    light = 0
  ): RawVoxelData {
    const id =
      (data.id !== undefined &&
        VoxelPalettesRegister.voxels.getNumberId(data.id)) ||
      0;
    const secondaryId =
      (data.secondaryVoxelId !== undefined &&
        VoxelPalettesRegister.voxels.getNumberId(data.secondaryVoxelId)) ||
      0;
    let levleData = 0;
    if (data.level !== undefined)
      levleData = VoxelLevelReader.setLevel(levleData, data.level);
    if (data.levelState !== undefined)
      levleData = VoxelLevelReader.setLevelState(levleData, data.levelState);

    return [id, light, levleData, data.state || 0, data.mod || 0, secondaryId];
  }

  ids = new Uint16Array(1);
  light = new Uint16Array(1);
  level = new Uint8Array(1);
  state = new Uint16Array(1);
  mod = new Uint16Array(1);
  secondary = new Uint16Array(1);

  loadIn() {}
  updateVoxel(mode: 0 | 1) {}
}
