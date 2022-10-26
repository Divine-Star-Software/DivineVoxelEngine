import { DataHooks } from "../../Data/DataHooks.js";
import { WorldBounds } from "./WorldBounds.js";
import { ChunkReader } from "../Chunk/ChunkReader.js";
import { HeightMapData } from "../Chunk/HeightMapData.js";
import { $2dMooreNeighborhood } from "../Constants/Util/CardinalNeighbors.js";
import { DimensionsRegister } from "../Dimensions/DimensionsRegister.js";
export const WorldRegister = {
    _dimensions: {
        main: {},
    },
    _cacheOn: false,
    _cache: {},
    cache: {
        enable() {
            WorldRegister._cacheOn = true;
            WorldRegister._cache = {};
        },
        disable() {
            WorldRegister._cacheOn = false;
            WorldRegister._cache = {};
        },
        _add(key, data) {
            WorldRegister._cache[key] = data;
        },
        _get(key) {
            return WorldRegister._cache[key];
        },
    },
    dimensions: {
        add(id) {
            const dimesnion = {};
            WorldRegister._dimensions[id] = dimesnion;
            return dimesnion;
        },
        get(id) {
            let dim;
            if (typeof id == "number") {
                return WorldRegister._dimensions[DimensionsRegister.getDimensionStringId(id)];
            }
            return WorldRegister._dimensions[id];
        },
    },
    region: {
        add(dimensionId, x, y, z) {
            let dimension = WorldRegister.dimensions.get(dimensionId);
            if (!dimension) {
                dimension = WorldRegister.dimensions.add(dimensionId);
            }
            const regionKey = WorldBounds.getRegionKeyFromPosition(x, y, z);
            const region = {
                columns: {},
            };
            dimension[regionKey] = region;
            return region;
        },
        get(dimensionId, x, y, z) {
            const dimension = WorldRegister.dimensions.get(dimensionId);
            if (!dimension)
                return false;
            const regionKey = WorldBounds.getRegionKeyFromPosition(x, y, z);
            const region = dimension[regionKey];
            if (!region)
                return false;
            return region;
        },
    },
    column: {
        add(dimensionId, x, z, y = 0) {
            let region = WorldRegister.region.get(dimensionId, x, y, z);
            if (!region) {
                region = WorldRegister.region.add(dimensionId, x, y, z);
            }
            const worldKey = WorldBounds.getColumnKey(x, z, y);
            /**
            @TDO Impelement column data.
            */
            const sab = new SharedArrayBuffer(1);
            const column = {
                chunks: {},
                buffer: sab,
                data: new DataView(sab),
            };
            region.columns[worldKey] = column;
            return column;
        },
        get(dimensionId, x, z, y = 0) {
            const region = WorldRegister.region.get(dimensionId, x, y, z);
            if (!region)
                return false;
            const columnKey = WorldBounds.getColumnKey(x, z, y);
            return region.columns[columnKey];
        },
        fill(dimensionId, x, z, y = 0) {
            for (let cy = WorldBounds.bounds.MinY; cy < WorldBounds.bounds.MaxY; cy += WorldBounds.chunkYSize) {
                if (!WorldRegister.chunk.get(dimensionId, x, y + cy, z)) {
                    const chunk = DataHooks.chunk.onGetSync.run([dimensionId, x, cy, z]);
                    if (!chunk)
                        continue;
                    WorldRegister.chunk.add(dimensionId, x, y + cy, z, chunk);
                }
            }
        },
        height: {
            getRelative(dimensionId, x, z, y = 0) {
                const chunkWidth = WorldBounds.chunkXSize;
                const chunkDepth = WorldBounds.chunkZSize;
                let maxHeight = -Infinity;
                for (const check of $2dMooreNeighborhood) {
                    const cx = check[0] * chunkWidth + x;
                    const cz = check[0] * chunkDepth + z;
                    const height = this.getAbsolute(dimensionId, cx, cz, y);
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                }
                return maxHeight;
            },
            getAbsolute(dimensionId, x, z, y = 0) {
                const column = WorldRegister.column.get(dimensionId, x, z, y);
                if (!column)
                    return -Infinity;
                const chunkKeys = Object.keys(column.chunks);
                if (chunkKeys.length == 0)
                    return -Infinity;
                let maxHeight = -Infinity;
                for (const chunkKey of chunkKeys) {
                    const chunk = column.chunks[chunkKey];
                    const chunkPOS = ChunkReader.getChunkPosition(chunk.data);
                    const chunkMax = HeightMapData.getChunkMax(chunk.data) + chunkPOS.y;
                    if (maxHeight < chunkMax) {
                        maxHeight = chunkMax;
                    }
                }
                return maxHeight + 1;
            },
        },
    },
    chunk: {
        add(dimensionId, x, y, z, sab) {
            let column = WorldRegister.column.get(dimensionId, x, z, y);
            if (!column) {
                column = WorldRegister.column.add(dimensionId, x, z, y);
            }
            const chunk = {
                buffer: sab,
                data: new DataView(sab),
                segement1: new Uint32Array(sab, ChunkReader.indexes.voxelData, ChunkReader.indexSizes.voxelData / 4),
                segement2: new Uint32Array(sab, ChunkReader.indexes.voxelStateData, ChunkReader.indexSizes.voxelStateData / 4),
            };
            const chunkKey = WorldBounds.getChunkKeyFromPosition(x, y, z);
            column.chunks[chunkKey] = chunk;
            DataHooks.chunk.onNew.run([dimensionId, x, y, z]);
            return chunk;
        },
        get(dimensionId, x, y, z) {
            const chunkKey = WorldBounds.getChunkKeyFromPosition(x, y, z);
            let addChunk = false;
            if (WorldRegister._cacheOn) {
                const chunk = WorldRegister.cache._get(chunkKey);
                if (chunk)
                    return chunk;
                addChunk = true;
            }
            const column = WorldRegister.column.get(dimensionId, x, z, y);
            if (!column)
                return false;
            const chunk = column.chunks[chunkKey];
            if (addChunk) {
                WorldRegister.cache._add(chunkKey, chunk);
            }
            return chunk;
        },
    },
};
