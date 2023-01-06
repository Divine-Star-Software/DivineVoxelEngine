import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
export declare class LocationBoundTool {
    location: LocationData;
    setDimension(dimensionId: string): this;
    getLocation(): LocationData;
    setXYZ(x: number, y: number, z: number): this;
    setXZ(x: number, z: number): this;
    setLocation(location: LocationData): this;
}
