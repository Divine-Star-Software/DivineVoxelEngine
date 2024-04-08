import { DVEBRPBRMaterial } from "./DVEBRPBRMaterial";
import { DVEBRDefaultMaterialBaseData } from "../Types/DVEBRDefaultMaterial.types";
import { CreateDefaultRenderer } from "../CreateDefaultRenderer.js";
import {
  DirectionalLight,
  ReflectionProbe,
  ShadowGenerator,
  Vector3,
} from "@babylonjs/core";
export type DVEBRClassicData = DVEBRDefaultMaterialBaseData;

export default function InitDVEPBR(initData: DVEBRClassicData) {
  const renderer = CreateDefaultRenderer({
    createMaterial: (scene, matData) => {
      console.log("CREATE NEW SHADER", matData.shaderId, matData);
      const newMat = new DVEBRPBRMaterial(matData.id, {
        scene: scene,
        data: {
          shaderId: matData.shaderId,
          textureTypeId: matData.textureTypeId || "",
        },
      });
      newMat.createMaterial(scene._scene);
      return newMat;
    },
    scene: initData.scene,
    textureData: initData.textureData,
    textureTypes: initData.textureTypes,
    substances: initData.substances,
    afterCreate: async () => {
      const probe = new ReflectionProbe("", 512, initData.scene);
      const sunLight = new DirectionalLight(
        "",
        new Vector3(-1, -1, -0.5),
        initData.scene
      );
      sunLight.intensity = 10;
      sunLight.shadowMinZ = 1;
      sunLight.shadowMaxZ = 500;
      sunLight.position.y = 100;

      sunLight.specular.set(0, 0, 0,);
      const shadows = new ShadowGenerator(1024, sunLight);
      // this.shadows.usePoissonSampling = true;
      // this.shadows.usePercentageCloserFiltering = true;
      initData.scene.environmentTexture = probe.cubeTexture;
      initData.scene.environmentIntensity = 0.01;
      shadows.useContactHardeningShadow = true;
      //   shadows.contactHardeningLightSizeUVRatio = 0.05;
      shadows.setDarkness(0);
      // this.shadows.blurScale = 0;
      // initData.scene.useRightHandedSystem = false;

      initData.scene.registerBeforeRender(() => {
        const camera = initData.scene.activeCamera;
        if (!camera) return;
        probe.position.copyFrom(camera.position);
      });

      renderer.observers.meshCreated.subscribe(InitDVEPBR, (mesh) => {
        if (!probe.renderList) probe.renderList = [];
        shadows.addShadowCaster(mesh._mesh);

        mesh._mesh.receiveShadows = true;
        probe.renderList.push(mesh._mesh);
      });
      renderer.observers.meshDisposed.subscribe(InitDVEPBR, ({ _mesh }) => {
        if (!probe.renderList) return;
        shadows.removeShadowCaster(_mesh);
        probe.renderList = probe.renderList.filter((_) => _ == _mesh);
      });

      renderer.nodes.materials.materials.forEach((material, key) => {
        (material as DVEBRPBRMaterial)._material.reflectionTexture =
          probe.cubeTexture;
        (material as DVEBRPBRMaterial)._material.disableLighting = false;
      });

      initData.scene.ambientColor.set(0, 0, 0);
      console.log("CREATED THE THING", initData.scene.lights, initData.scene);
    },
  });

  return renderer;
}
