import { URIScene } from "@amodx/uri/Scenes/URIScene.js";
import { Camera, Scene } from "three";
import { Observable } from "@amodx/core/Observers/Observable";
export class DVETRScene extends URIScene<Scene> {
  beforeRender = new Observable();

  camera: Camera;
  registerBeforeRender(run: () => void): void {
    this.beforeRender.subscribe(run, run);
  }
  unRegisterBeforeRender(run: () => void): void {
    this.beforeRender.unsubscribe(run);
  }
}
