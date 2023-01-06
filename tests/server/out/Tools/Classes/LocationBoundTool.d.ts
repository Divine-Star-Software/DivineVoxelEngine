import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
export declare class LocationBoundTool {
    location: LocationData;
    get dimension(): string;
    set dimension(dimension: string);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
    setDimension(dimensionId: string): this;
    getLocation(): LocationData;
    setXYZ(x: number, y: number, z: number): this;
    setXZ(x: number, z: number): this;
    setLocation(location: LocationData): this;
}
