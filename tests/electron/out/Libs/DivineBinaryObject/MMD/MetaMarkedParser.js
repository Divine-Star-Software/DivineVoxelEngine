import { BToMMD } from "./BufferToMMD.js";
import { MMDToBuffer } from "./MMDToBuffer.js";
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
    toToekns(data) {
        return MMDToBuffer.toTokens(data);
    },
    toeknsToBuffer(data, size, buffer, byteOffSet = 0) {
        return MMDToBuffer.toeknsToBuffer(data, size, buffer, byteOffSet);
    },
};
