import { DirectionNames } from "Meta/Util.types.js";
import { BitArray } from "./Util/ByteArray.js";
import { InfoByte } from "./Util/InfoByte.js";
import { LightByte } from "./Util/LightByte.js";
import { Flat3DArray } from "./Util/Flat3DArray.js";
export declare class Util {
    infoByte: InfoByte;
    exposedFaceRecord: Record<DirectionNames, number>;
    isFaceExposexd(voxelExposedFaceEncodedBit: number, faceDirection: DirectionNames): boolean;
    calculateGameZone(positionZ: number, positionX: number): number[];
    getFlat3DArray(): Flat3DArray;
    getVoxelByte(): {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
    };
    getLightByte(): LightByte;
    getInfoByte(number?: number): InfoByte;
    getBitArray(nums: number[]): BitArray;
    degtoRad(degrees: number): number;
    radToDeg(radians: number): number;
}
