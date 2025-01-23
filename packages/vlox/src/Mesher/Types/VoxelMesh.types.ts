export class VoxelMeshTypes {
  static vertexStrideBytes = 96;
  static vertexStrideFloats = 24;

  static VoxelMeshStructWGSL = /* wgsl */ `
  struct VoxelMeshVertex {
      position: vec3f,
      normal: vec3f,
      voxelData: f32,
      textureIndex: vec3f,
      uv: vec2f,
      colors: vec3f,
  };
      `;
}
