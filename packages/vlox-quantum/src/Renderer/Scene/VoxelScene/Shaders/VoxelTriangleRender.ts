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
    @location(2) voxelData: f32,    
    @location(3) textureIndex: vec3f,    
    @location(4) uv: vec2f,    
    @location(5) colors: vec3f,
    @location(6) _padding: vec4f
};


// Define the output structure from the vertex shader
struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) normal: vec3f,
};



${VoxelCommon.CommonBinds}

@group(1) @binding(0)
var<uniform> mesh_data: MeshData;


@vertex
fn vs(vertex: VertexInput) -> VertexOutput {
    let clipPosition =  camera.projection * camera.view  *  mesh_data.matrix  * vec4f(vertex.position, 1.0);
   return VertexOutput(
       clipPosition,
       vertex.normal
   );
}

@fragment
fn fs(input: VertexOutput) -> @location(0) vec4f {
    // Normalize the input normal to ensure proper mapping
    let normalizedNormal = input.normal;

    // Map normal to color emphasizing RGB for x, y, z components
    let baseColor = vec3f(
        abs(normalizedNormal.x),  // Red for X-axis
        abs(normalizedNormal.y),  // Green for Y-axis
        abs(normalizedNormal.z)   // Blue for Z-axis
    );

    // Compute the tint for negative directions
    var tint = vec3f(0.0, 0.0, 0.0);
    if (normalizedNormal.x < 0.0) {
        tint.x = 0.5;
    }
    if (normalizedNormal.y < 0.0) {
        tint.y = 0.5;
    }
    if (normalizedNormal.z < 0.0) {
        tint.z = 0.5;
    }

    // Combine base color with the tint
    let finalColor = (baseColor - tint);

    // Return the final color with full alpha
    return vec4f(finalColor.rgb, 1.0);
}
`;
    return shader;
  }
}
