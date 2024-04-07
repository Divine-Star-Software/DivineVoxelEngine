import { Effect, ShaderMaterial, Scene } from "@babylonjs/core";
export class WorldMapTileMaterial {
  static Code = {
    Vertex: {
      GLSL: /* glsl  */ `
precision highp float;
attribute vec3 position;
uniform mat4 worldViewProjection;
uniform mat4 viewProjection;
#ifdef INSTANCES
//matricies
in vec4 world0;
in vec4 world1;
in vec4 world2;
in vec4 world3;
//custom attributes
#endif
void main() {
#ifdef INSTANCES
    mat4 finalWorld = mat4(world0, world1, world2, world3); 
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
precision highp float;

void main() {
gl_FragColor = vec4(1.,0.,0.,1.);
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
    });

    shaderMaterial.wireframe = true;
    return shaderMaterial;
  }
}
