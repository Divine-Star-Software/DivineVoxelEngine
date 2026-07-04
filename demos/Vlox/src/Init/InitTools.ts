import { NCS, Node } from "@amodx/ncs";
import { ToolPanelComponent } from "@dvegames/vlox-tools/ToolPanel.component";
import { BabylonContext } from "@dvegames/vlox/Babylon/Babylon.context";
import { RendererContext } from "@dvegames/vlox/Contexts/Renderer.context";
import { DivineVoxelEngineRender } from "@divinevoxel/vlox/Contexts/Render";
import { Scene } from "@babylonjs/core/scene";
//tools
import InitControlsTool from "@dvegames/vlox-tools/Tools/Controls";
import InitWorldTools from "@dvegames/vlox-tools/Tools/World";
import InitBuilderTool from "@dvegames/vlox-tools/Tools/Builder";
import InitSceneTool from "@dvegames/vlox-tools/Tools/Scene";
import { DVEBabylonRenderer } from "@divinevoxel/vlox-babylon/Renderer/DVEBabylonRenderer";
import CreateDisplayIndex from "@divinevoxel/vlox-babylon/Init/CreateDisplayIndex";
import { VoxelData } from "@divinevoxel/vlox/Voxels";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
export default async function InitTools({
  renderer,
  scene,
  voxelData,
}: {
  renderer: DVEBabylonRenderer;
  scene: Scene;
  voxelData: VoxelData[];
}) {

    const light = new HemisphericLight("", new Vector3(0, 0, 0), scene);

  light.specular.set(0, 0, 0);

  await CreateDisplayIndex(voxelData);
  const graph = NCS.createGraph();
  RendererContext.set(graph.root, null, null, {
    dve: DivineVoxelEngineRender.instance,
  });
  BabylonContext.set(graph.root, null, null, {
    renderer,
    scene: scene,
    engine: scene.getEngine() as any,
    utilLayer: null as any,
  });
  InitWorldTools(graph);
  InitControlsTool(graph);
  InitBuilderTool(graph);
  InitSceneTool(graph);

  graph.addNode(Node({}, [ToolPanelComponent()]));

  scene.registerBeforeRender(() => {
    graph.update();
  });
}
