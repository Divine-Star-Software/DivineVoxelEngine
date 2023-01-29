import { LocationData } from "../Types/VoxelSpaces.types";
declare type Vector3 = {
    x: number;
    y: number;
    z: number;
};
declare class VSVec3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    copy(): VSVec3;
    copyTo(vec3: Vector3): void;
    toString(): string;
    multiply(vec3: Vector3): this;
}
export declare class VoxelSpace {
    data: {
        getPosition: (space: VoxelSpace) => VSVec3;
        getIndex: (space: VoxelSpace) => number;
        getPostionFromIndex: (space: VoxelSpace, index: number) => VSVec3;
    };
    static simpleCubeHash(space: VoxelSpace): VSVec3;
    static getPositionFromIndex(position: VSVec3, bounds: VSVec3 | Vector3, index: number): VSVec3;
    static getIndex(position: Vector3, bounds: Vector3): number;
    static WholeVec3: VSVec3;
    static spatialHash(space: VoxelSpace, parentSpace: VoxelSpace, divisor?: Vector3): VSVec3;
    static mapLocationToVec3(location: LocationData, vector: Vector3): void;
    _location: LocationData;
    _position: VSVec3;
    _hashedPosition: VSVec3;
    _bounds: VSVec3;
    _boundsPower2: VSVec3;
    _boundsSet: boolean;
    constructor(data: {
        getPosition: (space: VoxelSpace) => VSVec3;
        getIndex: (space: VoxelSpace) => number;
        getPostionFromIndex: (space: VoxelSpace, index: number) => VSVec3;
    });
    getVolume(): number;
    getArea(): number;
    setXYZ(x: number, y: number, z: number): this;
    setXZ(x: number, z: number): this;
    getLocation(): LocationData;
    getLocationXYZ(x: number, y: number, z: number): LocationData;
    setLocation(location: LocationData): this;
    updateLoaction(location: LocationData): this;
    setCubeBounds(bounds: Vector3): this | undefined;
    setBounds(bounds: Vector3): this | undefined;
    getPosition(): VSVec3;
    getPositionXYZ(x: number, y: number, z: number): VSVec3;
    getPositionLocation(location: LocationData): VSVec3;
    getIndex(): number;
    getIndexXYZ(x: number, y: number, z: number): number;
    getIndexLocation(location: LocationData): number;
    getPositionFromIndex(index: number): VSVec3;
    getKey(): string;
    getKeyXYZ(x: number, y: number, z: number): string;
    getKeyLocation(location: LocationData): string;
}
export {};
