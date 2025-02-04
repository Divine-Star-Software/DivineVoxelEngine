import { SharedShaders } from "./SharedShaders";

export class VoxelBaseShader {
  static GetVertex(props: { doAO: boolean }) {
    return /* glsl */ `#version 300 es
precision highp float;
precision highp usampler2D; 
precision highp sampler2DArray;

         
const uint lightMask = uint(0xf);
const uint aoMask = uint(0xf);
const uint animMask = uint(0xfff);
const uint sVLIndex = uint(0);
const uint rVLIndex = uint(4);
const uint gVLIndex = uint(8);
const uint bVLIndex = uint(12);
const uint aoIndex = uint(16);
const uint animIndex = uint(20);
const float aoValue =  pow( .65, 2.2);
const uint textureIndexMask = uint(0xffff);
const uint mainTexutreIndex =uint(0);
const uint secondaryTextureIndex = uint(0xf + 0x1);
        


//texture animations
uniform sampler2DArray dve_voxel;
uniform usampler2D dve_voxel_animation; 
uniform int dve_voxel_animation_size;

//uniforms
uniform float time;
uniform vec4 fogOptions;
uniform vec3 vFogColor;
uniform float sunLightLevel;
uniform float baseLevel;
uniform float doAO;
uniform float doSun;
uniform float doRGB;
uniform float doColor;
uniform float doEffects;
uniform float mipMapBias;

uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 worldOrigin;
uniform vec3 cameraPosition;
uniform float lightGradient[16];
  

//attributes
in vec3 position;
in vec3 normal;
in float indices;
in vec3 textureIndex;
in vec2 uv;
in vec3 colors;
in float voxelData;

//varying
out mat4 VOXEL;
out vec3 worldPOS;
out float vDistance;
out vec3 worldPOSNoOrigin;
out vec3 vNormal;
out vec4 vColors;
out float vFlow;
out vec3 vUV;
out vec4 vOverlayTextureIndex;
out vec3 vLight;
out float vAO;



float getTextureIndex(int index) {
  uint tInt = texelFetch(dve_voxel_animation, 
  ivec2( index % dve_voxel_animation_size,  index / dve_voxel_animation_size), 0).r;
  if(tInt == 0u) return float(index);
  return float(tInt);
}



${SharedShaders.FBMNoiseFunctions}
  #ifdef INSTANCES
  //matricies
  in vec4 world0;
  in vec4 world1;
  in vec4 world2;
  in vec4 world3;
  //custom attributes
  #endif


  void main(void) {

mat4 vData;
uint vUID = uint(voxelData);
float sVL = lightGradient[int(((lightMask << sVLIndex) & vUID) >> sVLIndex)];
int redValue = int(((lightMask << rVLIndex) & vUID) >> rVLIndex);
int greenValue = int(((lightMask << gVLIndex) & vUID) >> gVLIndex);
int blueValue = int(((lightMask << bVLIndex) & vUID) >> bVLIndex);
float AOVL = float(((aoMask << aoIndex) & vUID) >> aoIndex);
if(AOVL > 0.) {
    vAO = pow( 1. - .2 * AOVL, 2.2);
} else {
    vAO = 1.;
}

float animVL = float(((animMask << animIndex) & vUID) >> animIndex);
    vFlow = 0.;
if(animVL == 1.) {
    vFlow = -1.;
}
if(animVL == 2.) {
    vFlow = 1.;
}

vLight = vec3(max(((vec3(lightGradient[redValue], lightGradient[greenValue], lightGradient[blueValue]) * doRGB) + (sVL * doSun * sunLightLevel)), baseLevel));

vec4 worldPOSTemp = world * vec4(position, 1.0);
worldPOS = vec3(worldPOSTemp.x, worldPOSTemp.y, worldPOSTemp.z);
vDistance = distance(cameraPosition, worldPOS);

vNormal = normal;

if(doColor == 1.0) {
    vColors = vec4(1.0, 1.0, 1.0, 1.0);
} else {
    vColors = vec4(1.0, 1.0, 1.0, 1.0);
}

vUV.x = uv.x;
vUV.y = uv.y;
vUV.z = getTextureIndex(int(uint(textureIndex.x) & textureIndexMask));
vOverlayTextureIndex.x = getTextureIndex(
    int(((textureIndexMask << secondaryTextureIndex) & uint(textureIndex.x)) >> secondaryTextureIndex)
);
vOverlayTextureIndex.y = getTextureIndex(int(uint(textureIndex.y) & textureIndexMask));
vOverlayTextureIndex.z = getTextureIndex(  
    int(((textureIndexMask << secondaryTextureIndex) & uint(textureIndex.y)) >> secondaryTextureIndex)
);
vOverlayTextureIndex.w = getTextureIndex( int(uint(textureIndex.z) & textureIndexMask));

#ifdef INSTANCES
mat4 finalWorld = mat4(world0, world1, world2, world3);

vDistance = distance(cameraPosition, finalWorld[3].xyz);

finalWorld[3].xyz += worldOrigin.xyz;
gl_Position = viewProjection * finalWorld * vec4(position, 1.0);  
#endif      
#ifndef INSTANCES
vec4 worldPosition = world * vec4(position, 1.0);
gl_Position = viewProjection * world * vec4(position, 1.0); 

#endif

}
`;
  }
  static DefaultLiquidFragmentMain = (doAO: boolean) => /* glsl */ `
  
vec4 rgb = texture(dve_voxel,vec3(vec2(vUV.x,vUV.y + time * .01 * -1. * vFlow),vUV.z));
    
/*     
    vec4 oRGB1 =  texture(dve_voxel, vec3(vUV.xy, vOverlayTextureIndex.x));
    vec4 oRGB2 =  texture(dve_voxel, vec3(vUV.xy, vOverlayTextureIndex.y));
    vec4 oRGB3 =  texture(dve_voxel, vec3(vUV.xy, vOverlayTextureIndex.z));
    vec4 oRGB4 =  texture(dve_voxel, vec3(vUV.xy, vOverlayTextureIndex.w));
    if(oRGB1.a > 0.5) {
        rgb = oRGB1;
    }
    if(oRGB2.a > 0.5) {
        rgb = oRGB2;
    }
    if(oRGB3.a > 0.5) {
        rgb = oRGB3;
    }
    if(oRGB4.a > 0.5) {
        rgb = oRGB4;
    }
*/

  //mix color
  rgb *= vColors;
  //mix light
  rgb.rgb *=  vLight;

  vec3 finalColor = doFog(rgb);

  FragColor = vec4(finalColor.rgb, rgb.a);

  if (FragColor.a < 0.5) { 
    discard;
  }

  `;

