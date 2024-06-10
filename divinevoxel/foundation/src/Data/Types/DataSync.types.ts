import { LocationData } from "@divinevoxel/core/Math";

export type DataSyncTypes = "chunk" | "voxel-data" | "iten-data" | "shape-map";

export type WorldDataSync = [location: LocationData, buffer: SharedArrayBuffer];

