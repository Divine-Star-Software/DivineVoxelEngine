export declare type LocationData = [
    dimensionId: string,
    x: number,
    y: number,
    z: number
];
export declare type LocationNode = LocationData & {
    copy(): LocationNode;
    setXYZ(x: number, y: number, z: number): void;
    setDimension(dimension: string): void;
    x: number;
    y: number;
    z: number;
    dimension: string;
};
