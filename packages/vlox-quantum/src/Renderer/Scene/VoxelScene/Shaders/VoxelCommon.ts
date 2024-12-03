export class VoxelCommon {
  static CommonStructs = /* wgsl */ `
struct CameraData {
    projection: mat4x4f,
    view: mat4x4f,
    viewProjection: mat4x4f,
    //x -> FOV in radians 
    settings: vec3f,
    position: vec3f,
    forward: vec3f,
    right: vec3f,
    up: vec3f
};
  


struct SceneProperties {
    resolution: vec4f,
    voxelMeshBounds: vec3f,
    worldBoundsMin: vec3f,
    worldBoundsMax: vec3f,
    sunPosition: vec3f
}    
`;

static CommonBinds  = /* wgsl */ `
@group(0) @binding(0)
var<uniform> camera: CameraData;

@group(0) @binding(1)
var<uniform> scene_props: SceneProperties;
`
}
