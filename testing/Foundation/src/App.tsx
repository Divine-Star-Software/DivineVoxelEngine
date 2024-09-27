import { useEffect, useRef, useState } from "react";
import InitDVErenderer from "@divinevoxel/babylon-renderer/Defaults/Foundation/Classic/InitDVEBRClassic";
import { DVEFBRCore } from "@divinevoxel/babylon-renderer/Defaults/Foundation/DVEFBRCore";
import {
  CreateSphere,
  Engine,
  HemisphericLight,
  Scene,
  Vector3,
  FreeCamera,
  AxesViewer,
  CreateGreasedLine,
  Color3,
  StandardMaterial,
  Color4,
} from "@babylonjs/core";
import { DivineVoxelEngineRender } from "@divinevoxel/core/Contexts/Render";
import { Textures } from "Data/TextureData";
import { SceneTool } from "@divinevoxel/babylon-renderer/Defaults/Foundation/Tools/SceneTool";
import { RenderNodes } from "Classes";
import { InitVoxelModels } from "@divinevoxel/foundation/Default/VoxelModels/InitVoxelModels";
import { DVEVoxelData } from "Data/VoxelData";

import { GradientCheckSets } from "@divinevoxel/foundation/Default/Mesher/Calc/CalcConstants";
import { Vec3Array, Vector3Like } from "@amodx/math";
import { QuadVec3ArrayVertexData } from "@amodx/meshing/Classes/QuadVertexData";
import {
  VoxelFaceDirections,
  VoxelFaces,
  VoxelFacesArray,
} from "@divinevoxel/core/Math";
import { QuadVerticies } from "@amodx/meshing/Geometry.types";
let ran = false;

const quads = ((): [Vec3Array, Vec3Array, Vec3Array, Vec3Array][] => {
  const start = Vector3Like.Create();
  const end = Vector3Like.Create(1, 1, 1);

  return [
    //up
    [
      [end.x, end.y, end.z],
      [start.x, end.y, end.z],
      [start.x, end.y, start.z],
      [end.x, end.y, start.z],
    ],
    //down
    [
      [start.x, start.y, end.z],
      [end.x, start.y, end.z],
      [end.x, start.y, start.z],
      [start.x, start.y, start.z],
    ],
    //north
    [
      [start.x, end.y, end.z],
      [end.x, end.y, end.z],
      [end.x, start.y, end.z],
      [start.x, start.y, end.z],
    ],
    //south
    [
      [end.x, end.y, start.z],
      [start.x, end.y, start.z],
      [start.x, start.y, start.z],
      [end.x, start.y, start.z],
    ],
    //east
    [
      [end.x, end.y, end.z],
      [end.x, end.y, start.z],
      [end.x, start.y, start.z],
      [end.x, start.y, end.z],
    ],
    //east
    [
      [start.x, end.y, start.z],
      [start.x, end.y, end.z],
      [start.x, start.y, end.z],
      [start.x, start.y, start.z],
    ],
  ];
})();
const faceColors: Record<VoxelFaces, Color3> = {
  [VoxelFaces.Up]: new Color3(1, 0, 0),
  [VoxelFaces.Down]: new Color3(0, 1, 0),
  [VoxelFaces.North]: new Color3(0, 0, 1),
  [VoxelFaces.South]: new Color3(1, 0, 1),
  [VoxelFaces.East]: new Color3(1, 1, 0),
  [VoxelFaces.West]: new Color3(0, 1, 1),
};

const vertexColors: Record<QuadVerticies, Color3> = {
  [QuadVerticies.TopRight]: new Color3(1, 0, 0),
  [QuadVerticies.TopLeft]: new Color3(0, 1, 0),
  [QuadVerticies.BottomLeft]: new Color3(0, 0, 1),
  [QuadVerticies.BottomRight]: new Color3(1, 0, 1),
};

