import { useDVE } from "./Hooks/useDVE";
import { useState } from "react";
import {
  CubeTexture,
  DefaultRenderingPipeline,
  ImageProcessingConfiguration,
  AxesViewer,
  CreateBox,
  Matrix,
} from "@babylonjs/core";
import { DVEFBRCore } from "@divinevoxel/babylon-renderer/Defaults/Foundation/DVEFBRCore";
//import "@babylonjs/core/Debug/debugLayer"; // Import the debug layer
//import "@babylonjs/inspector"; // Import the inspector
import InitDVER from "@divinevoxel/babylon-renderer/Defaults/Foundation/PBR/InitDVEBRPBR";
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
        console.log("start the initilzation");
        nodes.core = core;
        await DVER.init({
          core: nodes.core,
          renderer,
          worldWorker,
          constructorWorkers,
        });
        console.log("end initilization");

        setReady(true);
        /*    nodes.sceneTool.levels
          .setSun(0.5)
          .levels.setBase(0)
          .fog.setColor(0.1)
          .fog.setMode("volumetric")
          .fog.setDensity(0.0); */
        (window as any).nodes = nodes;

        DVER.threads.world.runTasks("start-world", []);
        const viwer = new AxesViewer(scene,3);
        const dataTool = new DataTool();
        const nodeMeshTool = new NodeMeshTool();
        const voxelEntityTool = await nodeMeshTool.voxel.buildEntityToolAsync(
          [0, 0, 0],
          nodeMeshTool.voxel.dataTool
            .setStringId("dve_dream_grass")
            .setLevelState(1)
            .setLevel(7)
            .getRaw()
        );
        console.log("got voxel entity tool", voxelEntityTool);

        if (voxelEntityTool) {
          console.log(voxelEntityTool);
          voxelEntityTool.setInstanceAmount(1);

          /* 
          let i = 1;
          while(i--) {
            const inst = voxelEntityTool.getInstance();
            console.log("got voxel entity instance", inst);

            if (inst)  {
              inst.position.y = 60 + Math.abs(i);
            }
          }
          console.log(voxelEntityTool._matrixArray.matricies)
          voxelEntityTool.update(); */
          setInterval(()=>{
            console.log(nodes.camera.globalPosition.toString())
          },2_000)

          const box = CreateBox("", {}, scene);
          box.position.set(0, 0, 0);
          box.thinInstanceAdd(Matrix.Translation(-5, 60, 0));
          box.thinInstanceAdd(Matrix.Translation(-10, 60, 0));

          voxelEntityTool._instances[0].position.set(0, 60, 0);
          voxelEntityTool._instances[0].scale.set(1, 1, 1);
          voxelEntityTool.update();

          /*      console.log(voxelEntityTool._matrixArray.matricies.slice())
          voxelEntityTool.mesh.thinInstanceSetBuffer(
            "matrix",
            voxelEntityTool._matrixArray.matricies,
            16
          );
          console.log(Matrix.Translation(0, 60, 0).toArray()); */
        }
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
