import { SimpleBoundingBox } from "Math/Classes/SimpleBoundingBox";
export declare type BoundingBoxData = {
    name: string;
    boundingBox: SimpleBoundingBox;
}[];
export declare type PhysicsObject = {
    id: string;
    getBoundingBoxes(): BoundingBoxData;
};
