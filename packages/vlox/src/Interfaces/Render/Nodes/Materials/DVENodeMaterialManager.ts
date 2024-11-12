import { URIMaterial } from "@amodx/uri/Materials/URIMaterial";

export abstract class DVENodeMaterialManager {
  abstract get(id: string): URIMaterial;
  abstract register(id: string, material: URIMaterial): void;
}
