type BinaryNums = 0 | 1;
type BinraryArray = BinaryNums[];

export class InfoByte {
  constructor(private byteValue: number = 0) {}

  getNumberValue() {
    return this.byteValue;
  }

  setNumberValue(newValue: number) {
    if (newValue > 255 || newValue < 0) {
      throw new Error("Index is out of range. Acceptable range is 0 - 256");
    }
    this.byteValue = newValue;
  }

  getBit(index: number): BinaryNums {
    if (index > 7 || index < 0) {
      throw new Error("Index is out of range. Acceptable range is 0 - 7");
    }
    const value = (this.byteValue >>> index) & 1;
    return <BinaryNums>value;
  }

  setBit(index: number, value: BinaryNums) {
    if (index > 7 || index < 0) {
      throw new Error("Index is out of range. Acceptable range is 0 - 7");
    }
    if (value < 0 || value > 1) {
      throw new Error("Value is not in range. Acceptable range is 0 - 1");
    }
    const setValue = 1 << index;
    if (!value) {
      this.byteValue = this.byteValue & ~setValue;
    } else {
      this.byteValue = this.byteValue | setValue;
    }
  }

  toArray(): BinraryArray {
    const returnArray: BinraryArray = [];
    for (let i = 0; i < 8; i++) {
      returnArray.push(this.getBit(i));
    }
    return returnArray;
  }

  toString(delimiter: string = ""): string {
    const array = this.toArray();
    return array.join(delimiter);
  }
}
