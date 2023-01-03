import { DataFileServer } from "./DataFileServer.js";
export const DataHanlder = {
    async getRegion(location) {
        return await DataFileServer.loadRegion(location);
    },
    async saveRegion(buffers) {
        return await DataFileServer.saveRegion(buffers);
    },
    async getRegionHeader(location) {
        return await DataFileServer.loadRegionHeader(location);
    },
    async getColumn(location) {
        return await DataFileServer.loadColumn(location);
    },
    async saveColumn(location, buffer) {
        return await DataFileServer.saveColumn(location, buffer);
    },
    async setPath(id) {
        return DataFileServer.setPath(id);
    },
    async columnExists(location) {
        return await DataFileServer.columnExists(location);
    },
    async columnTimestamp(location) {
        return await DataFileServer.columnTimestamp(location);
    },
};
