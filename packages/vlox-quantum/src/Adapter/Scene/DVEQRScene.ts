import { URIScene } from "@amodx/uri/Scenes/URIScene.js";
export class DVEQRScene extends URIScene<any> {
  registerBeforeRender(run: () => void): void {
    this._scene.registerBeforeRender(run);
  }
  unRegisterBeforeRender(run: () => void): void {
    this._scene.unregisterBeforeRender(run);
  }
}
