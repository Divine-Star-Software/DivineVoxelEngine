import { URIScene } from "../Scenes/URIScene.js";
import { URIMeshBase } from "./URIMeshBase.js";

export abstract class URIMesh<
  Scene extends URIScene = URIScene,
  InternalMesh extends any = unknown
> extends URIMeshBase {
  constructor(public scene: Scene) {
    super();
  }
  _mesh: InternalMesh;
  abstract dispose(): void;

  abstract isVisible: boolean;
  abstract setEnabled(enabled: boolean): void;
}
