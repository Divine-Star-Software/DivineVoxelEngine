import { URIShaderTypes } from "../Constants/URIShaderTypes.js";
export abstract class URIShaderStore {
  abstract getShader(id: string, type: URIShaderTypes): string | null;
  abstract storeShader(id: string, type: URIShaderTypes, shader: string): void;
}
