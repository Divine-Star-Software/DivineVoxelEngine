import { URIScene } from "@amodx/uri/Scenes/URIScene";
import { DVEFOManager } from "./DVEFOManager";

export abstract class DVEMeshCuller {
  constructor(public scene: URIScene, public foManager: DVEFOManager) {}
}
