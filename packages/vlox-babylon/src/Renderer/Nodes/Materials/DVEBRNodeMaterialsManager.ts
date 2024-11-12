import type { Material } from "@babylonjs/core";
import { URIMaterial } from "@amodx/uri/Materials/URIMaterial";
import { DVENodeMaterialManager } from "@divinevoxel/vlox/Interfaces/Render/Nodes/Materials/DVENodeMaterialManager";
import { DVEBRScene } from "../../Scene/DVEBRScene";

export class DVEBRNodeMaterialsManager extends DVENodeMaterialManager {
  materials = new Map<string, URIMaterial<DVEBRScene, any, Material>>();
  get(id: string): URIMaterial<DVEBRScene, any, Material> {
    const material = this.materials.get(id);
    if (!material) throw new Error(`Material with id ${id} does not exists`);
    return material;
  }
  register(id: string, material: URIMaterial<DVEBRScene, any, Material>): void {
    this.materials.set(id, material);
  }
}
