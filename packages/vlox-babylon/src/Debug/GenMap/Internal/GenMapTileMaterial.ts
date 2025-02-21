import { Effect, ShaderMaterial, Scene } from "@babylonjs/core";
export class GenMapTileMaterial {
  static Code = {
    Vertex: {
      GLSL: /* glsl  */ `
#version 300 es
precision highp float;
in vec3 position;
in vec2 uv;
uniform mat4 worldViewProjection;
uniform mat4 viewProjection;
#ifdef INSTANCES
//matricies
in vec4 world0;
in vec4 world1;
in vec4 world2;
in vec4 world3;
//custom attributes
in vec4 tileColor;
out vec4 vColor;
out vec2 vUV;
#endif
void main() {
#ifdef INSTANCES
    mat4 finalWorld = mat4(world0, world1, world2, world3); 
    vColor = tileColor;
    vUV = uv;
    gl_Position = viewProjection * finalWorld * vec4(position, 1.0);  
#endif      
#ifndef INSTANCES
    vec4 p = vec4(position, 1.);
    gl_Position = worldViewProjection * p;
#endif
}      
      `,
    },
    Fragment: {
      GLSL: /* glsl  */ `
#version 300 es
precision highp float;
in vec4 vColor;
in vec2 vUV;
out vec4 FragColor;

const float borderWidth = .4;
const vec4 borderColor = vec4(1.);

void main() {
    float borderSize = borderWidth / 2.0;
    vec2 uv = (vUV + vec2(.49,.49)) * 2.0 - 1.0;
    vec2 innerUV = abs(uv) - borderSize;
    float borderFactor = smoothstep(0.0, borderSize, min(innerUV.x, innerUV.y));
    
    vec4 innerColor = vColor;
    vec4 outerColor = borderColor;
    
    FragColor = mix(outerColor, innerColor, borderFactor);
}
`,
    },
  };

  static create(scene: Scene) {
    const shaderName = `worldTiles`;
    Effect.ShadersStore[`${shaderName}VertexShader`] = this.Code.Vertex.GLSL;

    Effect.ShadersStore[`${shaderName}FragmentShader`] =
      this.Code.Fragment.GLSL;

    const shaderMaterial = new ShaderMaterial(shaderName, scene, shaderName, {
      uniforms: ["viewProjection"],
      attributes: ["position", "world0", "world1", "world2", "world3", "tileColor","uv"],
    });

  //  shaderMaterial.wireframe = true;
    return shaderMaterial;
  }
}
