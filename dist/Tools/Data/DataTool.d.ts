import type { VoxelSubstanceType, VoxelTemplateSubstanceType } from "Meta/index.js";
export declare class DataTool {
    static _dtutil: DataTool;
    _mode: "World" | "Entity";
    data: {
        dimension: string;
        raw: number[];
        id: number;
        baseId: number;
        secondaryId: number;
        secondaryBaseId: number;
    };
    position: {
        x: number;
        y: number;
        z: number;
    };
    _cached: {
        id: number;
        secondaryId: number;
        substance: VoxelSubstanceType;
        secondarySubstance: VoxelSubstanceType;
    };
    __secondary: boolean;
    setDimension(dimensionId: string | number): this;
    setSecondary(enable: boolean): this;
    _getBaseId(id: number): number;
    loadInRaw(rawData: number[]): void;
    __process(): void;
    loadIn(x: number, y: number, z: number): boolean | undefined;
    commit(heightMapUpdate?: number): false | this;
    getTagValue(id: string): number;
    getLight(): number;
    setLight(light: number): this;
    getLevel(): number;
    setLevel(level: number): this;
    getLevelState(): number;
    setLevelState(state: number): this;
    getShapeState(): number;
    setShapeState(state: number): this;
    hasSecondaryVoxel(): boolean;
    getShapeId(): number;
    isLightSource(): boolean;
    getLightSourceValue(): number;
    getSubstance(): VoxelSubstanceType;
    getTemplateSubstance(): VoxelTemplateSubstanceType;
    getState(): number;
    isRich(): number;
    setAir(): this;
    isAir(): boolean;
    setBarrier(): this;
    isBarrier(): boolean;
    getId(base?: boolean): number;
    setId(id: number): this;
    getStringId(): string;
    isRenderable(): boolean;
    isSameVoxel(cx: number, cy: number, cz: number): boolean;
}
