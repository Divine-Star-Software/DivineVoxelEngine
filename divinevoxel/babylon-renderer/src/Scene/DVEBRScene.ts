import { URIScene } from "@amodx/uri/Scenes/URIScene.js";
import { Scene } from "@babylonjs/core/scene";
export class DVEBRScene extends URIScene<Scene> {
  registerBeforeRender(run: () => void): void {
    this._scene.registerBeforeRender(run);
  }
  unRegisterBeforeRender(run: () => void): void {
    this._scene.unregisterBeforeRender(run);
  }
}
