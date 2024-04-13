//types
import type { VoxelData, VoxelPalette } from "../../../../Types/Voxel.types.js";

//objects
import { VoxelTagBuilder } from "../TagBuilders/VoxelTagBuilder.js";
import { VoxelPaletteReader } from "../../../../Data/Voxel/VoxelPalette.js";
import { VoxelTags } from "../.././../../Data/Voxel/VoxelTags.js";
import { DivineVoxelEngineWorld } from "../../../../Contexts/World/DivineVoxelEngineWorld.js";
import { VoxelManager } from "../Managers/DataManagers.js";
import { Pipeline } from "@divinestar/utils/Pipelines/Pipeline.js";
class GenVoxelPalette {
  _count = 2;
  _palette: VoxelPalette = ["dve_air", "dve_barrier"];
  _map: Record<string, number> = {
    dve_air: 0,
    dve_barrier: 1,
  };

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
  static pipelines = {
    onSet: new Pipeline<{
      tags: typeof VoxelTags;
      value: unknown;
      id: string;
    }>(),
  };
  static generate() {
    const DVEW = DivineVoxelEngineWorld.instance;
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
    const initData = VoxelTagBuilder.build(this.palette._count);
    const buffer = new SharedArrayBuffer(initData.bufferSize);
    initData.buffer = buffer;
    VoxelTags.$INIT(initData);
    VoxelTags.setBuffer(buffer);
    //build data
    for (const [key, voxel] of VoxelManager.data) {
      const baseID = VoxelPaletteReader.id.numberFromString(key);
      if (!baseID) continue;

      VoxelTags.setTagIndex(voxelIndex[baseID]);
      VoxelTagBuilder.setDefaults(VoxelTags);
      for (const tag of voxel.tags) {
        const [id, value] = tag;

        if (!VoxelTagBuilder.hasNode(id)) continue;

        if (this.pipelines.onSet.isRegistered(id)) {
          this.pipelines.onSet.pipe({
            tags: VoxelTags,
            value,
            id,
          });
          continue;
        }
        VoxelTagBuilder.setNode(id, value, VoxelTags);
      }
    }

    VoxelTags.sync(voxelIndex);
    VoxelTags.$INIT(initData);
  }

  static palette = new GenVoxelPalette();
}
