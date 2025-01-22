import { SharedShaders } from "./SharedShaders";

export class SkyboxShader {
  static GetVertex() {
    return /* glsl */ `#version 300 es
precision highp float;

//uniforms
uniform float doEffects;
uniform vec4 fogOptions;
uniform vec4 vFogInfos;
uniform vec3 vFogColor;
uniform float time;
uniform vec3 cameraPosition;
uniform vec3 cameraDirection;

uniform mat4 world;
uniform mat4 viewProjection;

//attributes
in vec3 position;
in float indices;
in vec3 normal;


//varying
out vec3 worldPOS;
out float vDistance;

void main(void) {


    vec4 worldPOSTemp =  world * vec4(position, 1.0);
    worldPOS = vec3(worldPOSTemp.x,worldPOSTemp.y,worldPOSTemp.z);
    vDistance = distance(cameraPosition , worldPOS );

    vec4 worldPosition = world * vec4(position, 1.0);
     gl_Position = viewProjection * world * vec4(position, 1.0); 


} 
    `;
  }

  static GetFragment() {
    return /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2DArray;


//uniforms
uniform float doEffects;
uniform vec4 fogOptions;
uniform vec4 vFogInfos;
uniform vec3 vFogColor;
uniform float time;
uniform vec3 cameraPosition;
uniform vec3 cameraDirection;


//varying
in vec3 worldPOS;
in float vDistance;


//functions
${SharedShaders.FBMNoiseFunctions}

${SharedShaders.FogFragmentFunctions}




out vec4 FragColor;  
void main(void) {

    vec3 c = vFogColor.rgb;
    c.r -= .2;
    c.g -= .2;
    c.b -= .2;
    vec4 skyboxColor = vec4(c.rgb,1);
    vec3 finalColor = doFog(skyboxColor);
    FragColor = vec4(finalColor.rgb,1);

} 
    `;
  }
}
