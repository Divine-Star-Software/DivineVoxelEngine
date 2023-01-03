declare type Vector3 = {
    x: number;
    y: number;
    z: number;
};
export declare class VoxelSpace {
    data: {
        getPosition: (space: VoxelSpace) => Vector3;
        getIndex: (space: VoxelSpace) => number;
    };
    static simpleCubeHash(space: VoxelSpace): {
        x: number;
        y: number;
        z: number;
    };
    static getIndex(position: Vector3, bounds: Vector3): number;
    static WholeVec3: {
        x: number;
        y: number;
        z: number;
    };
    static spatialHash(space: VoxelSpace, parentSpace: VoxelSpace, divisor?: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    _position: {
        x: number;
        y: number;
        z: number;
    };
    _hashedPosition: {
        x: number;
        y: number;
        z: number;
    };
    _bounds: {
        x: number;
        y: number;
        z: number;
    };
    _boundsPower2: {
        x: number;
        y: number;
        z: number;
    };
    _boundsSet: boolean;
    constructor(data: {
        getPosition: (space: VoxelSpace) => Vector3;
        getIndex: (space: VoxelSpace) => number;
    });
    getVolume(): number;
    getArea(): number;
    setXYZ(x: number, y: number, z: number): this;
    setXZ(x: number, z: number): this;
    setCubeBounds(bounds: Vector3): this | undefined;
    setBounds(bounds: Vector3): this | undefined;
    getPosition(): Vector3;
    getIndex(): number;
    getPositionXYZ(x: number, y: number, z: number): Vector3;
    getIndexXYZ(x: number, y: number, z: number): number;
    getKeyXYZ(x: number, y: number, z: number): string;
    getKey(): string;
}
export {};
