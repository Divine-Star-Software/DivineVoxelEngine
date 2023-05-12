//types
import type { Scene, Vector4 } from "@babylonjs/core";

//objects
import { FOManager } from "./FloatingOrigin/FoManager.js";

import { MeshRegister } from "./MeshRegister.js";
import { MeshManager } from "./MeshManager.js";
import { MeshCuller } from "./MeshCuller.js";
import { NodeShaders } from "../Nodes/Shaders/NodeShaders.js";
import { SceneTool } from "../Tools/SceneTool.js";

export const RenderManager = {
 meshRegister: MeshRegister,
 meshManager: MeshManager,
 meshCuller: MeshCuller,

 fo: FOManager,

 shaders: NodeShaders,
 sceneTool: new SceneTool(),

 scene: <Scene | null>null,

 $INIT(scene: Scene) {
  this.scene = scene;

  this.meshManager.$INIT(scene);
  this.meshCuller.$INIT(scene);
 },

 getScene() {
  return this.scene;
 },
};
