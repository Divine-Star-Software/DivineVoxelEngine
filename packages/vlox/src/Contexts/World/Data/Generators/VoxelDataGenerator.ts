//types
import { VoxelTagIDs } from "../../../../Data/Constants/VoxelTagIds.js";
//objects
import { VoxelTagBuilder } from "../StructBuilders/VoxelStructBuilder.js";
import { VoxelPalette } from "../../../../Data/Voxel/VoxelPalette.js";
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
    //build palette
    for (const [key, voxel] of VoxelManager.data) {
      if(this.palette.isRegistered(voxel.id)) throw new Error(`Duplicate voxel id ${voxel.id}`)
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
    const tags = VoxelTagBuilder.build(this.palette.size);
    const buffer = new SharedArrayBuffer(tags.structData.bufferSize);
    tags.structData.buffer = buffer;
    tags.setBuffer(buffer);
    //  VoxelStruct.init(initData);
    //  VoxelStruct.setBuffer(buffer);
    //build data
    for (const [key, voxel] of VoxelManager.data) {
      const baseID = VoxelPalette.ids.getNumberId(key);
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
