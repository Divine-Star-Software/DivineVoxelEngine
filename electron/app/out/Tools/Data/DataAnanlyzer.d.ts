export declare class DataTool {
    data: {
        dimension: number;
        raw: number[];
        x: number;
        y: number;
        z: number;
        id: number;
    };
    setDimension(dimensionId: string | number): void;
    setXYZ(x: number, y: number, z: number): this;
    loadIn(): boolean;
    commit(): false | this;
    getLight(): number;
    setLight(light: number): this;
    getLevel(): number;
    setLevel(level: number): this;
    getLevelState(): number;
    setLevelState(state: number): this;
    getShapeState(): number;
    setShapeState(state: number): this;
    getShapeId(): -1 | undefined;
    isLightSource(): false | undefined;
    getLightValue(): -1 | undefined;
    getSubstance(): -1 | undefined;
    getId(): number;
    getStringId(): string;
    isRenderable(): false | undefined;
}
