//types
import type { VoxelData } from "Types/Data/Voxels/Voxel.types.js";
import type { VoxelPalette } from "Types/Data/WorldData.types.js";
//objects
import { DivineVoxelEngineWorld } from "../../DivineVoxelEngineWorld.js";
import { VoxelPaletteReader } from "../../../Data/Voxel/VoxelPalette.js";
import { VoxelTagBuilder } from "../TagBuilders/VoxelTagBuilder.js";
import { VoxelTags } from "../../../Data/Voxel/VoxelTags.js";
import { VoxelTagIDs } from "../../../Data/Constants/Tags/VoxelTagIds.js";
import { LightData } from "../../../Data/Light/LightByte.js";

export const VoxelDataGenerator = {
  $generate() {
    const DVEW = DivineVoxelEngineWorld.instance;
    //build palette
    for (const [key, voxel] of DVEW.dataRegister.voxels.data) {
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

    //create data buffer
    const initData = VoxelTagBuilder.build(DVEW.dataRegister.voxels.data.size);
    const buffer = new SharedArrayBuffer(initData.bufferSize);
    initData.buffer = buffer;
    VoxelTags.$INIT(initData);
    VoxelTags.setBuffer(buffer);

    //build data
    for (const [key, voxel] of DVEW.dataRegister.voxels.data) {
      const baseID = VoxelPaletteReader.id.numberFromString(key);
      if (!baseID) continue;
      VoxelTags.setTagIndex(voxelIndex[baseID]);
      VoxelTagBuilder.setDefaults(VoxelTags);
      for (const tag of voxel.tags) {
        const [id, value] = tag;
        if (!VoxelTagBuilder.hasNode(id)) continue;
        if (id == VoxelTagIDs.lightValue) {
          const v = <number[]>value;
          let sl = 0;
          sl = LightData.setR(v[0], sl);
          sl = LightData.setG(v[1], sl);
          sl = LightData.setB(v[2], sl);
          VoxelTags.setTag(VoxelTagIDs.lightValue, sl);
          continue;
        }
        VoxelTagBuilder.setNode(id, value, VoxelTags);
      }
    }

    DVEW.data.tags.voxels.sync(voxelIndex);
    DVEW.data.tags.voxels.$INIT(initData);
  },

  palette: {
    _count: 2,
    _palette: <VoxelPalette>["dve_air", "dve_barrier"],
    _map: <Record<string, number>>{
      dve_air: 0,
      dve_barrier: 1,
    },

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
    },

    get() {
      return this._palette;
    },
    getMap() {
      return this._map;
    },
  },
};
