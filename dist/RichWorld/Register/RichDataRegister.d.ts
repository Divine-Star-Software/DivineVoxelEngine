import type { RichChunk, RichColumn, RichRegion, RichWorldDimensions } from "Meta/Data/RichWorldData.types.js";
import type { LocationData } from "voxelspaces";
export declare const RichDataRegister: {
    _dimensions: RichWorldDimensions;
    dimensions: {
        get(dimensionId: string): false | Map<string, RichRegion>;
        add(dimensionId: string): Map<any, any>;
    };
    region: {
        _getRegionData(): RichRegion;
        add(location: LocationData): RichRegion;
        get(location: LocationData): false | RichRegion;
        remove(location: LocationData): false | RichRegion;
    };
    column: {
        _getColumnData(): RichColumn;
        add(location: LocationData): RichColumn;
        get(location: LocationData): false | RichColumn;
        remove(location: LocationData): false | RichColumn;
    };
    chunk: {
        _getChunkData(): RichChunk;
        add(location: LocationData): import("divine-binary-object").TypedNode<{}>;
        get(location: LocationData): false | import("divine-binary-object").TypedNode<import("Meta/Data/RichWorldData.types.js").RichDataSchema>;
        remove(location: LocationData): false | import("divine-binary-object").TypedNode<import("Meta/Data/RichWorldData.types.js").RichDataSchema>;
    };
};
