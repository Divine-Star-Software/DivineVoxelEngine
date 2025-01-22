import { SharedShaders } from "./SharedShaders";

export class VoxelBaseShader {
  static GetVertex(props: { textureLength: number; doAO: boolean }) {
    return /* glsl */ `#version 300 es
precision highp float;


         
const uint lightMask = uint(0xf);
const uint aoMask = uint(0xf);
const uint animMask = uint(0xfff);
const uint sVLIndex = uint(0);
const uint rVLIndex = uint(4);
const uint gVLIndex = uint(8);
const uint bVLIndex = uint(12);
const uint aoIndex = uint(16);
const uint animIndex = uint(20);
const float aoValue =  pow( .5, 2.2);
const uint textureIndexMask = uint(0xffff);
const uint mainTexutreIndex =uint(0);
const uint secondaryTextureIndex = uint(0xf + 0x1);
        


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

uniform float dve_voxel_texture_animations[${props.textureLength}];
        

//attributes
in vec3 position;
in vec3 normal;
in float indices;
in float voxelData;
in vec3 textureIndex;
in vec2 uv;
in vec3 colors;
in float faceData;


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
    vAO = aoValue;
} else {
    vAO = 1.;
}

float animVL = float(((animMask << animIndex) & vUID) >> animIndex);

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
int index = int(uint(textureIndex.x) & textureIndexMask);
float animatedIndex = dve_voxel_texture_animations[index];
if(animatedIndex == 0.) {
    vUV.z = float(index);
}
if(animatedIndex != 0.) {
    vUV.z = float(animatedIndex);
}

vec4 frames = vec4(0., 0., 0., 0.);
int texture1Index = int(((textureIndexMask << secondaryTextureIndex) & uint(textureIndex.x)) >> secondaryTextureIndex);
if(dve_voxel_texture_animations[texture1Index] != 0.) {
    frames.x = dve_voxel_texture_animations[texture1Index];
} else {
    frames.x = float(texture1Index);
}

int texture2Index = int(((textureIndexMask << mainTexutreIndex) & uint(textureIndex.y)) >> mainTexutreIndex);
if(dve_voxel_texture_animations[texture2Index] != 0.) {
    frames.y = dve_voxel_texture_animations[texture2Index];
} else {
    frames.y = float(texture2Index);
}

int texture3Index = int(((textureIndexMask << secondaryTextureIndex) & uint(textureIndex.y)) >> secondaryTextureIndex);
if(dve_voxel_texture_animations[texture3Index] != 0.) {
    frames.z = dve_voxel_texture_animations[texture3Index];
} else {
    frames.z = float(texture3Index);
}

int texture4Index = int(((textureIndexMask << mainTexutreIndex) & uint(textureIndex.z)) >> mainTexutreIndex);
if(dve_voxel_texture_animations[texture4Index] != 0.) {
    frames.w = dve_voxel_texture_animations[texture4Index];
} else {
    frames.w = float(texture4Index);
}
vOverlayTextureIndex = frames;

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

  static GetFragment(props: { doAO: boolean }) {
    const shader = /* glsl */ `#version 300 es
precision highp float;
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



out vec4 FragColor;  
void main(void) {

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

  ${props.doAO ? "rgb.rgb *= vAO;" : ""}
  //mix color
  rgb *= vColors;
  //mix light
  rgb.rgb *=  vLight;

  vec3 finalColor = doFog(rgb);

  FragColor = vec4(finalColor.rgb, rgb.a);

  if (FragColor.a < 0.5) { 
    discard;
  }

  
}


`;
    return shader;
  }
}
