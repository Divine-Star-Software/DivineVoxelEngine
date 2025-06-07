import { setNibbleArrayIndex } from "../../../../Util/Binary/BinaryArrays";
import { VoxelLightData } from "../../../../Voxels/Cursor/VoxelLightData";
import { ArchivedLightSegments } from "../../Types/Archive.types";
const lightData = new VoxelLightData();
export const lightSegments: ArchivedLightSegments[] = [
  "sun",
  "red",
  "green",
  "blue",
];

export const lightSemgnetGet: Record<
  ArchivedLightSegments,
  (value: number) => number
> = {
  sun: (value: number) => lightData.getS(value),
  red: (value: number) => lightData.getR(value),
  green: (value: number) => lightData.getG(value),
  blue: (value: number) => lightData.getB(value),
};

export const lightSemgnetSet: Record<
  ArchivedLightSegments,
  (value: number, source: number) => number
> = {
  sun: (value: number, source: number) => lightData.setS(value, source),
  red: (value: number, source: number) => lightData.setR(value, source),
  green: (value: number, source: number) => lightData.setG(value, source),
  blue: (value: number, source: number) => lightData.setB(value, source),
};

export function getLightBuffer(
  light: ArchivedLightSegments,
  buffer: Uint16Array
) {
  const array = new Uint8Array(buffer.length / 2);
  for (let i = 0; i < buffer.length; i++) {
    let l = 0;
    if (light == "sun") l = lightData.getS(buffer[i]);
    if (light == "red") l = lightData.getR(buffer[i]);
    if (light == "green") l = lightData.getG(buffer[i]);
    if (light == "blue") l = lightData.getB(buffer[i]);
    setNibbleArrayIndex(array, i, l);
  }
  return array;
}
