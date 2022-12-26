import { CCCore } from "./CCCore.js";
export const CrystalCompressor = {
    core: CCCore,
    version: 0.0,
    async compressArray(array) {
        const returnArray = await this.core.compressArrayBuffer(array.buffer);
        return returnArray;
    },
    async decompressArray(buffer, type) {
        const returnData = await this.core.decompressArrayBuffer(buffer);
        return this.core.processArray(type, returnData);
    },
};
