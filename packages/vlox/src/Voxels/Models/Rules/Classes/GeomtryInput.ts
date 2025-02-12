import { BaseVoxelGeomtryTextureProcedureData } from "Mesher/Models/Procedures/TextureProcedure";
import { TextureId } from "../../../../Textures";
import { TextureManager } from "../../../../Textures/TextureManager";
import { VoxelGeometryData } from "../../VoxelModel.types";

export class GeomtryInput {
  inputObservers = new Map<string, ((data: any) => void)[]>();
  orginalArgs: any[] = [];
  args: any[] = [];
  proxy: Record<string, any> = {};
  isArgString(data: any) {
    if (typeof data !== "string") return false;
    return data[0] == "@";
  }
  cloneArgs() {
    return structuredClone(this.args);
  }
  resetDefaults() {
    this.args = structuredClone(this.orginalArgs);
  }

  constructor(public geomtry: VoxelGeometryData) {
    for (const arg in geomtry.arguments) {
      if (this.inputObservers.has(arg)) continue;
      const obs: ((data: any) => void)[] = [];
      this.inputObservers.set(arg, obs)!;
      const data = geomtry.arguments[arg];
      Object.defineProperty(this.proxy, arg, {
        set(value) {
          if (data.type == "texture") {
            const textureId = value as TextureId;
            if (!Array.isArray(textureId) && typeof textureId == "object") {
              const procedureData = {
                ...(textureId as any),
              } as BaseVoxelGeomtryTextureProcedureData;
              if (procedureData.texture) {
                procedureData.texture = TextureManager.getTexture(
                  "dve_voxel"
                )?.getTextureIndex(procedureData.texture as any);
              }
              if (procedureData.textureRecrod) {
                for (const key in procedureData.textureRecrod) {
                  procedureData.textureRecrod[key] = TextureManager.getTexture(
                    "dve_voxel"
                  )?.getTextureIndex(procedureData.textureRecrod[key] as any);
                }
              }
              value = { ...procedureData };
            } else {
              value =
                TextureManager.getTexture("dve_voxel")?.getTextureIndex(
                  textureId
                );
            }
          }
          for (const func of obs) {
            func(value);
          }
        },
      });
    }
  }

  onInput(id: string, subscribe: (data: any) => any) {
    id = id.replace("@", "");
    const obs = this.inputObservers.get(id);
    if (!obs)
      throw new Error(`Input [${id}] does not exist on ${this.geomtry.id}`);
    return obs.push(subscribe);
  }
}
