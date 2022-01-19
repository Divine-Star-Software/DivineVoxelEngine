export class InfoByte {
    byteValue;
    maxBit = 31;
    minBit = 0;
    maxDec = Math.pow(2, this.maxBit + 1);
    minDec = 0;
    constructor(byteValue = 0) {
        this.byteValue = byteValue;
    }
    getNumberValue() {
        return this.byteValue;
    }
    setNumberValue(newValue) {
        if (newValue > this.maxDec || newValue < this.minDec) {
            throw new Error(`Value is out of range. Acceptable range is ${this.minDec} - ${this.maxDec}`);
        }
        this.byteValue = newValue;
    }
    getBit(index) {
        if (index > this.maxBit || index < this.minBit) {
            throw new Error(`Index is out of range. Acceptable range is ${this.minBit} - ${this.maxBit}`);
        }
        const value = (this.byteValue >>> index) & 1;
        return value;
    }
    getBitsArray(bitIndex, byteLength) {
        if (bitIndex > this.maxBit + byteLength || bitIndex < this.minBit) {
            throw new Error(`Index is out of range. Acceptable range is ${this.minBit} - ${this.maxBit}`);
        }
        const bits = [];
        for (let i = bitIndex; i < bitIndex + byteLength; i++) {
            //@ts-ignore
            bits.push((this.byteValue >>> i) & 1);
        }
        return bits;
    }
    getHalfByteDec(bitIndex) {
        if (bitIndex > this.maxBit + 4 || bitIndex < this.minBit) {
            throw new Error(`Index is out of range. Acceptable range is ${this.minBit} - ${this.maxBit}`);
        }
        let mask;
        if (!bitIndex) {
            mask = 0x0f;
            return (this.byteValue & mask);
        }
        else {
            mask = 0x0f << bitIndex;
            return (this.byteValue & mask) >>> bitIndex;
        }
    }
    setHalfByteBits(index, value) {
        if (index > this.maxBit || index < this.minBit) {
            throw new Error(`Index is out of range. Acceptable range is ${this.minBit} - ${this.maxBit}`);
        }
        if (value > 15) {
            throw new Error(`Value is out range. Must not be greater than 16`);
        }
        let k = 0;
        for (let i = index; i < index + 4; i++) {
            //@ts-ignore
            this.setBit(i, (value >>> k) & 1);
            k++;
        }
    }
    setBit(index, value) {
        if (index > this.maxBit || index < this.minBit) {
            throw new Error(`Index is out of range. Acceptable range is ${this.minBit} - ${this.maxBit}`);
        }
        if (value < 0 || value > 1) {
            throw new Error("Value is not in range. Acceptable range is 0 - 1");
        }
        const setValue = 1 << index;
        if (!value) {
            this.byteValue = this.byteValue & ~setValue;
        }
        else {
            this.byteValue = this.byteValue | setValue;
        }
    }
    toArray() {
        const returnArray = [];
        for (let i = 0; i <= this.maxBit; i++) {
            returnArray.push(this.getBit(i));
        }
        return returnArray;
    }
    toString(delimiter = "") {
        const array = this.toArray();
        return array.join(delimiter);
    }
}
