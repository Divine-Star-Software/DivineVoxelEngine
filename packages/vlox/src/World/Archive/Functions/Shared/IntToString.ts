const charset = "0123456789ABCDEF";

export function uint16To4CharString(value: number): string {
  if (value < 0 || value > 0xffff) {
    throw new RangeError("Value must be a 16-bit unsigned integer.");
  }

  const chars: string[] = [];

  for (let i = 0; i < 4; i++) {
    const charCode = (value >> (i * 4)) & 0x0f;
    chars.unshift(charset[charCode]);
  }

  const result = chars.join("").replace(/^0+(?!$)/, "");

  return result;
}
