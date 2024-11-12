import { URIScene } from "@amodx/uri/Scenes/URIScene";
import { URINode } from "@amodx/uri/Meshes/URINode";

export abstract class DVEFOManager {
  constructor(public scene: URIScene) {}

  abstract getActiveNode() : URINode|null;
}
