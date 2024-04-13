import { DVEBRClassicMaterial } from "./DVEBRClassicMaterial.js";
import { DVEBRDefaultMaterialBaseData } from "../Types/DVEBRDefaultMaterial.types";
import { CreateDefaultRenderer } from "../CreateDefaultRenderer.js";
export type DVEBRClassicData = DVEBRDefaultMaterialBaseData;

export default function InitDVEBRClassic(initData: DVEBRClassicData) {
  return CreateDefaultRenderer({
    createMaterial: (scene, matData) => {
      const newMat = new DVEBRClassicMaterial(matData.id, {
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
  });
}
