import { BitArray } from "./Util/ByteArray.js";
import { InfoByte } from "./Util/InfoByte.js";
import { LightByte } from "./Util/LightByte.js";
export class Util {
    infoByte = new InfoByte();
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
    getLightByte() {
        return new LightByte();
    }
    getInfoByte(number = 0) {
        return new InfoByte(number);
    }
    getBitArray(nums) {
        return new BitArray(nums);
    }
    degtoRad(degrees) {
        return degrees * (Math.PI / 180);
    }
    radToDeg(radians) {
        return radians * (180 / Math.PI);
    }
}
