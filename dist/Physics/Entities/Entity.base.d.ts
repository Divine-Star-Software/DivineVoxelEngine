export declare const EntityBase: {
    active: boolean;
    position: import("../../Math/Classes/Vector3.js").Vector3;
    direction: import("../../Math/Classes/Vector3.js").Vector3;
    previousPosiiton: import("../../Math/Classes/Vector3.js").Vector3;
    hitBox: {
        w: number;
        h: number;
        d: number;
    };
    speed: number;
    velocity: import("../../Math/Classes/Vector3.js").Vector3;
    onGround: boolean;
    veloctiy: import("../../Math/Classes/Vector3.js").Vector3;
    boundingBox: {
        w: number;
        h: number;
        d: number;
    };
    doCollision(x: number, y: number, z: number, colliderName: string, collisionData: {
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
};
