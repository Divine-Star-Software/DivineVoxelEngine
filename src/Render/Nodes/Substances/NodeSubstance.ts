import type { NodeSubstanceData } from "../types/RenderNode.types";
import { NodeManager } from "../NodeManager.js";

export class NodeSubstance {
 constructor(public data: NodeSubstanceData) {}

 build() {
  NodeManager.materials.create([
   {
    id: this.data.id,
    ...this.data.material,
    shaderId: this.data.shader.id,
    textureTypeId: this.data.texture.id,
   },
  ]);
  NodeManager.shaders.create([this.data.shader]);
  NodeManager.meshes.add([
   {
    id: this.data.id,
    ...this.data.mesh,
   },
  ]);
 }
}
