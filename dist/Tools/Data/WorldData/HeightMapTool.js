//Data
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { WorldBounds } from "../../../Data/World/WorldBounds.js";
//tools
import { LocationBoundTool } from "../../../Tools/Classes/LocationBoundTool.js";
import { ChunkDataTool } from "./ChunkDataTool.js";
//constants
import { ChunkTagIDs } from "../../../Data/Constants/Tags/ChunkTagIds.js";
import { $2dMooreNeighborhood } from "../../../Math/Constants/CardinalNeighbors.js";
class HeightMapTool extends LocationBoundTool {
    static _chunkTool = new ChunkDataTool();
    chunk = {
        _c: new DataView(new ArrayBuffer(0)),
        _y: 0,
        loadInAt: (x, y, z) => {
            const chunk = WorldRegister.chunk.get([this.dimension, x, y, z]);
            if (!chunk)
                return false;
            HeightMapTool._chunkTool.setChunk(chunk);
            this.chunk._c = chunk.data;
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
        setY(y) {
            WorldSpaces.voxel.setXYZ(0, y, 0);
            this._y = WorldSpaces.voxel.getPosition().y;
            return this;
        },
        getMinMax() {
            HeightMapTool._chunkTool._c = this._c;
            let min = Infinity;
            let max = -Infinity;
            let i = WorldSpaces.chunk.getHeight();
            while (i--) {
                if (this.setY(i).hasVoxels()) {
                    if (i < min)
                        min = i;
                    if (i > max)
                        max = i;
                }
            }
            return [min, max];
        },
        hasVoxels() {
            HeightMapTool._chunkTool._c = this._c;
            return (HeightMapTool._chunkTool.getArrayTagValue(ChunkTagIDs.heightMap, this._y) ==
                1);
        },
        isDirty() {
            HeightMapTool._chunkTool._c = this._c;
            return (HeightMapTool._chunkTool.getArrayTagValue(ChunkTagIDs.dirtyMap, this._y) ==
                1);
        },
        setHasVoxels(hasVoxels) {
            HeightMapTool._chunkTool._c = this._c;
            return HeightMapTool._chunkTool.setArrayTagValue(ChunkTagIDs.heightMap, this._y, hasVoxels ? 1 : 0);
        },
        setDirty(isDirty) {
            HeightMapTool._chunkTool._c = this._c;
            return HeightMapTool._chunkTool.setArrayTagValue(ChunkTagIDs.dirtyMap, this._y, isDirty ? 1 : 0);
        },
    };
    column = {
        getRelative(location) {
            location = [...location];
            const chunkWidth = WorldSpaces.chunk._bounds.x;
            const chunkDepth = WorldSpaces.chunk._bounds.z;
            let maxHeight = -Infinity;
            const [dimension, x, y, z] = location;
            for (const check of $2dMooreNeighborhood) {
                location[1] = check[0] * chunkWidth + x;
                location[3] = check[1] * chunkDepth + z;
                const height = this.getAbsolute(location);
                if (height > maxHeight) {
                    maxHeight = height;
                }
            }
            return maxHeight;
        },
        getAbsolute: (location) => {
            const column = WorldRegister.column.get(location);
            if (!column)
                return WorldBounds.bounds.MinY;
            if (column.chunks.size == 0)
                return WorldBounds.bounds.MinY;
            let maxHeight = WorldBounds.bounds.MinY;
            for (const [key, chunk] of column.chunks) {
                if (!chunk)
                    continue;
                this.chunk.setChunk(chunk);
                const chunkPOS = HeightMapTool._chunkTool.getPositionData();
                let [chunkMin, chunkMax] = this.chunk.getMinMax();
                if (chunkMax == 0)
                    continue;
                chunkMax += chunkPOS.y;
                if (maxHeight < chunkMax) {
                    maxHeight = chunkMax;
                }
            }
            return maxHeight + 1;
        },
    };
}
export { HeightMapTool };
