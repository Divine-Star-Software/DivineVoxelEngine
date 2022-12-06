export declare const WorldGenRegister: {
    _requests: Map<string, {
        dimension: string;
        chunks: Map<string, [
            x: number,
            y: number,
            z: number
        ]>;
        voxels: [
            x: number,
            y: number,
            z: number,
            data: number[]
        ][];
    }>;
    registerRequest(dimension: string, x: number, y: number, z: number): string;
    addToRequest(registerId: string, x: number, y: number, z: number, rawData: number[]): void;
    attemptRequestFullFill(registerId: string): boolean;
};
