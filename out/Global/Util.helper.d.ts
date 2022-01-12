import { DirectionNames } from "Meta/Util.types.js";
import { BitArray } from "./Util/ByteArray.js";
import { InfoByte } from "./Util/InfoByte.js";
export declare class Util {
    infoByte: InfoByte;
    exposedFaceRecord: Record<DirectionNames, number>;
    isFaceExposexd(voxelExposedFaceEncodedBit: number, faceDirection: DirectionNames): boolean;
    calculateGameZone(positionZ: number, positionX: number): number[];
    getInfoByte(number?: number): InfoByte;
    getBitArray(nums: number[]): BitArray;
    degtoRad(degrees: number): number;
    radToDeg(radians: number): number;
}
