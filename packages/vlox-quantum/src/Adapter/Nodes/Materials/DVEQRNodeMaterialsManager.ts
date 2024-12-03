import { URIMaterial } from "@amodx/uri/Materials/URIMaterial";
import { DVENodeMaterialManager } from "@divinevoxel/vlox/Interfaces/Render/Nodes/Materials/DVENodeMaterialManager";
import { DVEQRScene } from "../../Scene/DVEQRScene";

export class DVEQRNodeMaterialsManager extends DVENodeMaterialManager {
  materials = new Map<string, URIMaterial<DVEQRScene, any, any>>();
  get(id: string): URIMaterial<DVEQRScene, any, any> {
    const material = this.materials.get(id);
    if (!material) throw new Error(`Material with id ${id} does not exists`);
    return material;
  }
  register(id: string, material: URIMaterial<DVEQRScene, any, any>): void {
    this.materials.set(id, material);
  }
}
