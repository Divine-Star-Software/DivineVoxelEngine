export class DVEQRMaterialsRegister {
  materials = new Map<string, any>();
  get(id: string): any {
    const material = this.materials.get(id);
    if (!material) throw new Error(`Material with id ${id} does not exists`);
    return material;
  }
  register(id: string, material: any): void {
    this.materials.set(id, material);
  }
}
