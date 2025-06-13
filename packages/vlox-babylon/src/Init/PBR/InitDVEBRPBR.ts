import { DVEBRPBRMaterial } from "../../Matereials/PBR/DVEBRPBRMaterial";
import { DVEBRDefaultMaterialBaseData } from "../../Matereials/Types/DVEBRDefaultMaterial.types";
import { CreateDefaultRenderer } from "../Default/CreateDefaultRenderer";
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

import { LevelParticles } from "./LevelParticles";
import { WorkItemProgress } from "@divinevoxel/vlox/Util/WorkItemProgress";
export type DVEBRPBRData = DVEBRDefaultMaterialBaseData & {
  getProgress?: (progress: WorkItemProgress) => void;
};

export default function InitDVEPBR(initData: DVEBRPBRData) {
  const progress = new WorkItemProgress();
  if (initData.getProgress) initData.getProgress(progress);
  progress.startTask("Init PBR Renderer");
  const scene = initData.scene;
  scene.getEngine()!.createRenderTargetCubeTexture;
  const probe = new ReflectionProbe("", 512, initData.scene);
  initData.scene.environmentTexture = probe.cubeTexture;
  initData.scene.environmentIntensity = 1;
  const pipeline = new DefaultRenderingPipeline("atom", true, initData.scene, [
    initData.scene.activeCamera!,
  ]);
  const hdrTexture = new HDRCubeTexture("assets/skybox.hdr", scene, 512);
  initData.scene.activeCamera!.maxZ = 600;
  const postprocess = pipeline.imageProcessing;
  postprocess.toneMappingEnabled = true;
  postprocess.toneMappingType = ImageProcessingConfiguration.TONEMAPPING_ACES;
  pipeline.imageProcessing.contrast = 1.5;
  pipeline.imageProcessing.exposure = 1;
  pipeline.bloomEnabled = true;
  pipeline.bloomThreshold = 0.15;
  // pipeline.sharpenEnabled = true;
  pipeline.depthOfFieldEnabled = true;
  pipeline.depthOfField.fStop = 50;
  pipeline.depthOfField.focalLength = 300;
  pipeline.depthOfField.focusDistance = 1000;

  pipeline.fxaaEnabled = true;
  pipeline.fxaa.adaptScaleToCurrentViewport = true;

  /*   const glow = new GlowLayer("", scene);
  glow.intensity = 1;
 */
  LevelParticles.init(scene);
  const ssr = new SSRRenderingPipeline("ssr", initData.scene, [
    initData.scene.activeCamera!,
  ]);

  // ssr.reflectionSpecularFalloffExponent = 2;

  ssr.environmentTexture = probe.cubeTexture as any;
  ssr.samples = 4;
  ssr.strength = 1;
  ssr.roughnessFactor = 0.2;
  /*   ssrPipeline.thickness = 0.1;
  ssrPipeline.selfCollisionNumSkip = 2;
  ssrPipeline.blurDispersionStrength = 0;
  ssrPipeline.roughnessFactor = 0; */
  //ssrPipeline.environmentTexture = probe.cubeTexture as any;
  // ssrPipeline.environmentTextureIsProbe = true;

  const renderer = CreateDefaultRenderer({
    progress,
    createMaterial: (renderer, scene, matData) => {
      const newMat = new DVEBRPBRMaterial(
        renderer.voxelScene.options,
        matData.id,
        {
          scene,
          data: {
            effectId: matData.shaderId,
            textureTypeId: matData.textureTypeId || "",
          },
          ...matData,
        }
      );
      newMat.createMaterial(scene);
      return newMat;
    },
    scene: initData.scene,
    textureData: initData.textureData,
    textureTypes: initData.textureTypes,
    substances: initData.substances,
    afterCreate: async () => {
      scene.ambientColor.set(1, 1, 1);
      {
        const hemLight = new HemisphericLight("", new Vector3(0, 0, 0), scene);
        hemLight.specular.set(0, 0, 0);
        hemLight.intensity = 0.2;
        hemLight.diffuse.set(0.5, 0.5, 0.5);
        hemLight.groundColor.set(1, 1, 1);
      }

      /*     */
      /*     
      {
        const hemLight = new HemisphericLight("", new Vector3(0, -1, 0), scene);
        hemLight.specular.set(0, 0, 0);
        hemLight.intensity = 0.1;
      } */
      // probe.renderList = [];
      const sunLight = new DirectionalLight(
        "",
        new Vector3(-1, -1, -0.5),
        initData.scene
      );

      sunLight.intensity = 10;
      sunLight.shadowMinZ = 1;
      sunLight.shadowMaxZ = 500;
      sunLight.position.y = 200;

      sunLight.specular.set(0, 0, 0);
      const shadows = new ShadowGenerator(2048, sunLight);
      // this.shadows.usePoissonSampling = true;
      shadows.usePercentageCloserFiltering = true;

      //  shadows.forceBackFacesOnly = true;
      shadows.useContactHardeningShadow = true;
      //   shadows.contactHardeningLightSizeUVRatio = 0.05;
      shadows.setDarkness(0.1);

      // this.shadows.blurScale = 0;
      // initData.scene.useRightHandedSystem = false;

      initData.scene.registerBeforeRender(() => {
        const camera = initData.scene.activeCamera;
        if (!camera) return;
        probe.position.copyFrom(camera.position);
      });
      /*  
      renderer.observers.meshCreated.subscribe(InitDVEPBR, (mesh) => {
        if (!probe.renderList) probe.renderList = [];
  if (mesh._mesh.id.includes("glow")) {

          glow.referenceMeshToUseItsOwnMaterial(mesh._mesh);
        }
        shadows.addShadowCaster(mesh._mesh);

        mesh._mesh.receiveShadows = true;
        probe.renderList.push(mesh._mesh);
      });
      renderer.observers.meshDisposed.subscribe(InitDVEPBR, ({ _mesh }) => {
        if (!probe.renderList) return;
        shadows.removeShadowCaster(_mesh);
        probe.renderList = probe.renderList.filter((_) => _ == _mesh);
      });

      renderer.materials.materials.forEach((material, key) => {
        (material as DVEBRPBRMaterial)._material.disableLighting = false;
      });
 */
      initData.scene.ambientColor.set(0, 0, 0);

      const skybox = CreateBox("skyBox", { size: 300.0 }, initData.scene);

      const skyboxMaterial = new StandardMaterial("", scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = hdrTexture;
      skyboxMaterial.disableLighting = true;
      skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
      skybox.material = skyboxMaterial;
      probe.renderList!.push(skybox);

      /*    LevelParticles.start(
        new Color4(0, 1, 1, 1),
        new Color4(0, 1, 1, 0.7),
        new Color4(0, 1, 1, 0.5)
      ); */

      //   skybox.material = renderer.nodes.materials.get("dve_skybox")!._material;
    },
  });

  return renderer;
}
