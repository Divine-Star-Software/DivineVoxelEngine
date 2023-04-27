import { RenderManager } from "../Render/RenderManager.js";
import { NodeMaterialManager } from "./Materials/NodeMaterialManager.js";
import { NodeMeshManager } from "./Meshes/NodeMeshManager.js";
import { NodeShaderManager } from "./Shaders/NodeShaderManager.js";
import { InitDefaultNodes } from "./InitDefaultNodes.js";
export const NodeManager = {
 shaders: NodeShaderManager,
 meshes: NodeMeshManager,
 materials: NodeMaterialManager,
 $INIT() {
  const scene = RenderManager.scene;
  if (!scene) return;
  this.materials.materials._map.forEach((_) => _.createMaterial(scene));
 },
};
InitDefaultNodes(NodeManager);
