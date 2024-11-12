import { URIShaderBuilder } from "@amodx/uri/Shaders/URIShaderBuilder.js";
import { URIShader } from "@amodx/uri/Shaders/Classes/URIShader.js";

export class DVEShaderRegister {
  shaders = new Map<string, URIShader>();

  create(shaders: URIShader[]) {
    for (const shader of shaders) {
      this.shaders.set(shader.id, shader);
    }
  }
  get(id: string) {
    return this.shaders.get(id);
  }
  getBulder() {
    return URIShaderBuilder;
  }
}
