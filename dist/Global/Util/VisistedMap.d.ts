export declare class VisitedMap {
    _map: Map<string, boolean>;
    get size(): number;
    _getKey(x: number, y: number, z: number): string;
    inMap(x: number, y: number, z: number): boolean;
    add(x: number, y: number, z: number): void;
    remove(x: number, y: number, z: number): void;
    clear(): void;
}
