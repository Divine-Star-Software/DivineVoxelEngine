import { RenderManager } from "../Render/RenderManager.js";
import { InitDefaultNodes } from "./InitDefaultNodes.js";
import { NodeMaterialManager } from "./Materials/NodeMaterialManager.js";
import { NodeMeshManager } from "./Meshes/NodeMeshManager.js";
import { NodeShaderManager } from "./Shaders/NodeShaderManager.js";
import { TextureManager } from "./Textures/TextureManager.js";

export const NodeManager = {
 shaders: NodeShaderManager,
 meshes: NodeMeshManager,
 materials: NodeMaterialManager,
 textures : TextureManager,
 $INIT() {
  const scene = RenderManager.scene;
  if (!scene) return;
  this.materials.materials._map.forEach((_) => _.createMaterial(scene));
 },
};
InitDefaultNodes(NodeManager);

