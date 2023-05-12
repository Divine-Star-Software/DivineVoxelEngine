import { DivineShader, DivineShaderBuilder } from "divine-shaders";
import { UtilMap } from "../../../Global/Util/UtilMap.js";

export const NodeShaderManager = {
 shaders: new UtilMap<string, DivineShader>(),

 create(shaders: DivineShader[]) {
  for (const shader of shaders) {
   this.shaders.add([[shader.id, shader]]);
  }
 },
 get(id : string) {
    return this.shaders.get(id);
 },
 getBulder() {
   return DivineShaderBuilder
 }
};