const getLines = (face: VoxelFaces) => {
  const normal = VoxelFaceDirections[face];
  CreateGreasedLine(
    "",
    {
      points: quads[face].map(
        (_) => new Vector3(...Vector3Like.AddArray(_, normal))
      ),
    },
    { color: faceColors[face] }
  );

  const set = GradientCheckSets[face];
  for (let v = 0 as QuadVerticies; v < 4; v++) {
    const sphere = CreateSphere("", { diameter: 0.1 });
    const mat = new StandardMaterial("");
    mat.diffuseColor = vertexColors[v];
    sphere.material = mat;

    const point = Vector3Like.AddArray(quads[face][v], normal);
    sphere.position.set(
      ...Vector3Like.AddArray(
        quads[face][v],
        Vector3Like.MultiplyScalarArray(normal, 0.1)
      )
    );
    for (let i = 0; i < 9; i += 3) {
      const x = set[v][i] + point[0] + normal[0];
      const y = set[v][i + 1] + point[1] + normal[1];
      const z = set[v][i + 2] + point[2] + normal[2];

      CreateGreasedLine(
        "",
        {
          points: [new Vector3(...point), new Vector3(x, y, z)],
        },
        { color: faceColors[face] }
      );
    }
  }
};

const gradientTest = () => {
  for (const face of VoxelFacesArray) {
    getLines(face);
  }
};

export function App() {
  const [gameReady, setGameReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    (async () => {
      if (ran) return;
      if (!canvasRef.current) return;
      ran = true;

      const worldWorker = new Worker(
        new URL("./Contexts/World/", import.meta.url),
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

      const canvas = canvasRef.current;
      const DVER = new DivineVoxelEngineRender();
      let antialias = false;
      const engine = new Engine(canvas, antialias);
      engine.doNotHandleContextLost = true;
      engine.enableOfflineSupport = false;

      const nodes = new RenderNodes();
      engine.setSize(window.innerWidth, window.innerHeight);
      let dirty = false;
      window.addEventListener("resize", function () {
        engine.resize();
        dirty = true;
      });

      const canvasResized = new ResizeObserver(() => {
        engine.resize();
        dirty = true;
      });
      canvasResized.observe(canvas);
      const scene = new Scene(engine);
      scene.clearColor.setAll(0);
      const light = new HemisphericLight("", new Vector3(0, 0, 0), scene);

      light.specular.set(0, 0, 0);

      console.log("1");
      const renderer = await InitDVErenderer({
        textureTypes: [],
        substances: [],
        scene: scene,
        textureData: Textures,
      });

    //  gradientTest();
      const core = new DVEFBRCore({
        renderer,
      });

      await DVER.init({
        core,
        renderer,
        worldWorker,
        constructorWorkers,
      });

      /*       const skybox = CreateSphere("skyBox", { diameter: 400.0 }, scene);
      skybox.infiniteDistance = true;
      const skyboxMat = renderer.nodes.materials.get("#dve_skybox");
      if (skyboxMat) {
        skybox.material = skyboxMat._material;
        skybox.material!.backFaceCulling = false;
      } */
      const sceneTool = new SceneTool();
      sceneTool.fog.setDensity(0.00001);
      sceneTool.fog.setColor(1, 1, 1);
      sceneTool.options.doSun(true);
      sceneTool.options.doAO(true);
      sceneTool.options.doRGB(true);
      sceneTool.levels.setSun(0.9);
      sceneTool.levels.setBase(0.01);

      const viwer = new AxesViewer(scene);
      viwer.xAxis.position.z -= 2;
      viwer.yAxis.position.z -= 2;
      viwer.zAxis.position.z -= 2;


      const camera = new FreeCamera("", new Vector3(0, 10, 0));

      camera.setTarget(new Vector3(0, 0, 0));
      InitVoxelModels({
        world: DVER.threads.world,
        constructors: DVER.threads.construcotrs,
        voxels: DVEVoxelData,
      });
      camera.speed = 10;
      camera.maxZ = 1000;
      camera.fov = 1.8;
      camera.attachControl(canvas, true);

      scene.activeCamera = camera;
      scene.collisionsEnabled = false;
      camera.inertia = 0.2;
      nodes.camera = camera as any;
      //  nodes.camera = camera;
      nodes.scene = scene;
      nodes.canvas = canvas;
      nodes.engine = engine;
      nodes.core = core;
      nodes.sceneTool = sceneTool;

      engine.runRenderLoop(() => {
        scene.render();
      });

      setGameReady(true);

      /*    setTimeout(() => {
        Inspector.Show(scene, {});
      }, 1_000);
 */
      //  await InitRenderPlayer(DVER, nodes);

      DVER.threads.world.runTasks("start-world", []);
    })();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <canvas id="render-canvas" ref={canvasRef}></canvas>
    </div>
  );
}
