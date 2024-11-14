import { StringPalette } from "../../../Interfaces/Data/StringPalette";
import {
  VoxelGeometryRulelessSyncData,
  VoxelGeometrySyncData,
  VoxelModelSyncData,
} from "../../../VoxelData/VoxelSyncData";
import { VoxelGeometryConstructor } from "./VoxelGeometryConstructor";
import { VoxelModelConstructor } from "./VoxelModelsConstructor";
import { VoxelGeometryRulelessConstructor } from "./VoxelGeometryRulelessConstructor";

export class VoxelModelConstructorRegister {
  static geometryPalette: StringPalette;
  static geometry: (
    | VoxelGeometryConstructor
    | VoxelGeometryRulelessConstructor
  )[] = [];

  static rulesless: boolean[] = [];

  static setGeometryPalette(palette: string[]) {
    this.geometryPalette = new StringPalette(palette);
  }
  static models = new Map<string, VoxelModelConstructor>();

  static registerModels(models: VoxelModelSyncData[]) {
    for (const model of models) {
      this.models.set(model.id, new VoxelModelConstructor(model));
    }
  }
  static registerGeometry(
    geometries: (VoxelGeometrySyncData | VoxelGeometryRulelessSyncData)[]
  ) {
    for (const geometry of geometries) {
      const paletteId = this.geometryPalette.getNumberId(geometry.id);
      if ((geometry as VoxelGeometryRulelessSyncData).ruleless == true) {
        this.geometry[paletteId] = new VoxelGeometryRulelessConstructor(
          paletteId,
          geometry as VoxelGeometryRulelessSyncData
        );
        this.rulesless[paletteId] = true;
      } else {
        this.geometry[paletteId] = new VoxelGeometryConstructor(
          paletteId,
          geometry as VoxelGeometrySyncData
        );
        this.rulesless[paletteId] = false;
      }
    }
  }
}
