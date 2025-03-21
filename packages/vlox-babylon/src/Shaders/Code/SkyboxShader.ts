import { SceneUBO } from "../../Scene/SceneUBO";
import { FogShaders } from "./Shared/FogShader";
import { NoiseShaders } from "./Shared/NoiseShader";
import { SkyShaders } from "./Shared/SkyShader";

export class SkyboxShader {
  static GetVertex() {
    return /* glsl */ `#version 300 es
precision highp float;

${SceneUBO.Define}
//uniforms
uniform vec3 cameraPosition;
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


${SceneUBO.Define}
//uniforms
uniform vec3 cameraPosition;

//varying
in vec3 worldPOS;
in float vDistance;


//functions

${SkyShaders.Functions}
${NoiseShaders.FBMNoiseFunctions}
${FogShaders.Functions}

out vec4 FragColor;  
void main(void) {
  vec3 fogColor = getFogColor();
  vec4 skyColor = vec4(getSkyColor(fogColor),1.);
  FragColor = blendFog(fogColor,skyColor);

} 
    `;
  }
}
