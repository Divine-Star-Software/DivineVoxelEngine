import { URIShaderStore } from "@divinestar/uri/Shaders/URIShaderStore.js";
import { Scene } from "@babylonjs/core/scene";
import { Effect } from "@babylonjs/core/Materials/effect.js";
import { URIShaderTypes } from "@divinestar/uri/Constants/URIShaderTypes";
export class DVEBRShaderStore extends URIShaderStore {
  getShader(id: string, type: URIShaderTypes): string | null {
    const code =
      Effect.ShadersStore[
        `${id}${
          type == URIShaderTypes.Vertex ? "VertexShader" : "FragmentShader"
        }`
      ];
    if (!code) return null;
    return code;
  }
  storeShader(id: string, type: URIShaderTypes, shader: string): void {
    Effect.ShadersStore[
      `${id}${
        type == URIShaderTypes.Vertex ? "VertexShader" : "FragmentShader"
      }`
    ] = shader;
  }
}
