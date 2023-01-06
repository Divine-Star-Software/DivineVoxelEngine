import { WorldSpaces } from "../WorldSpaces.js";
import { RegionHeaderTags } from "./RegionTags.js";
export const RegionHeaderRegister = {
    _headers: new Map(),
    remove(location) {
        const [dimensionId, x, y, z] = location;
        const dimension = this._headers.get(dimensionId);
        if (!dimension)
            return false;
        const regionKey = WorldSpaces.region.getKeyXYZ(x, y, z);
        return dimension.delete(regionKey);
    },
    add(location, buffer) {
        const [dimensionId, x, y, z] = location;
        let dimension = this._headers.get(dimensionId);
        if (!dimension) {
            dimension = new Map();
            this._headers.set(dimensionId, dimension);
        }
        const regionKey = WorldSpaces.region.getKeyXYZ(x, y, z);
        dimension.set(regionKey, {
            buffer: buffer,
            data: new DataView(buffer),
        });
    },
    get(location) {
        const [dimensionId, x, y, z] = location;
        let dimension = this._headers.get(dimensionId);
        if (!dimension)
            return false;
        return dimension.get(WorldSpaces.region.getKeyXYZ(x, y, z));
    },
    /**# isStored
     * @param location
     * @returns
     *
     * Returns 1 if stored
     *
     * Returns 0 if not stored
     *
     * Returns -1 if region header is not loaded
     *
     */
    isStored(location) {
        const header = this.get(location);
        if (!header)
            return -1;
        RegionHeaderTags.setBuffer(header.data);
        const columnIndex = WorldSpaces.column.getIndexXYZ(location[1], location[2], location[3]);
        return RegionHeaderTags.getArrayTagValue("#dved-column-save-timestamp", columnIndex) != 0
            ? 1
            : 0;
    },
};
