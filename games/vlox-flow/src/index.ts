import { FlowEditorElement } from "./FlowEditor.element";
import { NoiseVisualizerElement } from "./Visualizer/Noise/NoiseVisualizer.element";

declare global {
  interface HTMLElementTagNameMap {
    "flow-editor": FlowEditorElement;
    "noise-visualizer": NoiseVisualizerElement;
  }
}

export function RegisterElements(currentWindow: Window = window) {
  currentWindow.customElements.define("flow-editor", FlowEditorElement);
  currentWindow.customElements.define(
    "noise-visualizer",
    NoiseVisualizerElement
  );
}

RegisterElements();
