import { WorldBounds } from "./World/WorldBounds.js";
export const WorldRegister = {
    dimensionRecord: {
        main: 0,
    },
    dimensionMap: {
        0: "main",
    },
    _dimensions: {
        main: {},
    },
    dimensino: {
        add(id) {
            const dimesnion = {};
            WorldRegister._dimensions[id] = dimesnion;
            return dimesnion;
        },
        get(id) {
            let dim;
            if (typeof id == "number") {
                return WorldRegister._dimensions[WorldRegister.dimensionMap[id]];
            }
            return WorldRegister._dimensions[id];
        },
    },
    region: {
        add(dimensionId, x, y, z) {
            let dimension = WorldRegister.dimensino.get(dimensionId);
            if (!dimension) {
                dimension = WorldRegister.dimensino.add(dimensionId);
            }
            const regionKey = WorldBounds.getRegionKeyFromPosition(x, y, z);
            const region = {
                columns: {},
            };
            dimension[regionKey] = region;
            return region;
        },
        get(dimensionId, x, y, z) {
            const dimension = WorldRegister.dimensino.get(dimensionId);
            if (!dimension)
                return false;
            const regionKey = WorldBounds.getRegionKeyFromPosition(x, y, z);
            const region = dimension[regionKey];
            if (!region)
                return false;
            return region;
        },
    },
    worldColumn: {
        add(dimensionId, x, z, y = 0) {
            let region = WorldRegister.region.get(dimensionId, x, y, z);
            if (!region) {
                region = WorldRegister.region.add(dimensionId, x, y, z);
            }
            const worldColumnKey = WorldBounds.getWorldColumnKey(x, z);
            //**@TO-DO Impelement world column data.
            const sab = new SharedArrayBuffer(1);
            const worldColumn = {
                chunks: {},
                buffer: sab,
                data: new DataView(sab),
            };
            region.columns[worldColumnKey] = worldColumn;
            return worldColumn;
        },
        get(dimensionId, x, z, y = 0) {
            const region = WorldRegister.region.get(dimensionId, x, y, z);
            if (!region)
                return false;
            const worldColumnKey = WorldBounds.getWorldColumnKey(x, z);
            return region.columns[worldColumnKey];
        },
    },
    chunk: {
        add(dimensionId, x, y, z, sab) {
            let worldColumn = WorldRegister.worldColumn.get(dimensionId, x, y, z);
            if (!worldColumn) {
                worldColumn = WorldRegister.worldColumn.add(dimensionId, x, y, z);
            }
            const chunk = {
                buffer: sab,
                data: new DataView(sab),
            };
            const chunkKey = WorldBounds.getChunkKeyFromPosition(x, y, z);
            worldColumn.chunks[chunkKey] = chunk;
        },
        get(dimensionId, x, y, z) {
            const worldColumn = WorldRegister.worldColumn.get(dimensionId, x, y, z);
            if (!worldColumn)
                return false;
            const chunkKey = WorldBounds.getChunkKeyFromPosition(x, y, z);
            return worldColumn.chunks[chunkKey];
        },
    },
};
