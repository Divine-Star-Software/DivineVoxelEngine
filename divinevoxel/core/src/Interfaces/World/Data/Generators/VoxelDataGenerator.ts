//types
import type { VoxelData, VoxelPalette } from "../../../../Types/Voxel.types.js";
import { VoxelTagIDs } from "../../../../Data/Constants/VoxelTagIds.js";
//objects
import { VoxelTagBuilder } from "../StructBuilders/VoxelStructBuilder.js";
import { VoxelPaletteReader } from "../../../../Data/Voxel/VoxelPalette.js";
import { VoxelStruct } from "../../../../Data/Voxel/VoxelStruct.js";
import { VoxelManager } from "../Managers/DataManagers.js";
import { Pipeline } from "@divinestar/utils/Pipelines/Pipeline.js";
import { BinaryStruct } from "@divinestar/binary";
import { SubstanceDataGenerator } from "./SubstanceDataGenerator.js";
class GenVoxelPalette {
  _count = 0;
  _palette: VoxelPalette = [];
  _map: Record<string, number> = {};

  registerVoxel(voxel: VoxelData) {
    this._palette[this._count] = voxel.id;
    this._map[voxel.id] = this._count;
    if (voxel.states) {
      for (let i = this._count; i <= this._count + voxel.states; i++) {
        this._palette[i] = voxel.id;
      }
      this._count += voxel.states;
    }
    this._count++;
  }

  get() {
    return this._palette;
  }
  getMap() {
    return this._map;
  }
}

export class VoxelDataGenerator {
  static overrides = new Map<
    string,
    (tags: BinaryStruct, value: unknown, id: string) => void
  >();

  static generate() {
    //build palette
    for (const [key, voxel] of VoxelManager.data) {
      this.palette.registerVoxel(voxel);
    }
    VoxelPaletteReader.setVoxelPalette(
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
    const buffer = new SharedArrayBuffer(tags.initData.bufferSize);
    tags.initData.buffer = buffer;
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
    VoxelStruct.init(tags.initData);
    VoxelStruct.instance.setBuffer(buffer);
  }

  static palette = new GenVoxelPalette();
}

VoxelDataGenerator.overrides.set(VoxelTagIDs.substance, (tags, value, id) => {

  tags.setProperty(
    id,
    SubstanceDataGenerator.palette.get().findIndex((_) => _ == value)
  );
});
