import { DataHooks } from "../../Data/DataHooks.js";
import { WorldBounds } from "./WorldBounds.js";
import { $2dMooreNeighborhood } from "../Constants/Util/CardinalNeighbors.js";
import { DimensionsRegister } from "./Dimensions/DimensionsRegister.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { RegionDataTool } from "../../Tools/Data/WorldData/RegionDataTool.js";
import { WorldSpaces } from "./WorldSpaces.js";
const chunkTool = new ChunkDataTool();
const columnTool = new ColumnDataTool();
const regionTool = new RegionDataTool();
export const WorldRegister = {
    _dimensions: new Map(),
    _cacheOn: false,
    _chunkCache: new Map(),
    _columnCache: new Map(),
    $INIT() {
        this._dimensions.set("main", new Map());
    },
    cache: {
        enable() {
            WorldRegister._cacheOn = true;
            WorldRegister._chunkCache.clear();
            WorldRegister._columnCache.clear();
        },
        disable() {
            WorldRegister._cacheOn = false;
            WorldRegister._chunkCache.clear();
            WorldRegister._columnCache.clear();
        },
        _addChunk(key, data) {
            WorldRegister._chunkCache.set(key, data);
        },
        _addColumn(key, data) {
            WorldRegister._columnCache.set(key, data);
        },
        _getChunk(key) {
            return WorldRegister._chunkCache.get(key);
        },
        _getColumn(key) {
            return WorldRegister._columnCache.get(key);
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
        add(dimensionId, x, y, z, sab) {
            let dimension = WorldRegister.dimensions.get(dimensionId);
            if (!dimension) {
                dimension = WorldRegister.dimensions.add(dimensionId);
            }
            const region = this._getRegionData(sab);
            const regionPOS = WorldSpaces.region.getPositionXYZ(x, y, z);
            regionTool.setRegion(region);
            regionTool.setPositionData(regionPOS.x, regionPOS.y, regionPOS.z);
            regionTool.setDimensionId(dimensionId);
            dimension.set(WorldSpaces.region.getKey(), region);
            return region;
        },
        _getRegionData(sab) {
            return {
                columns: new Map(),
                buffer: sab,
                data: new DataView(sab),
            };
        },
        get(dimensionId, x, y, z) {
            const dimension = WorldRegister.dimensions.get(dimensionId);
            if (!dimension)
                return false;
            const region = dimension.get(WorldSpaces.region.getKeyXYZ(x, y, z));
            if (!region)
                return false;
            return region;
        },
    },
    column: {
        add(dimensionId, x, z, y = 0, sab) {
            let region = WorldRegister.region.get(dimensionId, x, y, z);
            if (!region) {
                let buffer = DataHooks.region.onGetSync.run([dimensionId, x, y, z]);
                if (!buffer)
                    return;
                region = WorldRegister.region.add(dimensionId, x, y, z, buffer);
                DataHooks.region.onNew.run([dimensionId, x, y, z]);
            }
            const column = this._getColumnData(sab);
            const columnPOS = WorldSpaces.column.getPositionXYZ(x, y, z);
            columnTool.setColumn(column);
            columnTool.setPositionData(columnPOS.x, columnPOS.y, columnPOS.z);
            columnTool.setDimensionId(dimensionId);
            region.columns.set(WorldSpaces.column.getIndex(), column);
            return column;
        },
        _getColumnData(sab) {
            return {
                chunks: new Map(),
                buffer: sab,
                data: new DataView(sab),
            };
        },
        get(dimensionId, x, z, y = 0) {
            const columnKey = WorldSpaces.column.getKeyXYZ(x, y, z);
            let addColumn = false;
            if (WorldRegister._cacheOn) {
                const column = WorldRegister.cache._getColumn(columnKey);
                if (column)
                    return column;
                addColumn = true;
            }
            const region = WorldRegister.region.get(dimensionId, x, y, z);
            if (!region)
                return false;
            const column = region.columns.get(WorldSpaces.column.getIndexXYZ(x, y, z));
            if (!column)
                return false;
            if (addColumn) {
                WorldRegister.cache._addColumn(columnKey, column);
            }
            return column;
        },
        fill(dimensionId, x, z, y = 0) {
            for (let cy = WorldBounds.bounds.MinY; cy < WorldBounds.bounds.MaxY; cy += WorldSpaces.chunk._bounds.y) {
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
                const chunkWidth = WorldSpaces.chunk._bounds.x;
                const chunkDepth = WorldSpaces.chunk._bounds.z;
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
                    chunkTool.setChunk(chunk);
                    const chunkPOS = chunkTool.getPositionData();
                    let chunkMax = chunkTool.getTagValue("#dve_max_height");
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
                let buffer = DataHooks.column.onGetSync.run([dimensionId, x, z, y]);
                if (!buffer)
                    return;
                column = WorldRegister.column.add(dimensionId, x, z, y, buffer);
                DataHooks.column.onNew.run([dimensionId, x, z, y]);
            }
            if (!column)
                return;
            const chunk = this._getChunkData(sab);
            chunkTool.setChunk(chunk);
            const chunkPOS = WorldSpaces.chunk.getPositionXYZ(x, y, z);
            chunkTool.setPositionData(chunkPOS.x, chunkPOS.y, chunkPOS.z);
            chunkTool.setDimensionId(dimensionId);
            column.chunks.set(WorldSpaces.chunk.getIndex(), chunk);
            DataHooks.chunk.onNew.run([dimensionId, x, y, z]);
            return chunk;
        },
        _getChunkData(sab) {
            return {
                buffer: sab,
                data: new DataView(sab),
            };
        },
        addFromServer(chunkBuffer) {
            const sab = new SharedArrayBuffer(chunkBuffer.byteLength);
            const temp = new Uint8Array(chunkBuffer);
            const temp2 = new Uint8Array(sab);
            temp2.set(temp, 0);
            const chunk = this._getChunkData(sab);
            chunkTool.setChunk(chunk);
            const chunkPOS = chunkTool.getPositionData();
            let column = WorldRegister.column.get("main", chunkPOS.x, chunkPOS.z, chunkPOS.y);
            if (!column)
                return;
            column.chunks.set(WorldSpaces.chunk.getIndexXYZ(chunkPOS.x, chunkPOS.z, chunkPOS.y), chunk);
            DataHooks.chunk.onNew.run(["main", chunkPOS.x, chunkPOS.y, chunkPOS.z]);
            return chunk;
        },
        get(dimensionId, x, y, z) {
            const chunkKey = WorldSpaces.chunk.getKeyXYZ(x, y, z);
            let addChunk = false;
            if (WorldRegister._cacheOn) {
                const chunk = WorldRegister.cache._getChunk(chunkKey);
                if (chunk)
                    return chunk;
                addChunk = true;
            }
            const column = WorldRegister.column.get(dimensionId, x, z, y);
            if (!column)
                return false;
            const chunk = column.chunks.get(WorldSpaces.chunk.getIndex());
            if (!chunk)
                return;
            if (addChunk) {
                WorldRegister.cache._addChunk(chunkKey, chunk);
            }
            return chunk;
        },
    },
};
