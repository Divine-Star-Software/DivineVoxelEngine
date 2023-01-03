import { WorldSpaces } from "../WorldSpaces.js";
import { RegionHeaderTags } from "./RegionTags.js";
export const RegionHeaderRegister = {
    _headers: new Map(),
    add(location, buffer) {
        const dimensionId = location[0];
        const x = location[1];
        const y = location[2];
        const z = location[3];
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
        const dimensionId = location[0];
        const x = location[1];
        const y = location[2];
        const z = location[3];
        let dimension = this._headers.get(dimensionId);
        if (!dimension)
            return false;
        const regionKey = WorldSpaces.region.getKeyXYZ(x, y, z);
        return dimension.get(regionKey);
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
