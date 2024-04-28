import { DivineVoxelEngineRender } from "@divinevoxel/core/Contexts/Render";

import { type Camera } from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene.js";
import { Engine } from "@babylonjs/core/Engines/engine.js";

import { SceneTool } from "@divinevoxel/babylon-renderer/Defaults/Foundation/Tools/SceneTool";
import { DVEFBRCore } from "@divinevoxel/babylon-renderer/Defaults/Foundation/DVEFBRCore";

export class RenderNodes {
  scene: Scene;
  camera: Camera;
  engine: Engine;
  canvas: HTMLCanvasElement;
  sceneTool: SceneTool;
  core: DVEFBRCore;
  DVER: DivineVoxelEngineRender;
}
