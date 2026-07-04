import { DivineVoxelEngineRender } from "@divinevoxel/vlox/Contexts/Render";

export class LevelLoaderProgress {
  container = document.createElement("div");
  canvas = document.createElement("canvas");
  offscreenCanvas: OffscreenCanvas;

  constructor() {
    this.container.className = "level-loader-progress";
    this.container.append(this.canvas);
    this.container.style.display = "none";
    this.canvas.className = "level-loader-progress-canvas";
    this.canvas.width = 200;
    this.canvas.height = 200;
    this.offscreenCanvas = this.canvas.transferControlToOffscreen();
  }

  show(show: boolean) {
    this.container.style.display = show ? "block" : "none";
  }

  init() {
    DivineVoxelEngineRender.instance.threads.world.runTask(
      "set-offscreen-loader",
      this.offscreenCanvas,
      [this.offscreenCanvas],
    );
  }
  start() {
    this.show(true);
    DivineVoxelEngineRender.instance.threads.world.runTask(
      "start-level-loader-progress",
      [],
    );
  }
  stop() {
    this.show(false);
    DivineVoxelEngineRender.instance.threads.world.runTask(
      "stop-level-loader-progress",
      [],
    );
  }
}
