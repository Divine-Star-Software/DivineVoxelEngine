import { StringPalette } from "../../../Util/StringPalette";
import { VoxelBinaryStateSchemaNode } from "../State.types";

export class BinarySchemaNode {
  name: string;
  valuePalette?: StringPalette;
  bitIndex = 0;
  bitMask = 0;
  constructor(data: VoxelBinaryStateSchemaNode) {
    this.name = data.name;
    this.bitIndex = data.bitIndex;
    this.bitMask = (1 << data.bitSize) - 1;
    if (data.values) this.valuePalette = new StringPalette(data.values);
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
