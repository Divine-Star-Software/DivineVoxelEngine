export const DataEncoder = {
 setData(raw: number, value: number, offset: number, numBits: number) {
  let mask = (2 ** numBits - 1) << offset;
  return (raw & ~mask) | (value << offset);
 },
 getData(raw: number, offset: number, numBits: number) {
  let mask = (2 ** numBits - 1) << offset;
  return (raw & mask) >> offset;
 },
};
