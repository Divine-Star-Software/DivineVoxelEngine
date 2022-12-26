import { DataFileServer } from "./DataFileServer.js";
export const DataHanlder = {
    async getRegion(location) {
        return await DataFileServer.loadRegion(location);
    },
    async saveRegion(location, buffer) {
        await DataFileServer.saveRegion(location, buffer);
    },
};
