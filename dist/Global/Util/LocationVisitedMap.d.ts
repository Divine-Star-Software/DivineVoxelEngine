import { LocationData } from "voxelspaces";
export declare class LocationVisitedMap {
    _map: Map<string, boolean>;
    get size(): number;
    has(location: LocationData): boolean;
    add(location: LocationData): void;
    remove(location: LocationData): void;
    clear(): void;
}
