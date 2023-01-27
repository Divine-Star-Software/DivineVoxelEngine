export const ByteCounts = {
    "8i": 1,
    "8ui": 1,
    "16i": 2,
    "16ui": 2,
    "32i": 4,
    "32ui": 4,
    "32f": 4,
    "64f": 8,
    "bigi": 8,
    "bigui": 8,
};
export const ByteDataGet = {
    "8i": (dv, index) => {
        return dv.getInt8(index);
    },
    "8ui": (dv, index) => {
        return dv.getUint8(index);
    },
    "16i": (dv, index) => {
        return dv.getInt16(index);
    },
    "16ui": (dv, index) => {
        return dv.getUint16(index);
    },
    "32i": (dv, index) => {
        return dv.getInt32(index);
    },
    "32ui": (dv, index) => {
        return dv.getUint32(index);
    },
    "32f": (dv, index) => {
        return dv.getFloat32(index);
    },
    "64f": (dv, index) => {
        return dv.getFloat64(index);
    },
    //@ts-ignore
    "bigi": (dv, index) => {
        return dv.getBigInt64(index);
    },
    //@ts-ignore
    "bigui": (dv, index) => {
        return dv.getBigUint64(index);
    },
};
export const ByteDataSet = {
    "8i": (dv, index, value) => {
        dv.setInt8(index, value);
    },
    "8ui": (dv, index, value) => {
        dv.setUint8(index, value);
    },
    "16i": (dv, index, value) => {
        dv.setInt16(index, value);
    },
    "16ui": (dv, index, value) => {
        dv.setUint16(index, value);
    },
    "32i": (dv, index, value) => {
        dv.setInt32(index, value);
    },
    "32ui": (dv, index, value) => {
        dv.setUint32(index, value);
    },
    "32f": (dv, index, value) => {
        dv.setFloat32(index, value);
    },
    "64f": (dv, index, value) => {
        dv.setFloat64(index, value);
    },
    "bigi": (dv, index, value) => {
        dv.setBigInt64(index, BigInt(value));
    },
    "bigui": (dv, index, value) => {
        dv.setBigUint64(index, BigInt(value));
    },
};
