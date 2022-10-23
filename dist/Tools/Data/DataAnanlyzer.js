import { ChunkReader } from "../../Data/Chunk/ChunkReader.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { DimensionsData } from "../../Data/Dimensions/DimensionsData.js";
import { WorldBounds } from "../../Data/World/WorldBounds.js";
import { VoxelReader } from "../../Data/Voxel/VoxelByte.js";
import { VoxelData } from "../../Data/Voxel/VoxelData.js";
import { WorldData } from "Data/World/WorldData.js";
export class DataTool {
    data = {
        dimension: 0,
        raw: [0, 0],
        x: 0,
        y: 9,
        z: 9,
        id: 0,
    };
    setDimension(dimensionId) {
        this.data.dimension = DimensionsData.getDimensionNumericId(dimensionId);
    }
    setXYZ(x, y, z) {
        this.data.x = x;
        this.data.y = y;
        this.data.z = z;
        return this;
    }
    loadIn() {
        const chunk = WorldRegister.chunk.get(this.data.dimension, this.data.x, this.data.y, this.data.y);
        if (!chunk)
            return false;
        const voxelPOS = WorldBounds.getVoxelPosition(this.data.x, this.data.y, this.data.z);
        this.data.raw[0] = ChunkReader.getVoxelDataUseObj(chunk.data, voxelPOS);
        this.data.raw[1] = ChunkReader.getVoxelDataUseObj(chunk.data, voxelPOS, true);
        this.data.id = VoxelReader.getId(this.data.raw[0]);
        return true;
    }
    commit() {
        const chunk = WorldRegister.chunk.get(this.data.dimension, this.data.x, this.data.y, this.data.y);
        if (!chunk)
            return false;
        const voxelPOS = WorldBounds.getVoxelPosition(this.data.x, this.data.y, this.data.z);
        ChunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, this.data.raw[0]);
        ChunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, this.data.raw[1], true);
        return this;
    }
    getLight() {
        return VoxelReader.getLight(this.data.raw[0]);
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
    //voxel data
    getShapeId() {
        if (this.data.id < 2)
            return -1;
        VoxelData.getShapeId(this.data.id);
    }
    isLightSource() {
        if (this.data.id < 2)
            return false;
        VoxelData.isLightSource(this.data.id);
    }
    getLightValue() {
        if (this.data.id < 2)
            return -1;
        VoxelData.getLightValue(this.data.id);
    }
    getSubstance() {
        if (this.data.id < 2)
            return -1;
        VoxelData.getTrueSubstance(this.data.id);
    }
    //voxel id
    getId() {
        return this.data.id;
    }
    getStringId() {
        return WorldData.voxel.id.stringFromNumber(this.data.id);
    }
    //util
    isRenderable() {
        if (this.data.id < 2)
            return false;
    }
}
