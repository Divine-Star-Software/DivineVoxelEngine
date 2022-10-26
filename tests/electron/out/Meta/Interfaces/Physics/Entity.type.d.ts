import { DimensionsVector3 } from "Libs/Math/Types/Math.types";
export declare type EntityObject = {
    boundingBox: DimensionsVector3;
    doCollision(x: number, y: number, z: number, colliderName: string, collisionData: {
        h: number;
        nx: number;
        ny: number;
        nz: number;
    }): void;
    beforeUpdate(): void;
    afterUpdate(): void;
};
