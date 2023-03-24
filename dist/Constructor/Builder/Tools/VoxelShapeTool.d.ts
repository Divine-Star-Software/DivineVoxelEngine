import { QuadBuilderTool, QuadUVTool } from "./MeshBuilderTool.js";
import { QuadVertexData } from "../Classes/VertexData.js";
declare class VoxelQuadBulder extends QuadBuilderTool {
    constructor();
    _lightData: QuadVertexData;
    _AOData: QuadVertexData;
    _animationData: QuadVertexData;
    clear(): this;
    create(): this;
    setFlipped(flipped: boolean): this;
    animationState: {
        _s: VoxelQuadBulder;
        add(data: QuadVertexData): VoxelQuadBulder;
    };
    light: {
        _s: VoxelQuadBulder;
        add(data: QuadVertexData): VoxelQuadBulder;
    };
    AO: {
        _s: VoxelQuadBulder;
        add(data: QuadVertexData): VoxelQuadBulder;
    };
    textures: QuadUVTool<this>;
    overlayTexture: {
        _s: VoxelQuadBulder;
        add(data: QuadVertexData): VoxelQuadBulder;
    };
}
export declare class VoxelShapeTool {
    quad: VoxelQuadBulder;
}
export {};
