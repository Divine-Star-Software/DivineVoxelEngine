import { BitArray } from "./Util/ByteArray.js";



export class Util {
    calculateGameZone(positionZ: number, positionX: number) {
        const chunkpositionZ = (positionZ >> 4) << 4;
        const chunkpositionX = (positionX >> 4) << 4;
        return [chunkpositionZ, chunkpositionX];
      }


      getBitArray(nums : number[]) {
        return new BitArray(nums);
      }

      degtoRad(degrees: number) {
        return degrees * (Math.PI / 180);
      }
      radToDeg(radians: number) {
        return radians * (180 / Math.PI);
      }


}