export declare const ExplosionManager: {
    _queue: number[][];
    _visitedMap: Map<string, boolean>;
    addToMap(x: number, y: number, z: number): void;
    inMap(x: number, y: number, z: number): boolean;
    runExplosion(dimension: string, sx: number, sy: number, sz: number, radius: number): void;
};
