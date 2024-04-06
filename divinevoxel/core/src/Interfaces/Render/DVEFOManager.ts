import { URIScene } from "@divinestar/uri/Scenes/URIScene";
import { URINode } from "@divinestar/uri/Meshes/URINode";

export abstract class DVEFOManager {
  constructor(public scene: URIScene) {}

  abstract getActiveNode() : URINode|null;
}
