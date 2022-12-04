import { ChunkSpace } from "../../Data/Chunk/ChunkSpace.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { DimensionsRegister } from "../../Data/Dimensions/DimensionsRegister.js";
import { VoxelReader } from "../../Data/Voxel/VoxelByte.js";
import { VoxelTags } from "../../Data/Voxel/VoxelData.js";
import { VoxelPaletteReader } from "../../Data/Voxel/VoxelPalette.js";
import { ChunkDataTool } from "./ChunkDataTool.js";
import { HeightMapTool } from "./HeightMapTool.js";
export class DataTool {
    static _dtutil = new DataTool();
    static _chunkTool = new ChunkDataTool();
    static _heightMapTool = new HeightMapTool();
    _mode = "World";
    data = {
        dimension: "main",
        raw: [0, 0],
        id: 0,
        baseId: 0,
        secondaryId: 0,
        secondaryBaseId: 0,
    };
    position = {
        x: 0,
        y: 0,
        z: 0,
    };
    _cached = {
        id: 0,
        secondaryId: 0,
        substance: "solid",
        secondarySubstance: "solid",
    };
    __secondary = false;
    setDimension(dimensionId) {
        this.data.dimension = DimensionsRegister.getDimensionStringId(dimensionId);
        return this;
    }
    setSecondary(enable) {
        this.__secondary = enable;
        return this;
    }
    _getBaseId(id) {
        return VoxelPaletteReader.id.baseNumeric(id);
    }
    loadInRaw(rawData) {
        this.data.raw = rawData;
        this.__process();
    }
    __process() {
        this.data.id = VoxelReader.getId(this.data.raw[0]);
        this._cached.id = this.data.id;
        this.data.secondaryId = VoxelReader.getId(this.data.raw[1]);
        this._cached.secondaryId = this.data.secondaryId;
        this.data.baseId = this._getBaseId(this.data.id);
        if (this.data.secondaryId > 1) {
            this.data.secondaryBaseId = this._getBaseId(this.data.secondaryId);
        }
        else {
            this.data.secondaryBaseId = 0;
        }
        this._cached.substance = this.getSubstance();
        this.setSecondary(true);
        this._cached.secondarySubstance = this.getSubstance();
        this.setSecondary(false);
    }
    loadIn(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        if (this._mode == "World") {
            const chunk = WorldRegister.chunk.get(this.data.dimension, x, y, z);
            DataTool._chunkTool.setDimension(this.data.dimension);
            if (!DataTool._chunkTool.loadIn(x, y, z))
                return false;
            this.data.raw[0] = DataTool._chunkTool.getArrayTagValue("#dve:voxel_data", ChunkSpace.getVoxelDataIndex(x, y, z));
            this.data.raw[1] = DataTool._chunkTool.getArrayTagValue("#dve:voxel_state_data", ChunkSpace.getVoxelDataIndex(x, y, z));
            this.__process();
            return true;
        }
        if (this._mode == "Entity") {
            return false;
        }
    }
    commit(heightMapUpdate = 0) {
        if (this._mode == "World") {
            DataTool._chunkTool.setDimension(this.data.dimension);
            if (!DataTool._chunkTool.loadIn(this.position.x, this.position.y, this.position.z))
                return false;
            const index = ChunkSpace.getVoxelDataIndex(this.position.x, this.position.y, this.position.z);
            DataTool._chunkTool.setArrayTagValue("#dve:voxel_data", index, this.data.raw[0]);
            DataTool._chunkTool.setArrayTagValue("#dve:voxel_state_data", index, this.data.raw[1]);
            if (heightMapUpdate) {
                DataTool._heightMapTool.chunk.setChunk(DataTool._chunkTool._c);
                const substance = this.getTemplateSubstance();
                //on add
                if (heightMapUpdate == 1) {
                    DataTool._heightMapTool.chunk.update("add", substance, this.position.x, this.position.y, this.position.z);
                }
                //on remove
                if (heightMapUpdate == 2) {
                    DataTool._heightMapTool.chunk.update("remove", substance, this.position.x, this.position.y, this.position.z);
                }
            }
        }
        if (this._mode == "Entity") {
        }
        return this;
    }
    getTagValue(id) {
        const vId = this.getId(true);
        VoxelTags.setVoxel(vId);
        return VoxelTags.getTag(id);
    }
    getLight() {
        const rawVoxelData = this.data.raw[0];
        if (rawVoxelData < 0)
            return -1;
        const voxelId = VoxelReader.getId(rawVoxelData);
        if (voxelId == 0)
            return VoxelReader.getLight(rawVoxelData);
        if (voxelId < 2)
            return -1;
        const lightValue = this.getTagValue("#dve:light_value");
        if (this.getTagValue("#dve:is_light_source") && lightValue) {
            return lightValue;
        }
        if (VoxelTags.getTrueSubstance(voxelId) == "solid") {
            return -1;
        }
        return VoxelReader.getLight(rawVoxelData);
    }
    setLight(light) {
        this.data.raw[0] = VoxelReader.setLight(this.data.raw[0], light);
        return this;
    }
    getLevel() {
        return VoxelReader.getLevel(this.data.raw[1]);
    }
    setLevel(level) {
        this.data.raw[1] = VoxelReader.setLevel(this.data.raw[1], level);
        return this;
    }
    getLevelState() {
        return VoxelReader.getLevelState(this.data.raw[1]);
    }
    setLevelState(state) {
        this.data.raw[1] = VoxelReader.setLevelState(this.data.raw[1], state);
        return this;
    }
    getShapeState() {
        return VoxelReader.getShapeState(this.data.raw[1]);
    }
    setShapeState(state) {
        this.data.raw[1] = VoxelReader.setShapeState(this.data.raw[1], state);
        return this;
    }
    hasSecondaryVoxel() {
        return this.data.secondaryBaseId > 1;
    }
    //voxel data
    getShapeId() {
        const vID = this.getId(true);
        if (vID < 2)
            return -1;
        VoxelTags.setVoxel(vID);
        return VoxelTags.getTag("#dve:shape_id");
    }
    isLightSource() {
        const vID = this.getId(true);
        if (vID < 2)
            return false;
        VoxelTags.setVoxel(vID);
        return VoxelTags.getTag("#dve:is_light_source") == 1;
    }
    getLightSourceValue() {
        const vID = this.getId(true);
        if (vID < 2)
            return 0;
        VoxelTags.setVoxel(vID);
        return VoxelTags.getTag("#dve:light_value");
    }
    getSubstance() {
        const vID = this.getId(true);
        if (vID < 2)
            return "transparent";
        return VoxelTags.getTrueSubstance(vID);
    }
    getTemplateSubstance() {
        let substance = this.getSubstance();
        if (substance == "transparent") {
            substance = "solid";
        }
        return substance;
    }
    getState() {
        if (this.__secondary) {
            return this.data.secondaryId - this.data.secondaryBaseId;
        }
        return this.data.id - this.data.baseId;
    }
    isRich() {
        const vID = this.getId(true);
        if (vID < 2)
            return 0;
        VoxelTags.setVoxel(vID);
        return VoxelTags.getTag("#dve:is_rich");
    }
    //util
    setAir() {
        this.data.raw[0] = VoxelReader.setId(0, this.data.raw[0]);
        return this;
    }
    isAir() {
        return 0 == VoxelReader.getId(this.data.raw[0]);
    }
    setBarrier() {
        this.data.raw[0] = VoxelReader.setId(1, this.data.raw[0]);
        return this;
    }
    isBarrier() {
        return 1 == VoxelReader.getId(this.data.raw[0]);
    }
    //voxel id
    getId(base = false) {
        if (this.__secondary) {
            if (!base)
                return this.data.secondaryId;
            return this.data.secondaryBaseId;
        }
        if (!base)
            return this.data.id;
        return this.data.baseId;
    }
    setId(id) {
        if (this.__secondary) {
            this.data.raw[1] = VoxelReader.setId(id, this.data.raw[1]);
            this.data.secondaryId = id;
            this.data.secondaryBaseId = this._getBaseId(id);
            return this;
        }
        this.data.raw[0] = VoxelReader.setId(id, this.data.raw[0]);
        this.data.id = id;
        this.data.baseId = this._getBaseId(id);
        return this;
    }
    getStringId() {
        if (this.__secondary) {
            return VoxelPaletteReader.id.stringFromNumber(this.data.secondaryBaseId);
        }
        return VoxelPaletteReader.id.stringFromNumber(this.data.baseId);
    }
    //util
    isRenderable() {
        if (this.data.id < 2 && this.data.secondaryId < 2)
            return false;
        return true;
    }
    isSameVoxel(cx, cy, cz) {
        DataTool._dtutil.loadIn(cx, cy, cz);
        if (this.__secondary) {
            return this.data.secondaryBaseId == DataTool._dtutil.data.secondaryBaseId;
        }
        return this.data.baseId == DataTool._dtutil.data.baseId;
    }
}
