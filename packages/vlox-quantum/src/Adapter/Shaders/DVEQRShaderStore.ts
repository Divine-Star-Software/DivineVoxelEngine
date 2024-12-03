import { URIShaderStore } from "@amodx/uri/Shaders/URIShaderStore.js";
import { URIShaderTypes } from "@amodx/uri/Constants/URIShaderTypes";
class Effect {
  static ShadersStore: Record<string, string> = {};
}
export class DVEQRShaderStore extends URIShaderStore {
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
