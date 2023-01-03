import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
export const RichData = {
    _dimensions: {
        main: {},
    },
    initalData: {},
    getRegion(x, y, z) {
        const dimension = this.getDimension("main");
        const regionKey = WorldSpaces.region.getKeyXYZ(x, y, z);
        if (!dimension[regionKey])
            return false;
        return dimension[regionKey];
    },
    getDimension(dimension) {
        return this._dimensions[dimension];
    },
    getChunk(x, y, z) {
        const region = this.getRegion(x, y, z);
        if (!region)
            return false;
        const worldColumnKey = WorldSpaces.column.getKeyXYZ(x, y, z);
        if (!region.columns[worldColumnKey])
            return false;
        const chunkKey = WorldSpaces.chunk.getKeyXYZ(x, y, z);
        const chunk = region.columns[worldColumnKey].chunks[chunkKey];
        if (!chunk)
            return false;
        return chunk;
    },
    addRegion(x, y, z) {
        if (this.getRegion(x, y, z))
            return false;
        const dimension = this.getDimension("main");
        const regionKey = WorldSpaces.region.getKeyXYZ(x, y, z);
        const newRegion = {
            columns: {},
        };
        dimension[regionKey] = newRegion;
        return newRegion;
    },
    addChunk(x, y, z) {
        let region = this.getRegion(x, y, z);
        if (!region) {
            region = this.addRegion(x, y, z);
        }
        const worldColumnKey = WorldSpaces.column.getKeyXYZ(x, y, z);
        if (!region.columns[worldColumnKey]) {
            region.columns[worldColumnKey] = {
                chunks: {},
            };
        }
        const chunkKey = WorldSpaces.chunk.getKeyXYZ(x, y, z);
        region.columns[worldColumnKey].chunks[chunkKey] = {};
        return region.columns[worldColumnKey].chunks[chunkKey];
    },
    setData(x, y, z, data) {
        let chunk = this.getChunk(x, y, z);
        if (!chunk) {
            chunk = this.addChunk(x, y, z);
        }
        const richKey = WorldSpaces.voxel.getKeyXYZ(x, y, z);
        chunk[richKey] = data;
    },
    getData(x, y, z) {
        let chunk = this.getChunk(x, y, z);
        if (!chunk)
            return false;
        const richKey = WorldSpaces.voxel.getKeyXYZ(x, y, z);
        const data = chunk[richKey];
        if (!data)
            return false;
        return data;
    },
    removeData(x, y, z) {
        let chunk = this.getChunk(x, y, z);
        if (!chunk) {
            chunk = this.addChunk(x, y, z);
        }
        const richKey = WorldSpaces.voxel.getKeyXYZ(x, y, z);
        delete chunk[richKey];
    },
    registerInitalDataForVoxel(voxelId, data) {
        this.initalData[voxelId] = data;
    },
    hasInitalData(voxelId) {
        return this.initalData[voxelId] !== undefined;
    },
    setInitalData(voxelId, x, y, z) {
        const data = this.initalData[voxelId];
        this.setData(x, y, z, data);
    },
};
