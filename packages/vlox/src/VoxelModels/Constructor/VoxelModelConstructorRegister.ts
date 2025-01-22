import { VoxelPalette } from "../../Data/Palettes/VoxelPalette";
import { StringPalette } from "../../Interfaces/Data/StringPalette";
import {
  VoxelGeometryRulelessSyncData,
  VoxelGeometrySyncData,
  VoxelModelSyncData,
} from "../../VoxelData/VoxelSyncData";
import { GeoemtryNodeConstructor } from "./Nodes/GeometryNode";
import { VoxelConstructor } from "./VoxelConstructor";
import { VoxelGeometryConstructor } from "./Nodes/VoxelGeometryConstructor";

export class VoxelModelConstructorRegister {
  static geometryPalette: StringPalette;
  static geometry: VoxelGeometryConstructor[] = [];

  static rulesless: boolean[] = [];

  static setGeometryPalette(palette: string[]) {
    this.geometryPalette = new StringPalette(palette);
  }

  static modelData = new Map<string, VoxelModelSyncData>();
  static customNodes = new Map<string, GeoemtryNodeConstructor<any, any>>();

  static registerModels(models: VoxelModelSyncData[]) {
    models.forEach((_) => this.modelData.set(_.id, _));
  }
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

  static constructorsPaltte: VoxelConstructor[] = [];
  static constructors = new Map<string, VoxelConstructor>();
  static getConstructor(id: string): VoxelConstructor {
    return <VoxelConstructor>this.constructors.get(id);
  }
  static registerVoxel(voxel: VoxelConstructor | VoxelConstructor[]) {
    if (Array.isArray(voxel)) {
      for (const vox of voxel) {
        this.constructors.set(vox.id, vox);
        this.constructorsPaltte[VoxelPalette.ids.getNumberId(vox.id)] = vox;
      }
      return;
    }
    this.constructorsPaltte[VoxelPalette.ids.getNumberId(voxel.id)] = voxel;
    this.constructors.set(voxel.id, voxel);
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
