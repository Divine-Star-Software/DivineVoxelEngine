import { TextureRotations } from "Meta/Constructor/Geometry/Geometry.types";
import { DirectionNames } from "Meta/Util.types";
export declare const FaceByte: {
    _rotationMap: Record<TextureRotations, number>;
    _rotationReverseMap: Record<number, TextureRotations>;
    _setFaceTextureState: Record<DirectionNames, (state: number, faceBit: number) => number>;
    _getFaceTextureState: Record<DirectionNames, (faceBit: number) => number>;
    _setFaceRotateState: Record<DirectionNames, (state: number, faceBit: number) => number>;
    _getFaceRotateState: Record<DirectionNames, (faceBit: number) => number>;
    _markExposedFace: Record<DirectionNames, (faceBit: number) => number>;
    _checkExposedFace: Record<DirectionNames, (faceBit: number) => boolean>;
    markFaceAsExposed(direction: DirectionNames, rawData: number): number;
    isFaceExposed(direction: DirectionNames, rawData: number): boolean;
    setFaceRotateState(direction: DirectionNames, state: number, rawData: number): number;
    getFaceRotateState(direction: DirectionNames, rawData: number): number;
    setFaceTextureState(direction: DirectionNames, rotation: TextureRotations, rawData: number): number;
    getFaceTextureState(direction: DirectionNames, rawData: number): TextureRotations;
};
