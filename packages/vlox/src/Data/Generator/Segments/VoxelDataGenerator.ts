//types
import { VoxelStructIds } from "../../Constants/Structs/VoxelStructIds.js";
//objects
import { VoxelStructBuilder } from "../../Structs/Builder/VoxelStructBuilder.js";
import { VoxelPalette } from "../../Palettes/VoxelPalette.js";
import { VoxelStruct } from "../../Structs/VoxelStruct.js";

import { BinaryStruct } from "@amodx/binary";
import { SubstanceDataGenerator } from "./SubstanceDataGenerator.js";
import { StringPalette } from "../../../Interfaces/Data/StringPalette.js";
import { VoxelData } from "../../../VoxelData/Voxel.types.js";

export class VoxelDataGenerator {
  static overrides = new Map<
    string,
    (tags: BinaryStruct, value: unknown, id: string) => void
  >();
  static nameToIdMap: Record<string, string> = {};
  static idToNameMap: Record<string, string> = {};
  static generate(data: VoxelData[]) {
    //build palette
    for (const voxel of data) {
      if (this.palette.isRegistered(voxel.id))
        throw new Error(`Duplicate voxel id ${voxel.id}`);
      this.palette.register(voxel.id);
      this.nameToIdMap[voxel.name ? voxel.name : voxel.id] = voxel.id;
      this.idToNameMap[voxel.id] = voxel.name ? voxel.name : voxel.id;
    }
    VoxelPalette.setVoxelIdPalette(this.palette._palette, this.palette._map);

    VoxelPalette.setVoxelNamePalette(this.nameToIdMap, this.idToNameMap);
    //build index
    const indexBuffer = new SharedArrayBuffer(this.palette.size * 2);
    const voxelIndex = new Uint16Array(indexBuffer);
    for (let i = 0; i < this.palette.size; i++) {
      voxelIndex[i] = i;
    }

    //create data bufferv
    const tags = VoxelStructBuilder.build(this.palette.size);
    const buffer = new SharedArrayBuffer(tags.structData.bufferSize);
    tags.structData.buffer = buffer;
    tags.setBuffer(buffer);
    //  VoxelStruct.init(initData);
    //  VoxelStruct.setBuffer(buffer);
    //build data
    for (const voxel of data) {
      const baseID = VoxelPalette.ids.getNumberId(voxel.id);
      if (!baseID) continue;

      tags.setStructArrayIndex(voxelIndex[baseID]);
      VoxelStructBuilder.setDefaults(tags);
      for (const id in voxel.properties) {
        const value = voxel.properties[id];
        if (!VoxelStructBuilder.hasNode(id)) continue;

        if (this.overrides.has(id)) {
          this.overrides.get(id)!(tags, value, id);
          continue;
        }
        VoxelStructBuilder.setNode(id, value, tags);
      }
    }

    VoxelStruct.sync(voxelIndex);
    VoxelStruct.init(tags.structData);
    VoxelStruct.instance.setBuffer(buffer);
  }

  static palette = new StringPalette();
}

