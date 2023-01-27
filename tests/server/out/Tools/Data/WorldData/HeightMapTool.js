//types
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
//Data
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { ChunkDataTool } from "./ChunkDataTool.js";
export class HeightMapTool {
    static _chunkTool = new ChunkDataTool();
    _data = {
        dimension: "main",
    };
    constructor() {
        this.chunk._s = this;
        //  this.column._s = this;
    }
    setDimension(dimensionId) {
        this._data.dimension = dimensionId;
    }
    chunk = {
        _p: {
            x: 0,
            z: 0,
        },
        _c: new DataView(new ArrayBuffer(0)),
        _s: {},
        loadInAt(x, y, z) {
            const chunk = WorldRegister.chunk.get([this._s._data.dimension, x, y, z]);
            if (!chunk)
                return false;
            HeightMapTool._chunkTool.setChunk(chunk);
            this._c = chunk.data;
        },
        loadInAtLocation(location) {
            const chunk = WorldRegister.chunk.get(location);
            if (!chunk)
                return false;
            HeightMapTool._chunkTool.setChunk(chunk);
            this._c = chunk.data;
        },
        setChunk(chunk) {
            HeightMapTool._chunkTool.setChunk(chunk);
            this._c = chunk.data;
        },
        setXZ(x, z) {
            this._p.x = x;
            this._p.z = z;
            return this;
        },
        getMinMax() {
            HeightMapTool._chunkTool._c = this._c;
            return [
                HeightMapTool._chunkTool.getTagValue("#dve_min_height"),
                HeightMapTool._chunkTool.getTagValue("#dve_max_height"),
            ];
        },
        getMin(substance = "all") {
            HeightMapTool._chunkTool._c = this._c;
            if (substance == "all") {
                return HeightMapTool._chunkTool.getTagValue("#dve_min_height");
            }
            return 0;
        },
        getMax(substance = "all") {
            HeightMapTool._chunkTool._c = this._c;
            if (substance == "all") {
                return HeightMapTool._chunkTool.getTagValue("#dve_max_height");
            }
            return 0;
        },
        update(mode, substance = "all", location) {
            if (mode == "add") {
                HeightMapTool._chunkTool._c = this._c;
                const minY = HeightMapTool._chunkTool.getTagValue("#dve_min_height");
                const maxY = HeightMapTool._chunkTool.getTagValue("#dve_max_height");
                const voxelPOS = WorldSpaces.voxel.getPositionLocation(location);
                if (minY > voxelPOS.y) {
                    HeightMapTool._chunkTool.setTagValue("#dve_min_height", voxelPOS.y);
                }
                if (maxY < voxelPOS.y) {
                    HeightMapTool._chunkTool.setTagValue("#dve_max_height", voxelPOS.y);
                }
            }
        },
    };
}
