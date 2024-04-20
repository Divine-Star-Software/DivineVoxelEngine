import type { SubstanceData } from "Types/Substances.types.js";
import { SubstanceTagBuilder } from "../TagBuilders/SubstanceTagBuilder.js";
import { SubstanceTags } from "../../../../Data/Substance/SubstanceTags.js";
import { SubstancePaletteReader } from "../../../../Data/Substance/SubstancePalette.js";
import { SubstanceManager } from "../Managers/DataManagers.js";

export const SubstanceDataGenerator = {
  $generate() {
    //build palette
    for (const [key, voxel] of SubstanceManager.data) {
      this.palette.register(voxel);
    }
    SubstancePaletteReader.setPalette(this.palette._palette, this.palette._map);

    //create data buffer
    const initData = SubstanceTagBuilder.build( this.palette._count);
    const buffer = new SharedArrayBuffer(initData.bufferSize);
    initData.buffer = buffer;
    SubstanceTags.$INIT(initData);
    SubstanceTags.setBuffer(buffer);

    //build data
    for (const [key, substance] of SubstanceManager.data) {
      const substanceID = SubstancePaletteReader.id.numberFromString(key);
      if (typeof substanceID == undefined) continue;
      SubstanceTags.setTagIndex(substanceID);
      SubstanceTagBuilder.setDefaults(SubstanceTags);
      for (const tag of substance.tags) {
        const [id, value] = tag;
        if (!SubstanceTagBuilder.hasNode(id)) continue;

        SubstanceTagBuilder.setNode(id, value, SubstanceTags);
      }
    }

    SubstanceTags.$INIT(initData);
  },
  palette: {
    _count: 0,
    _palette: <string[]>[],
    _map: <Record<string, number>>{},

    register(sustance: SubstanceData) {
      this._palette[this._count] = sustance.id;
      this._map[sustance.id] = this._count;
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