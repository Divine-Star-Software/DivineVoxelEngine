export const DataEncoder = {
    setData(raw, value, offset, numBits) {
        let mask = (2 ** numBits - 1) << offset;
        return (raw & ~mask) | (value << offset);
    },
    getData(raw, offset, numBits) {
        let mask = (2 ** numBits - 1) << offset;
        return (raw & mask) >> offset;
    },
};
