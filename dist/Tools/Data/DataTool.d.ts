import type { RawVoxelData, VoxelTemplateSubstanceType } from "Meta/Data/Voxels/Voxel.types.js";
import { ChunkDataTool } from "./WorldData/ChunkDataTool.js";
import { HeightMapTool } from "./WorldData/HeightMapTool.js";
import { DataToolBase } from "../Classes/DataToolBase.js";
import { ColumnDataTool } from "./WorldData/ColumnDataTool.js";
import { SubstanceDataTool } from "./SubstanceDataTool.js";
export declare class DataTool extends DataToolBase {
    /**# World Data Mode
     * ---
     * Read data directly from the world.
     */
    static WORLD_DATA_MODE: number;
    /**# Voxel Matrix Mode
     * ---
     * Read from a voxel matrix.
     */
    static VOXEL_MATRIX_MODE: number;
    /**# Voxel Data Mode
     * ---
     * Read data from a single voxel passed in via `loadInRaw`
     */
    static VOXEL_DATA_MODE: number;
    static _dtutil: DataTool;
    _chunkTool: ChunkDataTool;
    _substanceTool: SubstanceDataTool;
    static _heightMapTool: HeightMapTool;
    static _columntool: ColumnDataTool;
    _locationKey: string;
    _loadedIn: boolean;
    _mode: number;
    data: {
        raw: RawVoxelData;
        id: number;
        baseId: number;
        secondaryId: number;
        secondaryBaseId: number;
    };
    __secondary: boolean;
    tags: {
        voxelIndex: Uint16Array;
        id: string;
        sync(voxelMap: Uint16Array): void;
        setVoxel(id: number): void;
        initData: import("divine-binary-tags").RemoteTagManagerInitData;
        $INIT(data: import("divine-binary-tags").RemoteTagManagerInitData): void;
        byteOffSet: number;
        tagSize: number;
        tagIndexes: number;
        data: DataView;
        indexMap: Map<string, number>;
        index: DataView;
        setBuffer(data: DataView | import("divine-binary-tags").BufferTypes): void;
        getBuffer(): ArrayBuffer;
        setTagIndex(index: number): void;
        getTag(id: string): number;
        setTag(id: string, value: number): boolean;
        getArrayTagValue(id: string, index: number): number;
        getArrayTagByteIndex(id: string, index: number): number;
        setArrayTagValue(id: string, index: number, value: number): number | void;
        loopThroughTags(run: (id: string, value: number) => void): void;
        loopThroughIndex(run: (data: number[]) => void): void;
        loopThroughAllIndexTags(run: (id: string, value: number, index: number) => void): void;
    };
    setMode(mode: typeof DataTool.VOXEL_DATA_MODE | typeof DataTool.VOXEL_MATRIX_MODE | typeof DataTool.WORLD_DATA_MODE): this;
    clear(): this;
    setDimension(dimensionId: string | number): this;
    setSecondary(enable: boolean): this;
    _getBaseId(id: number): number;
    getSubstnaceData(): SubstanceDataTool;
    getRaw(): RawVoxelData;
    loadInRaw(rawData: RawVoxelData): this;
    __process(): void;
    loadIn(): boolean;
    commit(heightMapUpdate?: number): boolean;
    hasRGBLight(): boolean;
    hasSunLight(): boolean;
    getLight(): number;
    setLight(light: number): this;
    isOpaque(): true | undefined;
    getLevel(): number;
    setLevel(level: number): this;
    getLevelState(): number;
    setLevelState(state: number): this;
    getShapeState(): number;
    setShapeState(state: number): this;
    hasSecondaryVoxel(): boolean;
    getShapeId(): string;
    isLightSource(): boolean;
    getLightSourceValue(): number;
    getSubstance(): string;
    getMaterial(): string;
    getHardness(): number;
    getCollider(): string;
    checkCollisions(): boolean;
    getTemplateSubstance(): VoxelTemplateSubstanceType;
    getState(): number;
    isRich(): number;
    setAir(): this;
    isAir(): boolean;
    setBarrier(): this;
    isBarrier(): boolean;
    getId(base?: boolean): number;
    setId(id: number): this;
    setStringId(id: string): this;
    getStringId(): string;
    isRenderable(): boolean;
    isSameVoxel(cx: number, cy: number, cz: number): boolean;
}
