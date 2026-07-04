import { Scene } from "@babylonjs/core/scene";
import { Camera } from "@babylonjs/core/Cameras/camera";
import InitDVErenderer from "@divinevoxel/vlox-babylon/Init/PBR/InitDVEBRPBR";
import { TextureData } from "@divinevoxel/vlox/Textures";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { ReflectionProbe } from "@babylonjs/core/Probes/reflectionProbe";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { SSRRenderingPipeline } from "@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/ssrRenderingPipeline";
import { ImageProcessingConfiguration } from "@babylonjs/core/Materials/imageProcessingConfiguration";
import { DefaultRenderingPipeline } from "@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { HDRCubeTexture } from "@babylonjs/core/Materials/Textures/hdrCubeTexture";
import { VoxelData } from "@divinevoxel/vlox/Voxels";

export default async function InitPBR({
  scene,
  camera,
  textureData,
  voxelData,
}: {
  scene: Scene;
  camera: Camera;
  textureData: TextureData[];
  voxelData: VoxelData[];
}) {
  for (const voxel of voxelData) {
    if (voxel.id == "dve_liquid_dream_ether") {
      voxel.properties.dve_model_data!.inputs["*"] = {
        stillTexture: "dve_water",
        flowTexture: "dve_water",
      };
    }
  }

  const probe = new ReflectionProbe("", 512, scene);
  probe.cubeTexture.noPrePassRenderer = true;

  const pipeline = new DefaultRenderingPipeline("atom", true, scene, [camera]);

  const postprocess = pipeline.imageProcessing;
  postprocess.toneMappingEnabled = true;
  postprocess.toneMappingType = ImageProcessingConfiguration.TONEMAPPING_ACES;
  pipeline.imageProcessing.contrast = 1.5;
  pipeline.imageProcessing.exposure = 1;
  pipeline.depthOfFieldEnabled = true;
  pipeline.depthOfField.fStop = 50;
  pipeline.depthOfField.focalLength = 300;
  pipeline.depthOfField.focusDistance = 1000;

  pipeline.fxaaEnabled = true;
  pipeline.fxaa.adaptScaleToCurrentViewport = true;
  scene.environmentTexture = probe.cubeTexture;
  scene.environmentIntensity = 1;

  const ssr = new SSRRenderingPipeline("ssr", scene, [camera]);
  ssr.strength = 10;
  ssr.roughnessFactor = 0.05;
  ssr.selfCollisionNumSkip = 2;
  ssr.enableAutomaticThicknessComputation = false;

  ssr.reflectivityThreshold = 0.01;

  const renderer = await InitDVErenderer({
    textureTypes: [],
    substances: [],
    scene,
    textureData,
    camera,
  });

  scene.ambientColor.set(0, 0, 0);

  const hemLight = new HemisphericLight("", new Vector3(0, 0, 0), scene);
  hemLight.specular.set(0, 0, 0);
  hemLight.intensity = 0.1;
  hemLight.diffuse.set(0.5, 0.5, 0.5);
  hemLight.groundColor.set(1, 1, 1);

  const sunLight = new DirectionalLight("", new Vector3(-1, -1, -0.5), scene);
  sunLight.intensity = 10;
  sunLight.shadowMinZ = 10;
  sunLight.shadowMaxZ = 300;
  sunLight.position.y = 200;

  renderer.meshCuller.light = sunLight;

  sunLight.specular.set(0, 0, 0);
  const shadows = new ShadowGenerator(2048, sunLight);
  shadows.usePercentageCloserFiltering = true;

  shadows.usePercentageCloserFiltering = true;
  shadows.filteringQuality = ShadowGenerator.QUALITY_HIGH;
  shadows.setDarkness(0.1);

  scene.registerBeforeRender(() => {
    if (scene.activeCamera && sunLight) {
      probe.position.copyFrom(scene.activeCamera.globalPosition);
      if (sunLight) {
        sunLight.position.copyFrom(scene.activeCamera.globalPosition);
        sunLight.position.addInPlace(new Vector3(50, 150, 50));
      }
    }
  });

  renderer.observers.meshCreated.add((mesh) => {
    shadows.addShadowCaster(mesh);
    mesh.receiveShadows = true;
  });
  renderer.observers.meshDisposed.add((mesh) => {
    shadows.removeShadowCaster(mesh);
  });

  renderer.materials.materials.forEach((material, key) => {
    (material as any)._material.disableLighting = false;
  });

  const hdrTexture = new HDRCubeTexture("assets/skybox.hdr", scene, 512);

  const skybox = CreateBox("skyBox", { size: 300.0 }, scene);

  const skyboxMaterial = new StandardMaterial("", scene);
  skyboxMaterial.specularColor.set(0, 0, 0);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = hdrTexture;
  skyboxMaterial.disableLighting = true;
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;

  skybox.material = skyboxMaterial;
  probe.renderList!.push(skybox);

  return renderer;
}
