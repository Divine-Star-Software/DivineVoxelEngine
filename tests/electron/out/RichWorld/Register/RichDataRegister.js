import { TNM } from "../../Libs/DivineBinaryObject/NodeMaker.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
export const RichDataRegister = {
    _dimensions: new Map(),
    dimensions: {
        get(dimensionId) {
            const dimension = RichDataRegister._dimensions.get(dimensionId);
            if (!dimension)
                return false;
            return dimension;
        },
        add(dimensionId) {
            const newdimension = new Map();
            RichDataRegister._dimensions.set(dimensionId, newdimension);
            return newdimension;
        },
    },
    region: {
        _getRegionData() {
            return {
                columns: new Map(),
            };
        },
        add(location) {
            let dimension = RichDataRegister.dimensions.get(location[0]);
            if (!dimension) {
                dimension = RichDataRegister.dimensions.add(location[0]);
            }
            const region = this._getRegionData();
            dimension.set(WorldSpaces.region.getKeyLocation(location), region);
            return region;
        },
        get(location) {
            const dimension = RichDataRegister.dimensions.get(location[0]);
            if (!dimension)
                return false;
            const region = dimension.get(WorldSpaces.region.getKeyLocation(location));
            if (!region)
                return false;
            return region;
        },
        remove(location) {
            const dimension = RichDataRegister.dimensions.get(location[0]);
            if (!dimension)
                return false;
            const key = WorldSpaces.region.getKeyLocation(location);
            const region = dimension.get(key);
            if (!region)
                return false;
            dimension.delete(key);
            return region;
        },
    },
    column: {
        _getColumnData() {
            return TNM.object({
                chunks: TNM.object({}),
                data: TNM.object({}),
            });
        },
        add(location) {
            let region = RichDataRegister.region.get(location);
            if (!region) {
                region = RichDataRegister.region.add(location);
            }
            const column = this._getColumnData();
            region.columns.set(WorldSpaces.column.getKeyLocation(location), column);
            return column;
        },
        get(location) {
            const region = RichDataRegister.region.get(location);
            if (!region)
                return false;
            const column = region.columns.get(WorldSpaces.column.getKeyLocation(location));
            if (!column)
                return false;
            return column;
        },
        remove(location) {
            const region = RichDataRegister.region.get(location);
            if (!region)
                return false;
            const key = WorldSpaces.column.getKeyLocation(location);
            const column = region.columns.get(key);
            if (!column)
                return false;
            region.columns.delete(key);
            return column;
        },
    },
    chunk: {
        _getChunkData() {
            return {};
        },
        add(location) {
            let column = RichDataRegister.column.get(location);
            if (!column) {
                column = RichDataRegister.column.add(location);
            }
            const chunk = TNM.object({});
            column.value.chunks[WorldSpaces.chunk.getIndexLocation(location)] =
                TNM.object({});
            return chunk;
        },
        get(location) {
            let column = RichDataRegister.column.get(location);
            if (!column)
                return false;
            const chunk = column.value.chunks[WorldSpaces.chunk.getIndexLocation(location)];
            if (!chunk)
                return false;
            return chunk;
        },
        remove(location) {
            let column = RichDataRegister.column.get(location);
            if (!column)
                return false;
            const index = WorldSpaces.chunk.getIndexLocation(location);
            const chunk = column.value.chunks[index];
            if (!chunk)
                return false;
            delete column.value.chunks[index];
            return chunk;
        },
    },
};
