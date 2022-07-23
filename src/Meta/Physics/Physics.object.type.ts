import { SimpleBoundingBox } from "Math/Classes/SimpleBoundingBox";

export type CollisionCheckData = {
    name : string,
}[];


export type PhysicsObject = {
 id: string;
 setOrigin(x: number, y: number, z: number): void;
 checkCollision(boundingBox : SimpleBoundingBox): CollisionCheckData;
};