  static DefaultFragmentMain = (doAO: boolean) => /* glsl */ `
  
      vec4 rgb = texture(dve_voxel,vec3(vUV.xy,vUV.z));
    
/*     
    vec4 oRGB1 =  texture(dve_voxel, vec3(vUV.xy, vOverlayTextureIndex.x));
    vec4 oRGB2 =  texture(dve_voxel, vec3(vUV.xy, vOverlayTextureIndex.y));
    vec4 oRGB3 =  texture(dve_voxel, vec3(vUV.xy, vOverlayTextureIndex.z));
    vec4 oRGB4 =  texture(dve_voxel, vec3(vUV.xy, vOverlayTextureIndex.w));
    if(oRGB1.a > 0.5) {
        rgb = oRGB1;
    }
    if(oRGB2.a > 0.5) {
        rgb = oRGB2;
    }
    if(oRGB3.a > 0.5) {
        rgb = oRGB3;
    }
    if(oRGB4.a > 0.5) {
        rgb = oRGB4;
    }
*/

  ${doAO ? "rgb.rgb *= vAO;" : ""}
  //mix color
  rgb *= vColors;
  //mix light
  rgb.rgb *=  vLight;

  vec3 finalColor = doFog(rgb);
  //FragColor = vec4(vec3(1.) * vAO,1.);
 FragColor = vec4(finalColor.rgb, rgb.a);

  if (FragColor.a < 0.5) { 
    discard;
  } 

  `;

  static GetFragment(main: string, top = "") {
    const shader = /* glsl */ `#version 300 es
precision highp float;
precision highp usampler2D; 
precision highp sampler2DArray;


//uniforms
uniform float time;
uniform vec4 fogOptions;
uniform vec3 vFogColor;
uniform float sunLightLevel;
uniform float baseLevel;
uniform float doAO;
uniform float doSun;
uniform float doRGB;
uniform float doColor;
uniform float doEffects;
uniform float mipMapBias;
uniform vec3 cameraPosition;
uniform vec3 cameraDirection;
uniform sampler2DArray dve_voxel;
uniform usampler2D dve_voxel_animation; 
uniform int dve_voxel_animation_size;   

//varying
in vec3 worldPOS;
in float vDistance;
in vec3 worldPOSNoOrigin;
in vec3 vNormal;
in vec3 vLight;
in float vAO;
in vec4 vColors;
in float vFlow;
in vec3 vUV;
in vec4 vOverlayTextureIndex;

//functions

${SharedShaders.FBMNoiseFunctions}

${SharedShaders.FogFragmentFunctions}

${top}

out vec4 FragColor;  
void main(void) {

 ${main}
  
}


`;
    return shader;
  }
}
