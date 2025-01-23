import { MaterialInterface } from "./MaterialInterface";
export class DVEBRMaterialRegister {
  materials = new Map<string, MaterialInterface>();
  get(id: string): MaterialInterface {
    const material = this.materials.get(id);
    if (!material) throw new Error(`Material with id ${id} does not exists`);
    return material;
  }
  register(id: string, material: MaterialInterface): void {
    this.materials.set(id, material);
  }
}
