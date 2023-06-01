import { SubstancePaletteReader } from "../../../Data/Substance/SubstancePalette.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
import { SubstanceTagBuilder } from "../TagBuilders/SubstanceTagBuilder.js";
import { SubstanceTags } from "../../../Data/Substance/SubstanceTags.js";
export const SubstanceDataGenerator = {
    $generate() {
        //build palette
        for (const [key, voxel] of DVEW.dataRegister.substances.data) {
            this.palette.register(voxel);
        }
        SubstancePaletteReader.setPalette(this.palette._palette, this.palette._map);
        //create data buffer
        const initData = SubstanceTagBuilder.build(DVEW.dataRegister.substances.data.size);
        const buffer = new SharedArrayBuffer(initData.bufferSize);
        initData.buffer = buffer;
        SubstanceTags.$INIT(initData);
        SubstanceTags.setBuffer(buffer);
        //build data
        for (const [key, substance] of DVEW.dataRegister.substances.data) {
            const substanceID = SubstancePaletteReader.id.numberFromString(key);
            if (typeof substanceID == undefined)
                continue;
            SubstanceTags.setTagIndex(substanceID);
            SubstanceTagBuilder.setDefaults(SubstanceTags);
            for (const tag of substance.tags) {
                const [id, value] = tag;
                if (!SubstanceTagBuilder.hasNode(id))
                    continue;
                SubstanceTagBuilder.setNode(id, value, SubstanceTags);
            }
        }
        DVEW.data.tags.substances.$INIT(initData);
    },
    palette: {
        _count: 0,
        _palette: [],
        _map: {},
        register(sustance) {
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
