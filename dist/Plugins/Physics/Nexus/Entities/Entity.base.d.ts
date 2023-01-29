import { DataTool } from "../../../../Tools/Data/DataTool.js";
import { Vector3 } from "Meta/Util.types.js";
export declare class EntityBase {
    dataTool: DataTool;
    active: boolean;
    position: import("../../../../Math/Classes/Vector3.js").Vector3;
    direction: import("../../../../Math/Classes/Vector3.js").Vector3;
    previousPosiiton: import("../../../../Math/Classes/Vector3.js").Vector3;
    hitBox: {
        w: number;
        h: number;
        d: number;
    };
    speed: number;
    velocity: import("../../../../Math/Classes/Vector3.js").Vector3;
    onGround: boolean;
    veloctiy: import("../../../../Math/Classes/Vector3.js").Vector3;
    boundingBox: {
        w: number;
        h: number;
        d: number;
    };
    doCollision(colliderName: string, collisionData: {
        h: number;
        nx: number;
        ny: number;
        nz: number;
    }): void;
    setPosition(x: number, y: number, z: number): void;
    syncPosition(position: Vector3): void;
    cachePosition(): void;
    setVelocity(x: number, y: number, z: number): void;
    applyVelocity(): void;
    beforeUpdate(): void;
    afterUpdate(): void;
    update(): void;
}
