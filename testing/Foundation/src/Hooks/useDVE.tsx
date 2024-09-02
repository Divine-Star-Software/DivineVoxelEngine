import { useEffect, useRef } from "react";
import { DivineVoxelEngineRender } from "@divinevoxel/core/Contexts/Render";
import { CreateBox, Scene } from "@babylonjs/core/";
import { Engine } from "@babylonjs/core/Engines/engine.js";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { Observable } from "@amodx/core/Observers/Observable";
import { RenderNodes } from "../Classes/RednerNodes";
import { SceneTool } from "@divinevoxel/babylon-renderer/Defaults/Foundation/Tools/SceneTool";

const DVEObservers = {
  ready: new Observable<DivineVoxelEngineRender>(),
};

type UseDVEProps = {
  textureAssetPath?: "assets/textures";
//  textures: TextureData[];
 // init: DVERInitData;
  useFloatingOrigin?: boolean;
  useSkyBox?: boolean;
  staturate: (
    DVE: DivineVoxelEngineRender,
    observers: typeof DVEObservers
  ) => void;
};
export function useDVE(props: UseDVEProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef(new RenderNodes());

  useEffect(() => {
    (async () => {
      if (!canvasRef.current) return;
      if (DivineVoxelEngineRender.initialized) return;

      const DVER = new DivineVoxelEngineRender();
      props.staturate(DVER, DVEObservers);

/*       if (props.textureAssetPath) {
        DVER.nodes.textures.defineDefaultTexturePath(props.textureAssetPath);
      }

      DVER.nodes.textures.registerTexture(props.textures);
 */
      const nodes = nodesRef.current;

      const canvas = canvasRef.current;
      nodes.canvas = canvas;

      InitScene(canvas, nodes);


  
      nodes.DVER = DVER;
/*       if (props.useSkyBox) {
        const skybox = CreateBox("skyBox", { size: 800.0 }, nodes.scene);
        skybox.infiniteDistance = true;
        const bmat = DVER.nodes.materials.get("#dve_skybox");
        if (bmat) {
          //@ts-ignore
          skybox.material = bmat.getMaterial();
        }
      } */

      if (props.useFloatingOrigin) {
        const oriign = new Vector3();
        nodes.scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
          oriign.x = nodes.camera.position.x;
          oriign.y = nodes.camera.position.y;
          oriign.z = nodes.camera.position.z;
        });
      }

     nodes.sceneTool = new SceneTool();

      DVEObservers.ready.notify(DVER);
    })();
  }, []);

  return {
    nodes: nodesRef.current,
    DVECanvas: (
      <>
        <canvas ref={canvasRef} />
      </>
    ),
  };
}

function InitScene(canvas: HTMLCanvasElement, nodes: RenderNodes) {
  let antialias = false;
  const engine = new Engine(canvas, antialias);
  engine.doNotHandleContextLost = true;
  engine.enableOfflineSupport = false;

  engine.setSize(window.innerWidth, window.innerHeight);
  let dirty = false;
  window.addEventListener("resize", function () {
    engine.resize();
    dirty = true;
  });

  const scene = new Scene(engine);
/* 
  scene.fogEnabled = true;
  scene.autoClear = false;
  scene.autoClearDepthAndStencil = false;
  scene.skipPointerMovePicking = true;
  scene.constantlyUpdateMeshUnderPointer = false;
 */
  /*   const camera = new ArcRotateCamera(
    "",
    Math.PI / 2,
    Math.PI / 4,
    20,
    new Vector3(0, 65, 0)
  ); */

  const camera = new FreeCamera("", new Vector3(0, 10, 0));

  camera.position.y = 0;
  const cube = CreateBox("",{},scene);
  cube.position.z = 10;
  //  camera.speed = 1;
  camera.maxZ = 1000;
  camera.fov = 1.8;
  camera.attachControl(canvas, true);
  // camera.inputs.attached.keyboard.detachControl();

  scene.activeCamera = camera;
  scene.collisionsEnabled = false;
  // camera.inertia = 0.2;

/*   const hemLight = new HemisphericLight("", new Vector3(0, 1, 0), scene);
  hemLight.intensity = .1;
  hemLight.specular.set(0,0,0); */
  nodes.camera = camera;
  nodes.scene = scene;

  engine.runRenderLoop(() => {

    scene.render();
  });
  //scene.clearColor.set(1, 1, 1, 1);
  engine.clear(scene.clearColor, true, true);
}
