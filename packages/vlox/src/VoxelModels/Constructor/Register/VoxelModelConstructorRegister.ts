import { StringPalette } from "../../../Interfaces/Data/StringPalette";
import {
  VoxelGeometryRulelessSyncData,
  VoxelGeometrySyncData,
  VoxelModelSyncData,
} from "../../../VoxelData/VoxelSyncData";
import { GeoemtryNode, GeoemtryNodeConstructor } from "../Nodes/GeometryNode";
import { VoxelGeometryConstructor } from "./VoxelGeometryConstructor";
import { VoxelModelConstructor } from "./VoxelModelsConstructor";

export class VoxelModelConstructorRegister {
  static geometryPalette: StringPalette;
  static geometry: VoxelGeometryConstructor[] = [];

  static rulesless: boolean[] = [];

  static setGeometryPalette(palette: string[]) {
    this.geometryPalette = new StringPalette(palette);
  }
  static models = new Map<string, VoxelModelConstructor>();

  static customNodes = new Map<string, GeoemtryNodeConstructor<any, any>>();

  static registerCustomNode(
    id: string,
    node: GeoemtryNodeConstructor<any, any>
  ) {
    this.customNodes.set(id, node);
  }
  static getCustomNode(id: string) {
    const node = this.customNodes.get(id);
    if (!node) throw new Error(`Custom geometry node [${id}] does not exist.`);
    return node;
  }

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

      this.geometry[paletteId] = new VoxelGeometryConstructor(
        paletteId,
        geometry
      );
      if ((geometry as VoxelGeometryRulelessSyncData).ruleless == true) {
        this.rulesless[paletteId] = true;
      } else {
        this.rulesless[paletteId] = false;
      }
    }
  }
}
