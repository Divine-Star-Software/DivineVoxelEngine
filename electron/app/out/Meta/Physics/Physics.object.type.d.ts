import { SimpleBoundingBox } from "Math/Classes/SimpleBoundingBox";
export declare type CollisionCheckData = {
    name: string;
}[];
export declare type PhysicsObject = {
    id: string;
    setOrigin(x: number, y: number, z: number): void;
    checkCollision(boundingBox: SimpleBoundingBox): CollisionCheckData;
};
