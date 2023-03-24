import { NodeShaders } from "../Shaders/NodeShaders.js";
import { TextureManager } from "../Textures/TextureManager.js";
import type { NodeManager } from "./NodeManager.js";

export function InitDefaultNodes(managere : typeof NodeManager) {
 TextureManager.addTextureType("#dve_node_texture");
 managere.shaders.create([
  NodeShaders.createBasicTextureShader("#dve_node_texture"),
 ]);
 managere.meshes.add([
  {
   boundingBoxMaxSize: [1, 1, 1],
   id: "#dve_node_texture",
   materialId: "#dve_node_texture",
  },
 ]);

 managere.materials.create([
  {
   id: "#dve_node_texture",
   shaderId: "#dve_node_texture",
   textureTypeId: "#dve_node_texture",
   alphaBlending: false,
   alphaTesting: true,
  },
 ]);
}
