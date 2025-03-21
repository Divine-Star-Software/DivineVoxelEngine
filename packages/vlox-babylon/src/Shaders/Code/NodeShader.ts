import { FogShaders } from "./Shared/FogShader";
import { NoiseShaders } from "./Shared/NoiseShader";

export class NodeShader {
  static GetVertex(props: {textureLength: number}) {
    return /* glsl */ `#version 300 es
precision highp float;

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
uniform vec3 cameraDirection;
uniform vec3 cameraPosition;
uniform float lightGradient[16];
uniform float dve_node_texture_animations[${props.textureLength}];
       


//attributes
in vec3 position;
in vec3 normal;
in float indices;
in vec3 uv;
in vec4 textureIndex;


//varying
out vec3 vNormal;
out vec3 worldPOS;
out float vDistance;
out float vBrightness;
out vec3 vUV;
out vec4 vOverlayTextureIndex;


#ifdef INSTANCES
//matricies
in vec4 world0;
in vec4 world1;
in vec4 world2;
in vec4 world3;
//custom attributes
#endif


void main(void) {

    vNormal = normal;

    vec4 worldPOSTemp = world * vec4(position, 1.0);
    worldPOS = vec3(worldPOSTemp.x, worldPOSTemp.y, worldPOSTemp.z);
    vDistance = distance(cameraPosition, worldPOS);

    vBrightness = 1.0;
    if(normal.y > 0.0) {
        vBrightness += .5;
    } else if(normal.y < 0.0) {
        vBrightness -= .5;
    }


    vUV.x = uv.x;
    vUV.y = uv.y;
    int index = int(uint(textureIndex.x) & textureIndexMask);
    float animatedIndex = dve_node_texture_animations[index];
    if(animatedIndex == 0.) {
        vUV.z = float(index);
    }
    if(animatedIndex != 0.) {
        vUV.z = float(animatedIndex);
    }

    vec4 frames = vec4(0., 0., 0., 0.);
    int texture1Index = int(((textureIndexMask << secondaryTextureIndex) & uint(textureIndex.x)) >> secondaryTextureIndex);
    if(dve_node_texture_animations[texture1Index] != 0.) {
        frames.x = dve_node_texture_animations[texture1Index];
    } else {
        frames.x = float(texture1Index);
    }

    int texture2Index = int(((textureIndexMask << mainTexutreIndex) & uint(textureIndex.y)) >> mainTexutreIndex);
    if(dve_node_texture_animations[texture2Index] != 0.) {
        frames.y = dve_node_texture_animations[texture2Index];
    } else {
        frames.y = float(texture2Index);
    }

    int texture3Index = int(((textureIndexMask << secondaryTextureIndex) & uint(textureIndex.y)) >> secondaryTextureIndex);
    if(dve_node_texture_animations[texture3Index] != 0.) {
        frames.z = dve_node_texture_animations[texture3Index];
    } else {
        frames.z = float(texture3Index);
    }

    int texture4Index = int(((textureIndexMask << mainTexutreIndex) & uint(textureIndex.z)) >> mainTexutreIndex);
    if(dve_node_texture_animations[texture4Index] != 0.) {
        frames.w = dve_node_texture_animations[texture4Index];
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

  static GetFragment() {
    return /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2DArray;


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
uniform vec3 cameraDirection;
uniform vec3 cameraPosition;
uniform sampler2DArray dve_node;


//varying
in vec3 vNormal;
in vec3 worldPOS;
in float vDistance;
in float vBrightness;


${NoiseShaders.FBMNoiseFunctions}
${FogShaders.Functions}


  
  out vec4 FragColor;  
  void main(void) {
  
    vec4 rgb = texture(dve_node,vec3(vUV.xy,vUV.z));
    
    /*     
    vec4 oRGB1 =  texture(dve_node, vec3(vUV.xy, vOverlayTextureIndex.x));
    vec4 oRGB2 =  texture(dve_node, vec3(vUV.xy, vOverlayTextureIndex.y));
    vec4 oRGB3 =  texture(dve_node, vec3(vUV.xy, vOverlayTextureIndex.z));
    vec4 oRGB4 =  texture(dve_node, vec3(vUV.xy, vOverlayTextureIndex.w));
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
  vec3 finalColor = doFog(rgb);
  FragColor = vec4(finalColor.rgb * vBrightness,rgb.a);
  

}
        `;
  }
}
