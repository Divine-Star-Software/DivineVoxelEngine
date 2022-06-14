export declare class Vector3 {
    _v3: {
        x: number;
        y: number;
        z: number;
    };
    _tv3: {
        x: number;
        y: number;
        z: number;
    };
    constructor(x: number, y: number, z: number);
    getVector(): {
        x: number;
        y: number;
        z: number;
    };
    updateVector(x: number, y: number, z: number): void;
    translate(x: number, y: number, z: number): {
        x: number;
        y: number;
        z: number;
    };
    getTranslated(x: number, y: number, z: number): {
        x: number;
        y: number;
        z: number;
    };
    scaleXYZ(scaler: number): {
        x: number;
        y: number;
        z: number;
    };
    scale(xScale: number, yScale: number, zScale: number): {
        x: number;
        y: number;
        z: number;
    };
    getScaledXYZ(scaler: number): {
        x: number;
        y: number;
        z: number;
    };
    getScaled(xScale: number, yScale: number, zScale: number): {
        x: number;
        y: number;
        z: number;
    };
    addXYZ(add: number): {
        x: number;
        y: number;
        z: number;
    };
    subtractXYZ(subtract: number): {
        x: number;
        y: number;
        z: number;
    };
    getAddXYZ(add: number): {
        x: number;
        y: number;
        z: number;
    };
    getSubtractXYZ(subtract: number): {
        x: number;
        y: number;
        z: number;
    };
    addVector(vector3: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    getAddedVector(vector3: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    subtractVector(vector3: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    getSubtractedVector(vector3: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    scaleVector(vector3: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    getScaledVector(vector3: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    isEqual(vector3: Vector3): boolean;
    isNotEqual(vector3: Vector3): boolean;
}
