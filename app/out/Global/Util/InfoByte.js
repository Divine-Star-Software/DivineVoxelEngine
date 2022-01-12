export class InfoByte {
    byteValue;
    constructor(byteValue = 0) {
        this.byteValue = byteValue;
    }
    getNumberValue() {
        return this.byteValue;
    }
    setNumberValue(newValue) {
        if (newValue > 255 || newValue < 0) {
            throw new Error("Index is out of range. Acceptable range is 0 - 256");
        }
        this.byteValue = newValue;
    }
    getBit(index) {
        if (index > 7 || index < 0) {
            throw new Error("Index is out of range. Acceptable range is 0 - 7");
        }
        const value = (this.byteValue >>> index) & 1;
        return value;
    }
    setBit(index, value) {
        if (index > 7 || index < 0) {
            throw new Error("Index is out of range. Acceptable range is 0 - 7");
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
        for (let i = 0; i < 8; i++) {
            returnArray.push(this.getBit(i));
        }
        return returnArray;
    }
    toString(delimiter = "") {
        const array = this.toArray();
        return array.join(delimiter);
    }
}
