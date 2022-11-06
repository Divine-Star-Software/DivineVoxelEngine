import { DataHooks } from "../../Data/DataHooks.js";
import { WorldBounds } from "./WorldBounds.js";
import { ChunkReader } from "../Chunk/ChunkReader.js";
import { HeightMapData } from "../Chunk/HeightMapData.js";
import { $2dMooreNeighborhood } from "../Constants/Util/CardinalNeighbors.js";
import { DimensionsRegister } from "../Dimensions/DimensionsRegister.js";
export const WorldRegister = {
    _dimensions: new Map(),
    _cacheOn: false,
    _cache: {},
    $INIT() {
        this._dimensions.set("main", new Map());
    },
    cache: {
        enable() {
            WorldRegister._cacheOn = true;
            WorldRegister._cache = new Map();
        },
        disable() {
            WorldRegister._cacheOn = false;
            WorldRegister._cache.clear();
        },
        _add(key, data) {
            WorldRegister._cache.set(key, data);
        },
        _get(key) {
            return WorldRegister._cache.get(key);
        },
    },
    dimensions: {
        add(id) {
            const dimesnion = new Map();
            id = DimensionsRegister.getDimensionStringId(id);
            WorldRegister._dimensions.set(id, dimesnion);
            return dimesnion;
        },
        get(id) {
            id = DimensionsRegister.getDimensionStringId(id);
            return WorldRegister._dimensions.get(id);
        },
    },
    region: {
        add(dimensionId, x, y, z) {
            let dimension = WorldRegister.dimensions.get(dimensionId);
            if (!dimension) {
                dimension = WorldRegister.dimensions.add(dimensionId);
            }
            const region = {
                columns: new Map(),
            };
            dimension.set(WorldBounds.getRegionKeyFromPosition(x, y, z), region);
            return region;
        },
        get(dimensionId, x, y, z) {
            const dimension = WorldRegister.dimensions.get(dimensionId);
            if (!dimension)
                return false;
            const region = dimension.get(WorldBounds.getRegionKeyFromPosition(x, y, z));
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
            /**
            @TDO Impelement column data.
            */
            const sab = new SharedArrayBuffer(1);
            const column = {
                chunks: new Map(),
                buffer: sab,
                data: new DataView(sab),
            };
            region.columns.set(WorldBounds.getColumnIndex(x, z, y), column);
            return column;
        },
        get(dimensionId, x, z, y = 0) {
            const region = WorldRegister.region.get(dimensionId, x, y, z);
            if (!region)
                return false;
            return region.columns.get(WorldBounds.getColumnIndex(x, z, y));
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
                    const cz = check[1] * chunkDepth + z;
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
                    return WorldBounds.bounds.MinY;
                if (column.chunks.size == 0)
                    return WorldBounds.bounds.MinY;
                let maxHeight = WorldBounds.bounds.MinY;
                for (const [key, chunk] of column.chunks) {
                    if (!chunk)
                        continue;
                    const chunkPOS = ChunkReader.getChunkPosition(chunk.data);
                    let chunkMax = HeightMapData.getChunkMax(chunk.data);
                    if (chunkMax == 0)
                        continue;
                    chunkMax += chunkPOS.y;
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
            column.chunks.set(WorldBounds.getChunkColumnIndex(y), chunk);
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
            const chunk = column.chunks.get(WorldBounds.getChunkColumnIndex(y));
            if (!chunk)
                return;
            if (addChunk) {
                WorldRegister.cache._add(chunkKey, chunk);
            }
            return chunk;
        },
    },
};
