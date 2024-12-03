import { VoxelMeshTypes } from "@divinevoxel/vlox/Mesher/Types/VoxelMesh.types";
import { VoxelCommon } from "./VoxelCommon";

export class VoxelFinalRender {
  static Create() {
    const shader = /* wgsl */ `
${VoxelCommon.CommonStructs}
struct VertexOutput {
    @builtin(position) position : vec4<f32>,
    @location(0) uv : vec2<f32>,
};

//binds
${VoxelCommon.CommonBinds}
@group(1) @binding(0) var scene_sampler: sampler;
@group(1) @binding(1) var scene_texture: texture_2d<f32>;

@group(1) @binding(2) var effect_sampler: sampler;
@group(1) @binding(3) var effect_texture: texture_2d<f32>;

@vertex
fn vs(@location(0) position: vec4<f32>, @location(1) uv: vec2<f32>) -> VertexOutput {
    var output: VertexOutput;
    output.position = position;
    output.uv = uv;
    output.uv.y = 1 - uv.y;
    return output;
}


@fragment
fn fs(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
return  textureSample(scene_texture, scene_sampler, uv) * textureSample(effect_texture, effect_sampler, uv);
//return  textureSample(scene_texture, scene_sampler, uv);
//return  textureSample(effect_texture, effect_sampler, uv);

}
`;
    return shader;
  }
}
