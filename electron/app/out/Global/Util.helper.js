import { InfoByte } from "./Util/InfoByte.js";
import { LightByte } from "./Util/LightByte.js";
import { VoxelByte } from "./Util/VoxelByte.js";
import { Flat3DArray } from "./Util/Flat3DArray.js";
export class Util {
    infoByte = InfoByte;
    exposedFaceRecord = {
        top: 0,
        bottom: 1,
        west: 2,
        east: 3,
        north: 4,
        south: 5,
    };
    isFaceExposexd(voxelExposedFaceEncodedBit, faceDirection) {
        this.infoByte.setNumberValue(voxelExposedFaceEncodedBit);
        return this.infoByte.getBit(this.exposedFaceRecord[faceDirection]) == 1;
    }
    calculateGameZone(positionZ, positionX) {
        const chunkpositionZ = (positionZ >> 4) << 4;
        const chunkpositionX = (positionX >> 4) << 4;
        return [chunkpositionZ, chunkpositionX];
    }
    getFlat3DArray() {
        return Flat3DArray;
    }
    getVoxelByte() {
        return VoxelByte;
    }
    getLightByte() {
        return LightByte;
    }
    getInfoByte(number = 0) {
        InfoByte.setNumberValue(number);
        return InfoByte;
    }
    degtoRad(degrees) {
        return degrees * (Math.PI / 180);
    }
    radToDeg(radians) {
        return radians * (180 / Math.PI);
    }
}
