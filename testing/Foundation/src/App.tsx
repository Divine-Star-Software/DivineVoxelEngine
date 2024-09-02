import { useDVE } from "./Hooks/useDVE";
import { useState } from "react";
import {
  CubeTexture,
  DefaultRenderingPipeline,
  ImageProcessingConfiguration,
  AxesViewer,
  CreateBox,
  Matrix,
  Mesh,
} from "@babylonjs/core";
import { DVEFBRCore } from "@divinevoxel/babylon-renderer/Defaults/Foundation/DVEFBRCore";
//import "@babylonjs/core/Debug/debugLayer"; // Import the debug layer
//import "@babylonjs/inspector"; // Import the inspector
//import InitDVER from "@divinevoxel/babylon-renderer/Defaults/Foundation/PBR/InitDVEBRPBR";
import InitDVER from "@divinevoxel/babylon-renderer/Defaults/Foundation/Classic/InitDVEBRClassic";
import { NodeMeshTool } from "@divinevoxel/babylon-renderer/Defaults/Foundation/Tools/NodeMeshTool";
import { DataTool } from "@divinevoxel/foundation/Default/Tools/Data/DataTool";
const worldWorker = new Worker(new URL("./Contexts/World/", import.meta.url), {
  type: "module",
});

const nexusWorker = new Worker(new URL("./Contexts/Nexus", import.meta.url), {
  type: "module",
});
const richWorldWorker = new Worker(
  new URL("./Contexts/RichWorld", import.meta.url),
  {
    type: "module",
  }
);

const constructorWorkers: Worker[] = [];
for (let i = 0; i < navigator.hardwareConcurrency - 1; i++) {
  constructorWorkers.push(
    new Worker(new URL("./Contexts/Constructor/", import.meta.url), {
      type: "module",
    })
  );
}

