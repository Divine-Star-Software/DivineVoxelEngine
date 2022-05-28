import { PositionMatrix } from "Meta/Util.types";
/**# PositionByte
 * ---
 * Handles encoding a 32 bit float with a voxel space posiiton.
 */
export declare const PositionByte: {
    _poisiton: {
        x: number;
        y: number;
        z: number;
    };
    getY(byteData: number): number;
    getPosition(byteData: number): {
        x: number;
        y: number;
        z: number;
    };
    setPosition(x: number, y: number, z: number): number;
    setPositionUseObj(positionObj: PositionMatrix): number;
};
