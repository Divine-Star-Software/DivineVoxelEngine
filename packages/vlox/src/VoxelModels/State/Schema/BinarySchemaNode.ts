import { StringPalette } from "../../../Interfaces/Data/StringPalette";
import { BinarySchemaNodeData } from "../State.types";

export class BinarySchemaNode {
  id: string;
  valuePalette?: StringPalette;
  bitIndex = 0;
  bitMask = 0;
  constructor(data: BinarySchemaNodeData) {
    this.id = data.id;
    this.bitIndex = data.index;
    this.bitMask = data.mask;
    if (data.valuePalette)
      this.valuePalette = new StringPalette(data.valuePalette);
  }

  getValue(data: number) {
    return (data & (this.bitMask << this.bitIndex)) >> this.bitIndex;
  }

  setValue(data: number, value: number) {
    return (
      (data & ~(this.bitMask << this.bitIndex)) |
      ((value & this.bitMask) << this.bitIndex)
    );
  }
}
