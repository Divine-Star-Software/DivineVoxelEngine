import { Util } from "../Global/Util.helper.js";
import { DivineStar } from "./DivineStar.js";

const blcokData = [
  {
    name: "astral_plane_crystalline_membrane",
    id: 1,
    defaultTextureUV: [1, 1],
  },
  {
    name: "astral_plane_liquid_dreams",
    id: 2,
    defaultTextureUV: [1, 1],
    animatedTextuveUVs: [1, 1, 1, 2, 1, 3, 1, 2],
  },
];

const DS = new DivineStar();
(window as any).DS = DS;
DS.world.createWorldWorker();
DS.builderManager.createBuilders();
DS.world.sendBlockData(blcokData);
DS.animationManager.createAnimationWorker();
DS.animationManager.createAnimators();

window.addEventListener("beforeunload", () => {
  for (const animtor of DS.animationManager.animators) {
    animtor.terminate();
  }
  for (const builder of DS.builderManager.builders) {
    builder.terminate();
  }
  DS.world.worldGen.terminate();
  DS.animationManager.animationWorker.terminate();
});

//DS.chunkManager.createSharedArrayBuffers();

window.addEventListener("DOMContentLoaded", async () => {
  DS.chunkMaterial.setUpImageCreation();

  const canvas = document.createElement("canvas");
  canvas.id = "renderCanvas";
  document.body.append(canvas);

  window.addEventListener("click", function () {
    canvas.requestPointerLock();
  });

  const engine = new BABYLON.Engine(canvas, false, {});
  engine.doNotHandleContextLost = true;
  engine.enableOfflineSupport = false;
 engine.setSize(1920, 1080);
 // engine.setSize(1280, 720);
  const scene = new BABYLON.Scene(engine);
  // scene.collisionsEnabled = true;

  const assumedFramesPerSecond = 60;
  const earthGravity = -9.81;
  scene.gravity = new BABYLON.Vector3(
    0,
    earthGravity / assumedFramesPerSecond,
    0
  );
  // Fog
  //scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
  scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
  scene.fogColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  scene.fogDensity = 0.01;

  const camera = new BABYLON.FreeCamera("main", BABYLON.Vector3.Zero(), scene);

  camera.fov = 1.5;
  camera.minZ = 0.01;
  camera.angularSensibility = 5000;
  camera.maxZ = 500;
  scene.activeCamera = camera;
  //  camera.setTarget(BABYLON.Vector3.Zero());

  camera.attachControl(canvas, true);

  /*   const light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  // light.specular = new BABYLON.Color3(.5,.5,.5);
  light.intensity = 0.1;
  light.specular = new BABYLON.Color3(0, 0, 0);

  const light2 = new BABYLON.HemisphericLight(
    "light2",
    new BABYLON.Vector3(0, -1, 0),
    scene
  );
  // light.specular = new BABYLON.Color3(.5,.5,.5);
  light2.intensity = 0.1;
  light2.specular = new BABYLON.Color3(0, 0, 0);  */

  /*     var sunLight = new BABYLON.DirectionalLight(
    "DirectionalLight", 
    new BABYLON.Vector3(0, -1, 0),
    scene
  ); */
  const util = new Util();
  /*   var spotlight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 10, 1), scene);
	spotlight.position = new BABYLON.Vector3(0, 80, 0);
  //spotlight.radius = util.degtoRad(360);
  //spotlight.angle = util.degtoRad(180);
  (window as any).light = spotlight;
  //spotlight.diffuse = new BABYLON.Color3(0,0,0);
  spotlight.specular = new BABYLON.Color3(0,0,0);
  var shadowGenerator = new BABYLON.ShadowGenerator(128, spotlight); */
  //shadowGenerator.bias = 0.0000000000001;
  //  shadowGenerator.normalBias = 0.00000001;
  ////shadowGenerator.bias = 0.001;
  //shadowGenerator.normalBias = 0.02;

  //	shadowGenerator.useContactHardeningShadow = true;
  //	shadowGenerator.contactHardeningLightSizeUVRatio = 0.05;
  //	shadowGenerator.setDarkness(.5);
  /*   sunLight.diffuse = new BABYLON.Color3(1, 1, 1);
  sunLight.specular = new BABYLON.Color3(0, 0, 0);
   sunLight.intensity = 5;
   (window as any).light = sunLight; */

  const skybox = BABYLON.MeshBuilder.CreateBox(
    "skyBox",
    { size: 400.0 },
    scene
  );
  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  //skyboxMaterial.reflectionTexture.?coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  skybox.material = skyboxMaterial;
  skybox.infiniteDistance = true;

  scene.fogEnabled = true;
 scene.autoClear = false; // Color buffer
 scene.autoClearDepthAndStencil = false; // Depth and stencil, obviously

  DS.player.createPlayerSharedArrays();
  DS.chunkMaterial.setScene(scene);
  const combinedTexture = await DS.chunkMaterial.createMaterialTexture([
    "assets/textures/2.png",
    "assets/textures/5.png",
    "assets/textures/1.png",
    "assets/textures/3.png",
    "assets/textures/4.png",

 
  ]);
  const material = DS.chunkMaterial.getMaterial(combinedTexture);

  DS.builderManager.setScene(scene);
  // DS.builderManager.setShadowGen(shadowGenerator);
  DS.builderManager.setMaterial(material);
  DS.builderManager.createBaseChunkMeshes();
  //  DS.world.setShadowGen(shadowGenerator);
  DS.world.startWorldGen();

  DS.player.createPlayer(scene, camera);

  DS.animationManager.startAnimations();

  let test = true;
  //render loop
  engine.runRenderLoop(() => {
    scene.render();
  });

  (DS as any).UTIL = util;

  setInterval(() => {
    DS.player.update();

    // spotlight.position.x = DS.player.hitbox.position.x - 20;
    // spotlight.position.z = DS.player.hitbox.position.z - 20;
  }, 100);

  const max = 10;
  let count = max;

  setInterval(() => {

    
    if (!count) {
      count = max;
 
      if (test) {
        DS.chunkMaterial.runAnimations(3);
        test = false;
      } else {
        test = true;
        
        DS.chunkMaterial.runAnimations(4);
      }
    } else {
      count--;
    } 
  
  }, 50);
});
