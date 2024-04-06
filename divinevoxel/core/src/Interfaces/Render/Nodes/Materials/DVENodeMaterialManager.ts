import { URIMaterial } from "@divinestar/uri/Materials/URIMaterial";

export abstract class DVENodeMaterialManager {
  abstract get(id: string): URIMaterial;
  abstract register(id: string, material: URIMaterial): void;
}
