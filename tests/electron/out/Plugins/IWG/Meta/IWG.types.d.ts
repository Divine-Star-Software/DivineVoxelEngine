export declare type IWGGenerateFunction = (dimension: string, chunkX: number, chunkY: number, chunkZ: number) => boolean;
export declare type IWGData = {
    positionWatch: number[] | Float32Array;
    renderDistance: number;
    generate: IWGGenerateFunction;
};