export function App() {
  const [ready, setReady] = useState(false);
  const { DVECanvas, nodes } = useDVE({
    staturate: async (DVER, observers) => {
      observers.ready.subscribe("", async () => {
        const scene = nodes.scene;

        const renderer = await InitDVER({
          textureTypes: [],
          substances: [],
          scene: scene,
          textureData: [
            {
              type: "#dve_solid",
              id: "dve_debug_box",
              frames: 0,
              variations: {
                top: { frames: 0 },
                bottom: { frames: 0 },
                north: { frames: 0 },
                south: { frames: 0 },
                east: { frames: 0 },
                west: { frames: 0 },
              },
            },
            {
              type: "#dve_solid",
              id: "dve_light_debug",
              frames: 0,
              variations: {
                "light-level-0": { frames: 0 },
                "light-level-1": { frames: 0 },
                "light-level-2": { frames: 0 },
                "light-level-3": { frames: 0 },
                "light-level-4": { frames: 0 },
                "light-level-5": { frames: 0 },
                "light-level-6": { frames: 0 },
                "light-level-7": { frames: 0 },
                "light-level-8": { frames: 0 },
                "light-level-9": { frames: 0 },
                "light-level-10": { frames: 0 },
                "light-level-11": { frames: 0 },
                "light-level-12": { frames: 0 },
                "light-level-13": { frames: 0 },
                "light-level-14": { frames: 0 },
                "light-level-15": { frames: 0 },
              },
            },
            {
              type: "#dve_solid",
              id: "dve_dream_stone",
              frames: 0,
              variations: {
                "grassy-top": { frames: 0 },
                "grassy-side": { frames: 0 },
              },
            },
            {
              type: "#dve_solid",
              id: "dve_dread_stone",
              frames: 0,
              variations: {
                "grassy-top": { frames: 0 },
                "grassy-side": { frames: 0 },
              },
            },
            {
              type: "#dve_solid",
              id: "dve_data_holder",
              frames: 0,
              variations: {
                front: { frames: 0 },
              },
            },
            {
              type: "#dve_flora",
              id: "dve_dream_grass_block",
              frames: 0,
              variations: {
                "grassy-top": { frames: 0 },
              },
            },
            {
              type: "#dve_solid",
              id: "dve_dream_stone_pillar",
              frames: 0,
              variations: {
                "side-bottom": { frames: 0 },
                "side-top": { frames: 0 },
                top: { frames: 0 },
              },
            },
            {
              type: "#dve_solid",
              id: "dve_dread_stone_pillar",
              frames: 0,
              variations: {
                "side-bottom": { frames: 0 },
                "side-top": { frames: 0 },
                top: { frames: 0 },
              },
            },
            {
              type: "#dve_glow",
              id: "dve_dream_lamp",
              frames: 0,
            },
            {
              type: "#dve_glow",
              id: "dve_dread_lamp",
              frames: 0,
            },
            {
              type: "#dve_solid",
              id: "dve_dream_log",
              frames: 0,
            },
            {
              type: "#dve_flora",
              id: "dve_dream_grass",
              frames: 0,
            },
            {
              type: "#dve_solid",
              id: "dve_dread_grass",
              frames: 0,
            },
            {
              type: "#dve_flora",
              id: "dve_dream_vine",
              frames: 0,
            },
            {
              type: "#dve_flora",
              id: "dve_dream_leaves",
              frames: 0,
            },
            {
              type: "#dve_liquid",
              id: "dve_liquid_dream_ether",
              frames: 0,
              variations: {
                still: {
                  frames: 6,
                  animKeys: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2],
                  globalFrameTime: 2,
                },
              },
            },
            {
              type: "#dve_liquid",
              id: "dve_liquid_dread_ether",
              frames: 0,
              variations: {
                still: {
                  frames: 6,
                  animKeys: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2],
                  globalFrameTime: 2,
                },
              },
            },
            {
              type: "#dve_liquid",
              id: "foam",
              frames: 0,
              variations: {
                top: { frames: 0 },
                "corner-top-right": { frames: 0 },
                "corner-top-left": { frames: 0 },
                "corner-top-left-top-right": { frames: 0 },
                bottom: { frames: 0 },
                "corner-bottom-right": { frames: 0 },
                "corner-bottom-left": { frames: 0 },
                "corner-bottom-left-bottom-right": { frames: 0 },
                right: { frames: 0 },
                left: { frames: 0 },
              },

              segment: "overlay",
            },
          ],
        });
        /* 
        scene.debugLayer.show({
          showExplorer: true,
          showInspector: true,
          embedMode: false,
        });
    */

        /*    const view = new AxesViewer(scene);
        view.xAxis.position.y += 80;
        view.yAxis.position.y += 80;
        view.zAxis.position.y += 80; */

        //  postprocess.exposure = 1.5;

        const core = new DVEFBRCore({
          renderer,
          richWorldWorker,
          nexusWorker,
        });

        nodes.core = core;
        await DVER.init({
          core: nodes.core,
          renderer,
          worldWorker,
          constructorWorkers,
        });

        setReady(true);
        nodes.sceneTool.options.doEffects(true);
        nodes.sceneTool.levels

          .setSun(1)
          .levels.setBase(0)
          .fog.setColor(0.1)
          .fog.setMode("volumetric")
          .fog.setDensity(0.0);
        (window as any).nodes = nodes;

        DVER.threads.world.runTasks("start-world", []);
        const axes = new AxesViewer(scene);
        const parent = new Mesh("", scene);
        parent.scaling.set(20, 20, 20);
        axes.xAxis.parent = parent;
        axes.yAxis.parent = parent;
        axes.zAxis.parent = parent;

        parent.renderingGroupId = -1;
        const dataTool = new DataTool();
        const nodeMeshTool = new NodeMeshTool();

        console.log("all done ")
      });
    },
    useSkyBox: true,
    textureAssetPath: "assets/textures",
  });

  return (
    <>
      <div className="render-canvas-container">{DVECanvas}</div>
    </>
  );
}
