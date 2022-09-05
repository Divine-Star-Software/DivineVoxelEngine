export interface ShapeHelperInterface {
    toLinearSpace(r: number, g: number, b: number, a: number): number[];
    calculateAOColor(colors: number[], chunkAmbientOcculusion: Float32Array, startIndex: number): void;
    calculateLightColor(RGBlightColors: number[], sunlightColors: number[], lightTemplate: Float32Array, startIndex: number): void;
}
