export const CCCore = {
    async compressArrayBuffer(input) {
        //@ts-ignore
        const cs = new CompressionStream("gzip");
        const writer = cs.writable.getWriter();
        writer.write(input);
        writer.close();
        const output = [];
        const reader = cs.readable.getReader();
        let totalSize = 0;
        while (true) {
            const { value, done } = await reader.read();
            if (done)
                break;
            output.push(value);
            totalSize += value.byteLength;
        }
        const concatenated = new Uint8Array(totalSize);
        let offset = 0;
        for (const array of output) {
            concatenated.set(array, offset);
            offset += array.byteLength;
        }
        return concatenated;
    },
    async decompressArrayBuffer(input) {
        //@ts-ignore
        const ds = new DecompressionStream("gzip");
        const writer = await ds.writable.getWriter();
        writer.write(input);
        const output = [];
        const reader = await ds.readable.getReader();
        writer.close();
        let totalSize = 0;
        while (true) {
            const { value, done } = await reader.read();
            if (done)
                break;
            output.push(value);
            totalSize += value.byteLength;
        }
        const concatenated = new Uint8Array(totalSize);
        let offset = 0;
        for (const array of output) {
            concatenated.set(array, offset);
            offset += array.byteLength;
        }
        return concatenated;
    },
    processArray(type, array) {
        const returnArray = this.getArray[type](array.buffer);
        return returnArray;
    },
    getArray: {
        Int8: (buffer) => {
            return new Int8Array(buffer);
        },
        Uint8: (buffer) => {
            return new Uint8Array(buffer);
        },
        Uint8Clamped: (buffer) => {
            return new Uint8ClampedArray(buffer);
        },
        Int16: (buffer) => {
            return new Int16Array(buffer);
        },
        Uint16: (buffer) => {
            return new Uint16Array(buffer);
        },
        Int32: (buffer) => {
            return new Int32Array(buffer);
        },
        Uint32: (buffer) => {
            return new Uint32Array(buffer);
        },
        Float32: (buffer) => {
            return new Float32Array(buffer);
        },
        Float64: (buffer) => {
            return new Float64Array(buffer);
        },
        BigInt64: (buffer) => {
            return new BigInt64Array(buffer);
        },
        BigUint64: (buffer) => {
            return new BigUint64Array(buffer);
        },
    },
};
