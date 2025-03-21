import { SceneUBO } from "../../Scene/SceneUBO";

export class VoxelParticleShader {
  static GetVertex() {
    return /* glsl */ `#version 300 es
precision highp float;
precision highp int;
precision highp usampler2D; 
precision highp sampler2DArray;


//texture animations
uniform sampler2DArray dve_voxel;
uniform usampler2D dve_voxel_animation; 
uniform int dve_voxel_animation_size;

//uniforms
uniform mat4 world;
uniform mat4 viewProjection;

${SceneUBO.Define}     
const float lightGradient[16] = float[16](
0.08, 0.12, 0.16, 0.21, 0.27, 0.34, 0.42, 0.5, 0.59, 0.68, 0.77, 0.85, 0.91, 0.96, 0.99, 1.
);
const uint lightMask = uint(0xf);
const uint sVLIndex = 0u;
const uint rVLIndex = 4u;
const uint gVLIndex = 8u;
const uint bVLIndex = 12u;
//attributes
in vec3 position;
in vec3 normal;
in vec2 uv;
in vec4 color; 

//varying
out vec3 vUV;
out vec3 vLight;
out float alpha;

float getTextureIndex(int index) {
  uint tInt = texelFetch(dve_voxel_animation, 
  ivec2( index % dve_voxel_animation_size,  index / dve_voxel_animation_size), 0).r;
  if(tInt == 0u) return float(index);
  return float(tInt);
}

vec3 getLightValue(uint value) {
 return  vec3(
    max(
((
    //rgb light
    vec3(lightGradient[(value >> rVLIndex) & lightMask], lightGradient[(value >> gVLIndex) & lightMask], lightGradient[(value >> bVLIndex) & lightMask]) * scene_shadeOptions.y ) 
    //sun light
    + (lightGradient[(value >> sVLIndex) & lightMask] * scene_shadeOptions.x  * scene_levels.y)), 
    //base light min
    scene_levels.x
)
);
}


void main(void) {
  vUV.z = getTextureIndex(int(color.r));

float sizeX = (float(uint(color.g) & uint(0xf)) * .1) * .2;
float sizeY = (float((uint(color.g) >> 4u)  & uint(0xf)) * .1) * .2;
vUV.x = (uv.x * sizeX) + .5;
vUV.y = (uv.y * sizeY) + .5;

vLight = getLightValue(uint(color.b));

alpha = color.a;
vec4 worldPosition = world * vec4(position, 1.0);
gl_Position = viewProjection * world * vec4(position, 1.0); 

}
`;
  }

  static GetFragment() {
    const shader = /* glsl */ `#version 300 es
precision highp float;
precision highp int;
precision highp usampler2D; 
precision highp sampler2DArray;


//uniforms
uniform float time;
uniform sampler2DArray dve_voxel;
uniform usampler2D dve_voxel_animation; 
uniform int dve_voxel_animation_size;   

//varying
in vec3 vUV;
in vec3 vLight;
in float alpha;



out vec4 FragColor;  
void main(void) {

vec4 rgb = texture(dve_voxel,vec3(vUV.xy,vUV.z));
FragColor = vec4(rgb.rgb * vLight, rgb.a * alpha );
 if (FragColor.a < 0.1) { 
   discard;
 }  
  
}


`;
    return shader;
  }
}
