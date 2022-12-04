export type IWGGenerateFunction = (
 dimension: string,
 chunkX: number,
 chunkY: number,
 chunkZ: number
) => boolean;
export type IWGData = {
 positionWatch: number[] | Float32Array;
 renderDistance: number;
 generate: IWGGenerateFunction;
};
