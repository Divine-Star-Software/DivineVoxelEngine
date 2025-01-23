import { VoxelMeshTypes } from "@divinevoxel/vlox/Mesher/Types/VoxelMesh.types";
import { VoxelCommon } from "./VoxelCommon";

export class VoxelTriangleRender {
  static Create() {
    const shader = /* wgsl */ `

${VoxelCommon.CommonStructs}


struct MeshData {
    matrix: mat4x4f
};

struct VertexInput {
    @location(0) position: vec3f, 
    @location(1) normal: vec3f,     
    @location(2) textureIndex: vec3f,    
    @location(3) uv: vec2f,    
    @location(4) colors: vec3f,
    @location(5) voxelData: f32,    
    @location(6) _padding: vec4f
};


// Define the output structure from the vertex shader
struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(1)  worldPosition: vec4f,
    @location(2) normal: vec3f,
    @location(3) uv: vec2f,
    @location(4) @interpolate(flat) textureIndex: f32
};

const textureIndexMask = u32(0xffff);

${VoxelCommon.CommonBinds}
@group(1) @binding(0) var voxel_texture: texture_2d_array<f32>;
@group(1) @binding(1) var voxel_texture_sampler: sampler;


@group(2) @binding(0)
var<uniform> mesh_data: MeshData;


@vertex
fn vs(vertex: VertexInput) -> VertexOutput {
  // let clipPosition =  camera.projection * camera.view  *  mesh_data.matrix  * vec4f(vertex.position, 1.0);
  let worldPosition = mesh_data.matrix  * vec4f(vertex.position, 1.0);
  let clipPosition =  camera.viewProjection *  worldPosition;
   return VertexOutput(
       clipPosition,
       worldPosition,
       vertex.normal,
       vertex.uv,
       f32(u32(vertex.textureIndex.x) & textureIndexMask)
   );
}


struct FragmentOutput {
    @location(0) color: vec4f,
    @location(1) normal: vec4f,
    @location(2) position: vec4f
}

@fragment
fn fs(input: VertexOutput) -> FragmentOutput {


let baseColor = textureSample(voxel_texture, voxel_texture_sampler, input.uv, u32(input.textureIndex));
let normalColor = vec4<f32>( (input.normal + vec3<f32>(1)) / 2, 1.0);
return FragmentOutput(baseColor,normalColor,input.worldPosition); 

}
`;
    return shader;
  }
}
