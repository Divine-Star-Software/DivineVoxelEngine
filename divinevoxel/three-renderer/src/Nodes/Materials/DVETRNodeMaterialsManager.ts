import type { Material } from "three";
import { URIMaterial } from "@amodx/uri/Materials/URIMaterial";
import { DVENodeMaterialManager } from "@divinevoxel/core/Interfaces/Render/Nodes/Materials/DVENodeMaterialManager";
import { DVETRScene } from "../../Scene/DVETRScene";

export class DVETRNodeMaterialsManager extends DVENodeMaterialManager {
  materials = new Map<string, URIMaterial<DVETRScene, any, Material>>();
  get(id: string): URIMaterial<DVETRScene, any, Material> {
    const material = this.materials.get(id);
    if (!material) throw new Error(`Material with id ${id} does not exists`);
    return material;
  }
  register(id: string, material: URIMaterial<DVETRScene, any, Material>): void {
    this.materials.set(id, material);
  }
}
