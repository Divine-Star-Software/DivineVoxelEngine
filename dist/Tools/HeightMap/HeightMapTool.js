//Data
import { HeightMapData } from "../../Data/Chunk/HeightMapData.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
export class HeightMapTool {
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
            this._c = chunk;
        },
        setXZ(x, z) {
            this._p.x = x;
            this._p.z = z;
            return this;
        },
        getMin(substance = "all") {
            if (substance == "all") {
                return HeightMapData.getLowestExposedVoxel(this._p.x, this._p.z, this._c.data);
            }
            return HeightMapData.getMaxYForSubstance(substance, this._p.x, this._p.z, this._c.data);
        },
        getMax(substance = "all") {
            if (substance == "all") {
                return HeightMapData.getHighestExposedVoxel(this._p.x, this._p.z, this._c.data);
            }
            return HeightMapData.getMinYForSubstance(substance, this._p.x, this._p.z, this._c.data);
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
