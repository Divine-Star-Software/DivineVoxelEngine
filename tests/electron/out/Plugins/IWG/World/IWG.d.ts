import type { IWGData } from "../Meta/IWG.types";
import { ColumnDataTool } from "../../../Tools/Data/ColumnDataTool.js";
import { BuilderTool } from "../../../Tools/Build/Builder.js";
/**# Infinite World Generator
 *
 */
export declare class IWG {
    data: IWGData;
    columnTool: ColumnDataTool;
    builder: BuilderTool;
    dimension: string;
    _cachedPosition: number[];
    _columnQueue: number[][];
    _generateQueue: number[][];
    _buildQueue: number[][];
    _removeQueue: number[][];
    _visitedMap: Map<string, boolean>;
    _activeColumns: Map<string, number[]>;
    constructor(data: IWGData);
    setDimension(id: string): void;
    update(): void;
}
