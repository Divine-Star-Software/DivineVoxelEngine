import { DVEBRClassicMaterial } from "./DVEBRClassicMaterial.js";
import { DVEBRDefaultMaterialBaseData } from "../Types/DVEBRDefaultMaterial.types";
import { CreateDefaultRenderer } from "../CreateDefaultRenderer.js";
import { HemisphericLight, Vector3 } from "@babylonjs/core";
export type DVEBRClassicData = DVEBRDefaultMaterialBaseData & {
  doSun?: boolean;
  doRGB?: boolean;
  doAO?: boolean;
};

export default function InitDVEBRClassic(initData: DVEBRClassicData) {
  return CreateDefaultRenderer({
    afterCreate: async (scene) => {
      if (initData.doSun === undefined || initData.doSun === true) {
        scene.options.doSun(true);
        scene.levels.setSun(.0);
        scene.levels.setBase(0.01);
      }
      if (initData.doRGB === undefined || initData.doRGB === true)
        scene.options.doRGB(true);
      if (initData.doAO === undefined || initData.doAO === true)
        scene.options.doAO(true);


      scene.options.doEffects(true);
      const hemLight = new HemisphericLight("", new Vector3(0, -1, 0), initData.scene);
      hemLight.specular.set(0, 0, 0);
      hemLight.intensity = 0.1;
    },
    createMaterial: (scene, matData) => {
      const newMat = new DVEBRClassicMaterial(matData.id, {
        scene: scene,
        data: {
          shaderId: matData.shaderId,
          textureTypeId: matData.textureTypeId || "",
        },
        ...matData
      });
      newMat.createMaterial(scene._scene);
      return newMat;
    },

    scene: initData.scene,
    textureData: initData.textureData,
    textureTypes: initData.textureTypes,
    substances: initData.substances,
  });
}
