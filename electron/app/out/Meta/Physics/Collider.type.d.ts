import { DimensionsVector3 } from "Libs/Math/Types/Math.types";
export declare type ColliderReturnData = {
    name: string;
    boundingBox: DimensionsVector3;
    position: [number, number, number];
}[];
export declare type ColliderObject = {
    id: string;
    getColliderData(x: number, y: number, z: number): ColliderReturnData;
};
