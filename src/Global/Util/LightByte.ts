/**# Light Byte
 * ---
 * Used to decode light color info.
 */
export class LightByte {
 setLightValues(values: number[]) {
  let value = (0 & ~(0xf << 0)) | (values[0] << 0);
  value = (value & ~(0xf << 4)) | (values[1] << 4);
  value = (value & ~(0xf << 8)) | (values[2] << 8);
  value = (value & ~(0xf << 12)) | (values[3] << 12);
  return value;
 }
 getLightValues(value: number) {
return  [
   (value & (0x0f << 0)) >> 0,
   (value & (0x0f << 4)) >> 4,
   (value & (0x0f << 8)) >> 8,
   (value & (0x0f << 12)) >> 12,
  ];
 }
}
