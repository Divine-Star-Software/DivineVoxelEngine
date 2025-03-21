import { VoxelCursorInterface } from "./VoxelCursor.interface";
import {  RawVoxelData } from "../Types/Voxel.types";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { VoxelLevelReader } from "./VoxelLevelReader";
import { PaintVoxelData } from "../Types/PaintVoxelData";

export class VoxelCursor extends VoxelCursorInterface {
  static VoxelDataToRaw(
    data: Partial<PaintVoxelData>,
    light = 0
  ): RawVoxelData {
    let stringId = data.id
      ? data.id
      : data.name
        ? VoxelPalettesRegister.voxelNametoIdMap.get(data.name)!
        : "dve_air";
    let secondaryStringId = data.id
      ? data.id
      : data.name
        ? VoxelPalettesRegister.voxelNametoIdMap.get(data.name)!
        : "dve_air";

    const id =
      (stringId !== "dve_air" &&
        VoxelPalettesRegister.getVoxelIdFromString(
          stringId,
          data.state || 0,
          data.mod || 0
        )) ||
      0;
    const secondaryId =
      (secondaryStringId !== "dve_air" &&
        VoxelPalettesRegister.getVoxelIdFromString(
          secondaryStringId,
          data.state || 0,
          data.mod || 0
        )) ||
      0;
    let levleData = 0;
    if (data.level !== undefined)
      levleData = VoxelLevelReader.setLevel(levleData, data.level);
    if (data.levelState !== undefined)
      levleData = VoxelLevelReader.setLevelState(levleData, data.levelState);

    return [id, light, levleData, secondaryId];
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
