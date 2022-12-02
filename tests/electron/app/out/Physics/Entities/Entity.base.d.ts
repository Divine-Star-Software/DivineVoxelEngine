import { DataTool } from "../../Tools/Data/DataTool.js";
export declare class EntityBase {
    dataTool: DataTool;
    active: boolean;
    position: import("../../Libs/Math/Classes/Vector3.js").Vector3;
    direction: import("../../Libs/Math/Classes/Vector3.js").Vector3;
    previousPosiiton: import("../../Libs/Math/Classes/Vector3.js").Vector3;
    hitBox: {
        w: number;
        h: number;
        d: number;
    };
    speed: number;
    velocity: import("../../Libs/Math/Classes/Vector3.js").Vector3;
    onGround: boolean;
    veloctiy: import("../../Libs/Math/Classes/Vector3.js").Vector3;
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
    syncPosition(position: Float32Array): void;
    cachePosition(): void;
    setVelocity(x: number, y: number, z: number): void;
    applyVelocity(): void;
    beforeUpdate(): void;
    afterUpdate(): void;
    update(): void;
}
