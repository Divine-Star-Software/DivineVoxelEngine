//Data
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { ChunkDataTool } from "./ChunkDataTool.js";
import { WorldBounds } from "../../Data/World/WorldBounds.js";
export class HeightMapTool {
    static _chunkTool = new ChunkDataTool();
    _data = {
        dimension: "main",
    };
    constructor() {
        this.chunk._s = this;
        this.column._s = this;
    }
    setDimension(dimensionId) {
        this._data.dimension = dimensionId;
    }
    chunk = {
        _p: {
            x: 0,
            z: 0,
        },
        _c: {},
        _s: {},
        loadIn(x, y, z) {
            const chunk = WorldRegister.chunk.get(this._s._data.dimension, x, y, z);
            if (!chunk)
                return false;
            HeightMapTool._chunkTool.setChunk(chunk);
            this._c = chunk;
        },
        setChunk(chunk) {
            HeightMapTool._chunkTool.setChunk(chunk);
            this._c = chunk;
        },
        setXZ(x, z) {
            this._p.x = x;
            this._p.z = z;
            return this;
        },
        getMin(substance = "all") {
            HeightMapTool._chunkTool.setChunk(this._c);
            if (substance == "all") {
                return HeightMapTool._chunkTool.getTagValue("#dve:min_height");
            }
            return 0;
        },
        getMax(substance = "all") {
            HeightMapTool._chunkTool.setChunk(this._c);
            if (substance == "all") {
                return HeightMapTool._chunkTool.getTagValue("#dve:max_height");
            }
            return 0;
        },
        update(mode, substance = "all", x, y, z) {
            if (mode == "add") {
                HeightMapTool._chunkTool.setChunk(this._c);
                const minY = HeightMapTool._chunkTool.getTagValue("#dve:min_height");
                const maxY = HeightMapTool._chunkTool.getTagValue("#dve:max_height");
                const voxelPOS = WorldBounds.getVoxelPosition(x, y, z);
                if (minY > voxelPOS.y) {
                    HeightMapTool._chunkTool.setTagValue("#dve:min_height", voxelPOS.y);
                }
                if (maxY < voxelPOS.y) {
                    HeightMapTool._chunkTool.setTagValue("#dve:max_height", voxelPOS.y);
                }
            }
        },
    };
    column = {
        _c: {},
        _p: {
            x: 0,
            z: 0,
        },
        _s: {},
        loadIn(x, z, y = 0) {
            const column = WorldRegister.column.get(this._s._data.dimension, x, z, y);
            if (!column)
                return false;
            this._c = column;
        },
        setXZ(x, z) {
            this._p.x = x;
            this._p.z = z;
            return this;
        },
        getMin() { },
        getMax() { },
    };
}
