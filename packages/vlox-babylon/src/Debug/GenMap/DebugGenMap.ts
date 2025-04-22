import { Vector3Like } from "@amodx/math";
import { DivineVoxelEngineRender } from "@divinevoxel/vlox/Contexts/Render";

export class DebugGenMap {
  private _onDispose: (() => void) | null = null;
  constructor(public DVER: DivineVoxelEngineRender) {}
  init(
    followPosition: Vector3Like,
    followDirection: Vector3Like,
    dimension = 0
  ) {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.zIndex = "200";
    container.style.width = "250px";
    container.style.height = "250px";
    container.style.top = "0";
    container.style.left = "0";
    container.style.padding = "0";
    container.style.margin = "0";
    document.body.append(container);

    const canvas = document.createElement("canvas");

    const worldGenButton = document.createElement("button");
    const biomesButton = document.createElement("button");

    canvas.style.width = "250px";
    canvas.style.height = "250px";
    canvas.width = 250;
    canvas.height = 250;
    canvas.style.position = "absolute";
    canvas.style.zIndex = "250";

    worldGenButton.innerText = "World Gen";
    biomesButton.innerText = "Biomes";

    container.appendChild(canvas);

    const offscreen = canvas.transferControlToOffscreen();
    this.DVER.threads.world.runTask("set-debug-map-canvas", offscreen, [
      offscreen,
    ]);
    /* 
    this._onDispose = () => {
      interval.stop();
      engine.dispose();
      container.remove();
    }; */
  }

  dispose() {
    if (this._onDispose) this.dispose();
    this._onDispose = null;
  }
}
