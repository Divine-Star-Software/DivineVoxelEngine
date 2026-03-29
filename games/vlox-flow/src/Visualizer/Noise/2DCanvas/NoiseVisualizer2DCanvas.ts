import {
  CreateNoiseMessage,
  Noise3DViewModes,
  NoiseViewModes,
} from "../NoiseVisualizer.types";
import { NoiseVisualizerElement } from "../NoiseVisualizer.element";
export default async function (visualizer: NoiseVisualizerElement) {
  const document = visualizer.ownerDocument;
  let debounceTimer: number | null = null;
  const canvas = document.createElement("canvas");
  const requestUpdate = () => {
    if (debounceTimer !== null) return;
    debounceTimer = window.setTimeout(() => {
      debounceTimer = null;
      if (updateCanvas) updateCanvas();
    }, 16); // ~60fps
  };
  canvas.width = visualizer.state.textureSize.x;
  canvas.height = visualizer.state.textureSize.y;
  const context = canvas.getContext(
    "2d",
    <CanvasRenderingContext2DSettings>{}
  )!;
  context.fillStyle = "red";
  context.fillRect(
    0,
    0,
    visualizer.state.textureSize.x,
    visualizer.state.textureSize.y
  );

  let updateCanvas: (() => void) | null = null;

  visualizer.addEventListener("offset-updated", ({ data }) => {
    console.warn("offset updasted");
    requestUpdate();
  });
  visualizer.addEventListener("view-mode-changed", ({ data }) => {
    requestUpdate();
  });

  canvas.addEventListener("wheel", ({ deltaY }) => {
    if (deltaY < 0) {
      visualizer.state.offset.y += 1;
    } else {
      visualizer.state.offset.y -= 1;
    }
    visualizer._updateOffset(
      visualizer.state.offset.x,
      visualizer.state.offset.y,
      visualizer.state.offset.z
    );
  });

  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  canvas.addEventListener("pointerdown", (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    visualizer.state.offset.x -= dx;
    visualizer.state.offset.z -= dy;

    lastX = e.clientX;
    lastY = e.clientY;

    visualizer._updateOffset(
      Math.floor(visualizer.state.offset.x - dx),
      Math.floor(visualizer.state.offset.y),
      Math.floor(visualizer.state.offset.z - dy)
    );
  });

  canvas.addEventListener("pointerup", (e) => {
    isDragging = false;
    canvas.releasePointerCapture(e.pointerId);
  });

  visualizer.editor.addEventListener("graph-compiled", () => {
    const width = canvas.width;
    const depth = canvas.height;

    updateCanvas = async () => {
      if (visualizer.state.viewMode !== NoiseViewModes.View2D) return true;
      const imageData = context.createImageData(width, depth);
      const endX = visualizer.state.textureSize.x;
      const endY = visualizer.state.textureSize.y;
      const strideX = visualizer.state.textureSize.x / 16;
      const strideY = visualizer.state.textureSize.y / 16;
      const proms: Promise<Uint8Array<any>>[] = [];
      const messages: CreateNoiseMessage[] = [];
      for (let x = 0; x < endX; x += strideX) {
        for (let z = 0; z < endY; z += strideY) {
          const message: CreateNoiseMessage = {
            state: visualizer.state,
            size: { x: strideX, y: strideY },
            start: { x: x, y: z },
          };
          messages.push(message);
          proms.push(
            visualizer.noiseThreads.runTaskAsync<
              CreateNoiseMessage,
              Uint8Array<any>
            >("create-noise", message)
          );
        }
      }

      const results = await Promise.all(proms);

      for (let i = 0; i < results.length; i++) {
        const message = messages[i];
        const buffer = results[i];
        const { x: startX, y: startY } = message.start;
        const { x: sizeX, y: sizeY } = message.size;

        let index = 0;
        for (let y = 0; y < sizeY; y++) {
          const rowStart = ((startY + y) * width + startX) * 4;
          for (let x = 0; x < sizeX; x++) {
            const destIdx = rowStart + x * 4;
            imageData.data.set(buffer.subarray(index, index + 4), destIdx);
            index += 4;
          }
        }
      }

      context.putImageData(imageData, 0, 0);
    };
    updateCanvas();
  });

  return canvas;
}
