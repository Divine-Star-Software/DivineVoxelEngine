export declare const EntityBase: {
    collideWithLevel: boolean;
    x: number;
    y: number;
    z: number;
    px: number;
    py: number;
    pz: number;
    hx: number;
    hy: number;
    hz: number;
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
