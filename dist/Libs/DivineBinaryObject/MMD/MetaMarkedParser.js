import { BToMMD } from "./BufferToMMD.js";
import { MMDToBuffer } from "./MMDToBufferN.js";
export const MMDP = {
    toBuffer(data) {
        return MMDToBuffer.toBuffer(data);
    },
    toObject(buffer, byteOffSet = 0) {
        return BToMMD.toObject(buffer);
    },
    toMMD(buffer, byteOffSet = 0, byteOffSetEnd = 0) {
        return BToMMD.toMMD(buffer, byteOffSet, byteOffSetEnd);
    },
};
