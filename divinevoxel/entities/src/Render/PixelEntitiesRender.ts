import type {
  CreatePixelEntityTask,
  CreatePixelEntityReturn,
  CreatePixelEntityShapeTask,
} from "Types/PixelEntities.types";
import type { LocationData } from "@divinestar/voxelspaces";

import { DivineVoxelEngineRender } from "@divinevoxel/core/Render/DivineVoxelEngineRender.js";
import { RendredPixelEntity } from "./Classes/RenderedPixelEntity.js";
import { MeshAttributes } from "@divinevoxel/core/Constructor/Builder/Types/MeshData.types.js";
import { PixelEntityData } from "Types/PixelEntityData.types.js";
import { Util } from "@divinevoxel/core/Global/Util.helper.js";
import { TextureManager } from "@divinevoxel/core/Render/Nodes/Textures/TextureManager.js";
import { EntityShaderTool } from "../Util/EntityShaderTool.js";
import { DirectionNames } from "@divinevoxel/core";
export const PixelEntitesRender = {
  entities: new Set<RendredPixelEntity>(),

  updateEntities() {
    for (const entitie of this.entities) {
      entitie.update();
    }
  },

  _getEntityShape(location: LocationData) {
    return new Promise<MeshAttributes>((resolve) => {
      DivineVoxelEngineRender.instance.constructorCommManager.runPromiseTasks<CreatePixelEntityShapeTask>(
        "create-pixel-entity-shape",
        [location],
        [],
        (returnData) => {
          resolve(returnData);
        }
      );
    });
    ``;
  },

  assignTextureIndexes(data: PixelEntityData) {
    data.textureIndexes = {};
    for (const textureKey in data.textures) {
      data.textureIndexes[textureKey] = TextureManager.getTextureIndex(
        data.textures[textureKey]
      );
    }
  },

  spawnEntity([location, data, forceRerender]: [
    location: LocationData,
    data: PixelEntityData,
    forceRerender?: boolean
  ]) {
    return new Promise<RendredPixelEntity>(async (resolve) => {
      this.assignTextureIndexes(data);

      const meshData = await this._getEntityShape(location);
      DivineVoxelEngineRender.instance.nexusComm.runPromiseTasks<CreatePixelEntityTask>(
        "create-pixel-entity",
        [location, data, forceRerender ? true : false],
        [],
        (returnData: CreatePixelEntityReturn) => {
          resolve(
            new RendredPixelEntity(
              data.id,
              location,
              data.size,
              meshData,
              returnData
            )
          );
        }
      );
    });
  },
};
const textureType =
  DivineVoxelEngineRender.instance.nodes.textures.addTextureType(
    "#dve_pixel_entity"
  );

(window as any).tool = EntityShaderTool;
textureType.removeSegment("overlay");

setInterval(() => {
  PixelEntitesRender.updateEntities();
}, 50);
