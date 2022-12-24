import { VoxelReader } from "../../../Data/Voxel/VoxelReader.js";
import { EntityFlat3dArray } from "../../../Data/Entity/EntityFlat3dArray.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { VoxelPaletteReader } from "../../../Data/Voxel/VoxelPalette.js";
export const EntityConstructor = {
    voxelData: [],
    _3dArray: EntityFlat3dArray,
    voxelReader: VoxelReader,
    lightByte: LightData,
    pos: { x: 0, y: 0, z: 0 },
    totalComposed: 1,
    width: 0,
    depth: 0,
    height: 0,
    setEntityData(x, y, z, width, height, depth, composed, voxelData) {
        this.pos.x = x;
        this.pos.y = y;
        this.pos.z = z;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.totalComposed = composed;
        this.voxelData = voxelData;
        this._3dArray.setBounds(width, height, depth);
    },
    getVoxel(x, y, z, composed = 1) {
        const rawVoxelData = this.voxelData[composed - 1];
        const voxelData = this._3dArray.getValue(x, y, z, rawVoxelData);
        const numericVoxelId = 0;
        if (numericVoxelId == 0)
            return ["dve_air", 0];
        if (numericVoxelId == 1)
            return ["dve_barrier", 0];
        const paletteId = VoxelPaletteReader._palette[numericVoxelId];
        const mapId = VoxelPaletteReader._map[paletteId];
        return [paletteId, numericVoxelId - mapId];
    },
    getLevel(x, y, z, composed = 1) {
        const rawVoxelData = this.voxelData[composed];
        const stateData = this._3dArray.getValue(x, y, z, rawVoxelData);
        return this.voxelReader.getLevel(stateData);
    },
    getLevelState(x, y, z, composed = 1) {
        const rawVoxelData = this.voxelData[composed];
        const stateData = this._3dArray.getValue(x, y, z, rawVoxelData);
        return this.voxelReader.getLevelState(stateData);
    },
    getShapeState(x, y, z, composed = 1) {
        const rawVoxelData = this.voxelData[composed];
        const stateData = this._3dArray.getValue(x, y, z, rawVoxelData);
        return this.voxelReader.getShapeState(stateData);
    },
    getLight(x, y, z, composed = 1) {
        const rawVoxelData = this.voxelData[composed - 1];
        const voxelData = this._3dArray.getValue(x, y, z, rawVoxelData);
        return 0;
    },
    clearEntityData() {
        this.pos.x = 0;
        this.pos.y = 0;
        this.pos.z = 0;
        this.width = 0;
        this.height = 0;
        this.depth = 0;
        this.totalComposed = 0;
        this.voxelData = [];
    },
};
