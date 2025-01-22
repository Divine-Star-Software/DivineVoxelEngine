import { Effect } from "@babylonjs/core/Materials/effect.js";
type shaderTypes = "vertex" | "frag";
export class DVEBRShaderStore {
  getShader(id: string, type: shaderTypes): string | null {
    const code =
      Effect.ShadersStore[
        `${id}${type == "vertex" ? "VertexShader" : "FragmentShader"}`
      ];
    if (!code) return null;
    return code;
  }
  storeShader(id: string, type: shaderTypes, shader: string): void {
    Effect.ShadersStore[
      `${id}${type == "vertex" ? "VertexShader" : "FragmentShader"}`
    ] = shader;
  }
  static getShader(id: string, type: shaderTypes): string | null {
    const code =
      Effect.ShadersStore[
        `${id}${type == "vertex" ? "VertexShader" : "FragmentShader"}`
      ];
    if (!code) return null;
    return code;
  }
  static storeShader(id: string, type: shaderTypes, shader: string): void {
    Effect.ShadersStore[
      `${id}${type == "vertex" ? "VertexShader" : "FragmentShader"}`
    ] = shader;
  }
  static _shaderData = new Map<
    string,
    { uniforms: string[]; attributes: string[] }
  >();

  static setShaderData(id: string, uniforms: string[], attributes: string[]) {
    this._shaderData.set(id, { uniforms, attributes });
  }
  static getShaderData(id: string) {
    return this._shaderData.get(id);
  }
}
