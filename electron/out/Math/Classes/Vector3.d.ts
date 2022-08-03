export declare class Vector3 {
    x: number;
    y: number;
    z: number;
    _tv3: {
        x: number;
        y: number;
        z: number;
    };
    constructor(x: number, y: number, z: number);
    updateFromArray(array: number[] | Float32Array | Float64Array, startIndex?: number): void;
    updateVector(x: number, y: number, z: number): void;
    updateFromVec3(vector: Vector3): void;
    roundVector(deciamlPoints?: number): void;
    translate(x: number, y: number, z: number): this;
    getTranslated(x: number, y: number, z: number): {
        x: number;
        y: number;
        z: number;
    };
    scaleXYZ(scaler: number): this;
    scale(xScale: number, yScale: number, zScale: number): this;
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
    addXYZ(add: number): this;
    addFromVec3(vector: Vector3): this;
    isZero(): boolean;
    subtractXYZ(subtract: number): this;
    subtractFromObj(vector: Vector3): this;
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
    addVector(vector3: Vector3): this;
    getAddedVector(vector3: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    subtractVector(vector3: Vector3): this;
    getSubtractedVector(vector3: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    scaleVector(vector3: Vector3): this;
    getScaledVector(vector3: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    getLength(): number;
    divide(scalar: number): this;
    getDivided(scalar: number): {
        x: number;
        y: number;
        z: number;
    };
    normalize(): this;
    isEqual(vector3: Vector3): boolean;
    isNotEqual(vector3: Vector3): boolean;
}
