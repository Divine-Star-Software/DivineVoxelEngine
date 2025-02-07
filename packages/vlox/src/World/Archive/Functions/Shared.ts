import { VoxelLightData } from "../../../Voxels/Cursor/VoxelLightData";
import { ArchivedLightSegments, ArchivedSectionData } from "../Archive.types";
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

function traverseSection(source: any, target: any) {
  for (const key in source) {
    if (!(key in target)) return false;

    const sourceValue = source[key];
    const targetValue = target[key];

    if (
      !ArrayBuffer.isView(sourceValue) &&
      typeof sourceValue === "object" &&
      sourceValue !== null &&
      !ArrayBuffer.isView(targetValue) &&
      typeof targetValue == "object" &&
      targetValue !== null
    ) {
      if (!traverseSection(sourceValue, targetValue)) return false;
      continue;
    }

    if (
      typeof sourceValue === "number" ||
      typeof sourceValue === "string" ||
      typeof targetValue === "number" ||
      typeof targetValue === "string"
    ) {
      if (sourceValue !== targetValue) return false;
      continue;
    }

    if (
      sourceValue instanceof Uint8Array ||
      sourceValue instanceof Uint16Array
    ) {
      if (!(targetValue instanceof sourceValue.constructor)) return false;
      if (sourceValue.length !== (targetValue as any).length) return false;
      let target = targetValue as Uint8Array;
      for (let i = 0; i < target.length; i++) {
        if (sourceValue[i] != target[i]) return false;
      }
    }
  }

  return true;
}

export function compareSection(
  section1: ArchivedSectionData,
  section2: ArchivedSectionData
) {
  return traverseSection(section1, section2);
}
