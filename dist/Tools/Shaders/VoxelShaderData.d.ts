export declare class VoxelShaderDataTool {
    _v: number;
    _lightMask: number;
    _aoMask: number;
    _animationMask: number;
    _setLight(index: number, value: number): number;
    _setAO(value: number): number;
    _setAnimation(value: number): number;
    setLight(values: number): this;
    setAO(value: number): this;
    setAnimation(value: number): this;
    getValue(): number;
}
