import { FlowEditorElement } from "../../FlowEditor.element";
import { ThreadPool } from "@amodx/threads";
import { NoiseViewModes, NoiseVisualizerState } from "./NoiseVisualizer.types";
import NoiseVisualizer3DCanvas from "./3DCanvas/NoiseVisualizer3DCanvas";
import NoiseVisualizer2DCanvas from "./2DCanvas/NoiseVisualizer2DCanvas";

export class NSEvent<T = any> extends Event {
  constructor(type: string, public data: T) {
    super(type, { bubbles: false, composed: false });
  }
}

interface NoiseVisualizerEventMap {
  "offset-updated": NSEvent<NoiseVisualizerState>;
  "view-mode-changed": NSEvent<NoiseVisualizerState>;
}

export class NoiseVisualizerElement extends HTMLElement {
  editor: FlowEditorElement;
  state = new NoiseVisualizerState();

  offsetDisplayContainer: HTMLDivElement;
  offsetDisplaText: HTMLParagraphElement;
  canvasContainer: HTMLDivElement;
  noise3dCanvas: HTMLElement;
  noise2dCanvas: HTMLElement;
  noiseThreads: ThreadPool;

  connectedCallback() {
    const editor = this.editor;
    if (!editor) {
      throw new Error(`Element was mounted without flow editor element`);
    }
    this.style.display = "flex";
    this.style.flexDirection = "column";
    this.style.justifyContent = "center";
    this.style.alignItems = "center";
    this.style.width = "100%";
    this.style.height = "100%";
    this.innerHTML = /* html */ `
<style>
noise-visualizer {
    position: relative;
    .offset-display {
        height: 50px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .canvas-container {

    }
    .modes {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .mode-button {
            background-color: black;
            color: white;
            border: 1px solid black;
            padding: 5px;
            &.active {
                background-color: white;
                color: black;
            }
            &:hover {
                background-color: white;
                color: black;
                cursor: pointer;
            }
        }
    }
}
</style>
`;

    const noiseThread = new ThreadPool("noise");
    for (let i = 0; i < 8; i++) {
      noiseThread.addPort(
        new Worker(new URL("./NoiseWorker", import.meta.url), {
          type: "module",
        })
      );
    }
    this.noiseThreads = noiseThread;

    const document = editor.ownerDocument;
    this.canvasContainer = document.createElement("div");
    this.canvasContainer.classList.add("canvas-container");
    this.append(this.canvasContainer);

    this.offsetDisplayContainer = document.createElement("div");
    this.offsetDisplayContainer.classList.add("offset-display");
    this.append(this.offsetDisplayContainer);
    this.offsetDisplaText = document.createElement("p");
    this.offsetDisplayContainer.append(this.offsetDisplaText);

    editor.addEventListener("graph-compiled", () => {
      const json = editor.flowGraph.toJSON();
      noiseThread.runTaskForAll("set-graph", json);
    });

    const modeConaitner = document.createElement("div");
    modeConaitner.classList.add("modes");
    this.append(modeConaitner);

    const mode2d = document.createElement("button");
    mode2d.classList.add("mode-button");
    mode2d.innerText = "2D";
    mode2d.addEventListener("click", () => {
      this._updateViewMode(NoiseViewModes.View2D);
      mode3d.classList.remove("active");
      mode2d.classList.add("active");
    });

    const mode3d = document.createElement("button");
    mode3d.classList.add("mode-button");
    mode3d.innerText = "3D";
    mode3d.addEventListener("click", () => {
      this._updateViewMode(NoiseViewModes.View3D);
      mode2d.classList.remove("active");
      mode3d.classList.add("active");
    });
    mode3d.classList.add("active");

    modeConaitner.append(mode2d, mode3d);

    this._updateOffset(
      this.state.offset.x,
      this.state.offset.y,
      this.state.offset.z
    );

    (async () => {
      this.noise2dCanvas = await NoiseVisualizer2DCanvas(this);
      this.noise3dCanvas = await NoiseVisualizer3DCanvas(this);
      this.state.viewMode = null as any;
      this._updateViewMode(this.state.viewMode);
    })();
  }

  _updateOffset(x: number, y: number, z: number) {
    this.state.offset.x = x;
    this.state.offset.y = y;
    this.state.offset.z = z;
    this.dispatchEvent(new NSEvent("offset-updated", this.state));
    this.offsetDisplaText.innerText = `x: ${this.state.offset.x} y: ${this.state.offset.y} z: ${this.state.offset.z}`;
  }

  _updateViewMode(view: NoiseViewModes) {
    if (this.state.viewMode == view) return;
    this.state.viewMode = view;
    this.dispatchEvent(new NSEvent("view-mode-changed", this.state));
    if (this.state.viewMode == NoiseViewModes.View2D) {
      if (this.noise3dCanvas) this.noise3dCanvas.remove();
      this.canvasContainer.append(this.noise2dCanvas);
    }
    if (this.state.viewMode == NoiseViewModes.View3D) {
      if (this.noise2dCanvas) this.noise2dCanvas.remove();
      this.canvasContainer.append(this.noise3dCanvas);
    }
  }

  addEventListener<K extends keyof NoiseVisualizerEventMap>(
    type: K,
    listener: (
      this: NoiseVisualizerElement,
      ev: NoiseVisualizerEventMap[K]
    ) => any,
    options?: boolean | AddEventListenerOptions
  ): void;

  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: NoiseVisualizerElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    super.addEventListener(type, listener, options);
  }

  removeEventListener<K extends keyof NoiseVisualizerEventMap>(
    type: K,
    listener: (
      this: NoiseVisualizerElement,
      ev: NoiseVisualizerEventMap[K]
    ) => any,
    options?: boolean | EventListenerOptions
  ): void;

  removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: NoiseVisualizerElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void {
    super.removeEventListener(type, listener, options);
  }
}
