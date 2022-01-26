export class BitArray {
    byteArray;
    constructor(byteArray) {
        this.byteArray = byteArray;
    }
    getSize() {
        return 8 * this.byteArray.length;
    }
    getDec(index) {
        return this.byteArray[index];
    }
    setDec(index, value) {
        this.byteArray[index] = value;
    }
    getBit(index) {
        const byteIndex = Math.floor(index / 8);
        const bitIndex = index - 8 * byteIndex;
        const byteValue = this.byteArray[byteIndex];
        if (byteValue < 0 || byteValue > 255) {
            throw new Error("Array item must be byte (in range: 0-255).");
        }
        const bitValue = (byteValue >>> bitIndex) & 0x01;
        return bitValue;
    }
    setBit(index, value) {
        const byteIndex = Math.floor(index / 8);
        const bitIndex = index - 8 * byteIndex;
        const byteValue = this.byteArray[byteIndex];
        if (byteValue < 0 || byteValue > 255) {
            throw new Error("Array item must be byte (in range: 0-255).");
        }
        const maskValue = 0x01 << bitIndex;
        this.byteArray[byteIndex] = value
            ? byteValue | maskValue
            : byteValue & ~maskValue;
    }
    toString(delimiter) {
        if (delimiter == null) {
            delimiter = " ";
        }
        let result = "";
        for (let i = 0; i < this.byteArray.length; ++i) {
            if (i > 0) {
                result += delimiter;
            }
            const byte = this.byteArray[i];
            if (byte < 0 || byte > 255) {
                throw new Error("Array item must be byte (in range: 0-255).");
            }
            let bits = byte.toString(2);
            while (bits.length < 8) {
                bits = "0" + bits;
            }
            result += bits;
        }
        return result;
    }
}
