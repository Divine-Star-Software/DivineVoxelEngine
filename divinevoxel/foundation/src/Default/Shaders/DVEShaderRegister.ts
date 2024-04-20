import { URIShaderBuilder } from "@divinestar/uri/Shaders/URIShaderBuilder.js";
import { URIShader } from "@divinestar/uri/Shaders/Classes/URIShader.js";

import { UtilMap } from "../../Util/UtilMap.js";

export class DVEShaderRegister {
  shaders = new UtilMap<string, URIShader>();

  create(shaders: URIShader[]) {
    for (const shader of shaders) {
      this.shaders.add([[shader.id, shader]]);
    }
  }
  get(id: string) {
    return this.shaders.get(id);
  }
  getBulder() {
    return URIShaderBuilder;
  }
}
