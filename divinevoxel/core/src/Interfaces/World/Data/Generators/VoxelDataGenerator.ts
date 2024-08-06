//types
import type { VoxelData, VoxelPalette } from "../../../../Types/Voxel.types.js";
import { VoxelTagIDs } from "../../../../Data/Constants/VoxelTagIds.js";
//objects
import { VoxelTagBuilder } from "../StructBuilders/VoxelStructBuilder.js";
import { VoxelPaletteReader } from "../../../../Data/Voxel/VoxelPalette.js";
import { VoxelStruct } from "../../../../Data/Voxel/VoxelStruct.js";
import { VoxelManager } from "../Managers/DataManagers.js";
import { BinaryStruct } from "@amodx/binary";
import { SubstanceDataGenerator } from "./SubstanceDataGenerator.js";
import { StringPalette } from "../../../../Interfaces/Data/StringPalette.js";

export class VoxelDataGenerator {
  static overrides = new Map<
    string,
    (tags: BinaryStruct, value: unknown, id: string) => void
  >();
  static nameToIdMap: Record<string, string> = {};
  static idToNameMap: Record<string, string> = {};
  static generate() {
    this.nameToIdMap = {};
    this.idToNameMap = {};
    //build palette
    for (const [key, voxel] of VoxelManager.data) {
      this.palette.register(voxel.id);
      this.nameToIdMap[voxel.name || voxel.id] = voxel.id;
      this.idToNameMap[voxel.id] = voxel.name || voxel.id;
    }
    VoxelPaletteReader.setVoxelIdPalette(
      this.palette._palette,
      this.palette._map
    );

    //build index
    const indexBuffer = new SharedArrayBuffer(this.palette._count * 2);
    const voxelIndex = new Uint16Array(indexBuffer);
    let currentCount = 0;
    let currentParent = 0;
    for (let i = 2; i < this.palette._count; i++) {
      let newParent = VoxelPaletteReader.id.baseNumeric(i);
      if (newParent != currentParent) {
        currentParent = newParent;
        voxelIndex[i] = currentCount;
        currentCount++;
      }
    }

    //create data bufferv
    const tags = VoxelTagBuilder.build(this.palette._count);
    const buffer = new SharedArrayBuffer(tags.structData.bufferSize);
    tags.structData.buffer = buffer;
    tags.setBuffer(buffer);
    //  VoxelStruct.init(initData);
    //  VoxelStruct.setBuffer(buffer);
    //build data
    for (const [key, voxel] of VoxelManager.data) {
      const baseID = VoxelPaletteReader.id.numberFromString(key);
      if (!baseID) continue;

      tags.setStructArrayIndex(voxelIndex[baseID]);
      VoxelTagBuilder.setDefaults(tags);
      for (const tag of voxel.tags) {
        const [id, value] = tag;

        if (!VoxelTagBuilder.hasNode(id)) continue;

        if (this.overrides.has(id)) {
          this.overrides.get(id)!(tags, value, id);

          continue;
        }
        VoxelTagBuilder.setNode(id, value, tags);
      }
    }

    VoxelStruct.sync(voxelIndex);
    VoxelStruct.init(tags.structData);
    VoxelStruct.instance.setBuffer(buffer);
  }

  static palette = new StringPalette();
}

VoxelDataGenerator.overrides.set(VoxelTagIDs.substance, (tags, value, id) => {
  tags.setProperty(id, SubstanceDataGenerator.palette._map[value as string]);
});
