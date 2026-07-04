import { elm } from "@amodx/elm";
import { LevelLoaderProgress } from "./LevelLoaderProgress";
import { ProgressBar } from "./ProgressBar";
import { DSLogo } from "./DSLogo";
import "./index.css";
export type LoadScreenShowOptions = {
  progressBar?: true;
};

export class LoadingScreen {
  static parent = document.createElement("div");
  static inner = document.createElement("div");

  static spinnerContainer = document.createElement("div");

  static _show = false;

  static progress = new ProgressBar();
  static levelLoaderProgress = new LevelLoaderProgress();

  static Init() {
    this.parent.className = "ds-loading-screen-wrapper";
    this.inner.className = "ds-loading-screen";
    this.spinnerContainer.className = "ds-loading-spinner";

    this.inner.append(
      elm("div", "game-title", elm("h1", "", "Divine Voxel Engine Demos")),
    );

    this.inner.append(this.spinnerContainer);
    this.spinnerContainer.append(DSLogo("ds-logo", 600, 600));

    this.inner.append(this.progress.container);
    this.progress.container.append(this.levelLoaderProgress.container);

    this.parent.append(this.inner);
  }

  static Show(options: LoadScreenShowOptions = { progressBar: true }) {
    return new Promise((resolve) => {
      this._show = true;
      document.body.append(this.parent);
      this.progress.show(options.progressBar || false);
      this.parent.animate([{ opacity: 0 }, { opacity: 1 }], 500).onfinish =
        () => resolve(true);
    });
  }

  static Hide() {
    return new Promise((resolve) => {
      this._show = false;
      this.parent.animate([{ opacity: 1 }, { opacity: 0 }], 500).onfinish =
        () => {
          resolve(true);
          this.parent.remove();
        };
    });
  }
}
