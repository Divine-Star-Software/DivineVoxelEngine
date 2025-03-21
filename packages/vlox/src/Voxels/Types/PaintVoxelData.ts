import { VoxelPalettesRegister } from "../Data/VoxelPalettesRegister";
import { RawVoxelData } from "./Voxel.types";
import { VoxelLevelReader } from "../Cursor/VoxelLevelReader";

export class PaintVoxelData {
  static Create(data: Partial<PaintVoxelData> = {}) {
    return new PaintVoxelData(
      data.id,
      data.name,
      data.mod,
      data.state,
      data.level,
      data.levelState,
      data.secondaryVoxelId,
      data.secondaryName,
      data.secondaryMod,
      data.secondaryState
    );
  }
  static FromRaw(data: RawVoxelData, paintData = PaintVoxelData.Create()) {
    const [trueVoxelId, state, mod] = VoxelPalettesRegister.voxels[data[0]];
    paintData.id = VoxelPalettesRegister.voxelIds.getStringId(trueVoxelId);
    paintData.state = state;
    paintData.mod = mod;
    paintData.name =
      VoxelPalettesRegister.voxelIdToNameMap.get(paintData.id) || "";

    if (data[3] !== 0) {
      const [trueVoxelId, state, mod] = VoxelPalettesRegister.voxels[data[3]];
      paintData.secondaryVoxelId =
        VoxelPalettesRegister.voxelIds.getStringId(trueVoxelId);
      paintData.secondaryState = state;
      paintData.secondaryMod = mod;
      paintData.secondaryName =
        VoxelPalettesRegister.voxelIdToNameMap.get(
          paintData.secondaryVoxelId
        ) || "";
    }
    paintData.level = VoxelLevelReader.getLevel(data[2]);
    paintData.levelState = VoxelLevelReader.getLevel(data[2]);
    return paintData;
  }
  static ToRaw(data: Partial<PaintVoxelData>, light = 0): RawVoxelData {
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
          data.secondaryState || 0,
          data.secondaryMod || 0
        )) ||
      0;
    let levleData = 0;
    if (data.level !== undefined)
      levleData = VoxelLevelReader.setLevel(levleData, data.level);
    if (data.levelState !== undefined)
      levleData = VoxelLevelReader.setLevelState(levleData, data.levelState);

    return [id, light, levleData, secondaryId];
  }
  private constructor(
    public id: string = "dve_air",
    public name: string = "",
    public mod: number = 0,
    public state: number = 0,
    public level: number = 0,
    public levelState: number = 0,
    public secondaryVoxelId: string = "dve_air",
    public secondaryName: string = "",
    public secondaryMod: number = 0,
    public secondaryState: number = 0
  ) {}
}
