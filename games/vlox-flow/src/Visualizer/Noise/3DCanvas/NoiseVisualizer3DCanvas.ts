import { CreateNoiseMessage, NoiseViewModes } from "../NoiseVisualizer.types";
import NoiseSDFCompute from "./NoiseSDFCompute";
import { Vec2Array, Vector3Like } from "@amodx/math";
import { NoiseVisualizerElement } from "../NoiseVisualizer.element";
async function downloadImageFromTexture(
  device: any,
  textureSize: Vec2Array,
  format: any,
  computePipeline: any,
  computeBindGroup: any,
  renderPipeline: any,
  renderBindGroup: any
) {
  const colorTexture = device.createTexture({
    size: textureSize,
    format,
    usage:
      GPUTextureUsage.RENDER_ATTACHMENT |
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_SRC,
  });

  const commandEncoder = device.createCommandEncoder();

  const computePass = commandEncoder.beginComputePass();
  computePass.setPipeline(computePipeline);
  computePass.setBindGroup(0, computeBindGroup);
  computePass.dispatchWorkgroups(
    Math.ceil(textureSize[0] / 8),
    Math.ceil(textureSize[1] / 8)
  );
  computePass.end();

  const renderPass = commandEncoder.beginRenderPass({
    colorAttachments: [
      {
        view: colorTexture.createView() as any,
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
        loadOp: "clear",
        storeOp: "store",
      },
    ],
  });

  renderPass.setPipeline(renderPipeline);
  renderPass.setBindGroup(0, renderBindGroup);
  renderPass.draw(6);
  renderPass.end();

  const copyBuffer = device.createBuffer({
    size: textureSize[0] * textureSize[1] * 4,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
  });

  commandEncoder.copyTextureToBuffer(
    {
      texture: colorTexture,
    },
    {
      buffer: copyBuffer,
      bytesPerRow: textureSize[0] * 4,
    },
    {
      width: textureSize[0],
      height: textureSize[1],
      depthOrArrayLayers: 1,
    }
  );

  device.queue.submit([commandEncoder.finish()]);
  await copyBuffer.mapAsync(GPUMapMode.READ);
  const copyArray = new Uint8Array(copyBuffer.getMappedRange());

  const imageData = new ImageData(textureSize[0], textureSize[1]);
  imageData.data.set(copyArray);

  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = textureSize[0];
  tmpCanvas.height = textureSize[1];
  const ctx = tmpCanvas.getContext("2d")!;
  ctx.putImageData(imageData, 0, 0);

  const a = document.createElement("a");
  a.download = "webgpu-output.png";
  a.href = tmpCanvas.toDataURL("image/png");
  a.click();

  copyBuffer.unmap();
}
export default async function (visualizer: NoiseVisualizerElement) {
  const document = visualizer.ownerDocument;
  let debounceRenderTimer: number | null = null;
  let debounceTimer: number | null = null;
  const requestRenderUpdate = () => {
    if (debounceRenderTimer !== null) return;
    debounceRenderTimer = window.setTimeout(() => {
      debounceRenderTimer = null;
      if (frame) frame();
    }, 16);
  };
  const requestGenUpdate = () => {
    if (debounceTimer !== null) return;
    debounceTimer = window.setTimeout(() => {
      debounceTimer = null;
      if (updateCanvas) updateCanvas();
    }, 16);
  };
  let updateCanvas: (() => void) | null = null;

  const canvas = document.createElement("canvas");
  canvas.width = visualizer.state.textureSize.x;
  canvas.height = visualizer.state.textureSize.y;
  const sectorByteSize = (16 * 16 * 256) / 8;
  const sector = new Uint32Array(new ArrayBuffer(sectorByteSize));
  const sectorSize = sector.length;
  const sectorsX = 256 / 16;
  const sectorsZ = 256 / 16;
  const sectorSceneBounds = Vector3Like.Create(sectorsX, 0, sectorsZ);
  const totalSectors = sectorsX * sectorsZ;

  const adapter = await navigator.gpu!.requestAdapter({})!;
  const device = await adapter!.requestDevice()!;
  if (!device) throw new Error("WebGPU not supported or access denied");

  const context = canvas.getContext("webgpu")!;
  const format: GPUTextureFormat = "rgba8unorm";
  context.configure({
    device: device as any,
    format,
    alphaMode: "opaque",
  });

  const textureSize: Vec2Array = [canvas.width, canvas.height];

  const storageTexture = device.createTexture({
    size: textureSize,
    format,
    usage:
      GPUTextureUsage.STORAGE_BINDING |
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_SRC,
  });

  const sampler = device.createSampler({
    magFilter: "linear",
    minFilter: "linear",
  });

  const cameraBuffer = device.createBuffer({
    size: 4 * 4,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const sunPositionBuffer = device.createBuffer({
    size: 4 * 4,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  function updateCameraBuffer(x: number, y: number, z: number) {
    const data = new Float32Array([x, y, z, 0]);
    device.queue.writeBuffer(cameraBuffer, 0, data.buffer);
  }
  function updateSunPosition(x: number, y: number, z: number) {
    const data = new Float32Array([x, y, z, 0]);
    device.queue.writeBuffer(sunPositionBuffer, 0, data.buffer);
  }
  const uploadBuffer = new Uint32Array(
    new ArrayBuffer(totalSectors * sectorByteSize)
  );
  console.warn("UPLOAD BUFFER", uploadBuffer);
  const voxelBuffer = device.createBuffer({
    size: totalSectors * sectorByteSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });

  const computeShader = NoiseSDFCompute(device as any);

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        storageTexture: {
          access: "write-only",
          format: "rgba8unorm",
          viewDimension: "2d",
        },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.COMPUTE,
        buffer: {
          type: "read-only-storage",
        },
      },
      {
        binding: 2,
        visibility:
          GPUShaderStage.FRAGMENT |
          GPUShaderStage.VERTEX |
          GPUShaderStage.COMPUTE,
        buffer: {
          type: "uniform",
        },
      },
      {
        binding: 3,
        visibility:
          GPUShaderStage.FRAGMENT |
          GPUShaderStage.VERTEX |
          GPUShaderStage.COMPUTE,
        buffer: {
          type: "uniform",
        },
      },
    ],
  });

  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout as any],
  });

  const computePipeline = device.createComputePipeline({
    layout: pipelineLayout as any,
    compute: {
      module: computeShader as any,
      entryPoint: "main",
    },
  });

  const computeBindGroup = device.createBindGroup({
    layout: bindGroupLayout as any,
    entries: [
      {
        binding: 0,
        resource: storageTexture.createView() as any,
      },
      {
        binding: 1,
        resource: {
          buffer: voxelBuffer,
        },
      },
      {
        binding: 2,
        resource: {
          buffer: cameraBuffer,
        },
      },
      {
        binding: 3,
        resource: {
          buffer: sunPositionBuffer,
        },
      },
    ],
  });

  const renderShader = device.createShaderModule({
    code: /* wgsl */ `
      @group(0) @binding(0) var tex: texture_2d<f32>;
      @group(0) @binding(1) var samp: sampler;

      struct VertexOutput {
        @builtin(position) pos: vec4<f32>,
        @location(0) uv: vec2<f32>,
      };

      @vertex
      fn vs(@builtin(vertex_index) idx: u32) -> VertexOutput {
        var positions = array<vec2<f32>, 6>(
          vec2<f32>(-1.0, -1.0),
          vec2<f32>(1.0, -1.0),
          vec2<f32>(-1.0, 1.0),
          vec2<f32>(-1.0, 1.0),
          vec2<f32>(1.0, -1.0),
          vec2<f32>(1.0, 1.0)
        );
        let uv = (positions[idx] + vec2(1.0)) * 0.5;
        return VertexOutput(vec4<f32>(positions[idx], 0.0, 1.0), uv);
      }

      @fragment
      fn fs(input: VertexOutput) -> @location(0) vec4<f32> {
        return textureSample(tex, samp, input.uv);
      }

      
    `,
  });

  const renderPipeline = device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: renderShader as any,
      entryPoint: "vs",
    },
    fragment: {
      module: renderShader as any,
      entryPoint: "fs",
      targets: [{ format }],
    },
    primitive: {
      topology: "triangle-list",
    },
  });

  const renderBindGroup = device.createBindGroup({
    layout: renderPipeline.getBindGroupLayout(0) as any,
    entries: [
      {
        binding: 0,
        resource: storageTexture.createView() as any,
      },
      {
        binding: 1,
        resource: sampler,
      },
    ],
  });

  let alpha = Math.PI / 4;
  let beta = Math.PI / 4;
  let radius = 200;
  const maxRadius = 400;

  let isDragging = false;
  let dragMode: "camera" | "offset" = "camera";
  let lastX = 0;
  let lastY = 0;

  canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  canvas.addEventListener("pointerdown", (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    e.preventDefault();
    if (e.button == 2) {
      dragMode = "offset";
    }
    if (e.button == 0) {
      dragMode = "camera";
    }
  });
  canvas.addEventListener("pointerleave", () => (isDragging = false));
  canvas.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    if (dragMode == "camera") {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      alpha += dx * 0.005;
      beta += dy * 0.005;
      beta = Math.max(0.01, Math.min(Math.PI - 0.01, beta));
      requestRenderUpdate();
    }
    if (dragMode == "offset") {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;

      visualizer.state.offset.x -= dx;
      visualizer.state.offset.z -= dy;

      lastX = e.clientX;
      lastY = e.clientY;

      visualizer._updateOffset(
        visualizer.state.offset.x - dx,
        visualizer.state.offset.y,
        visualizer.state.offset.z - dy
      );
    }
  });
  canvas.addEventListener("wheel", (e) => {
    if (dragMode == "camera") {
      radius += e.deltaY * 0.01;
      radius = Math.max(1, Math.min(maxRadius, radius));
      requestRenderUpdate();
    }
  });
  canvas.addEventListener("pointerup", (e) => {
    isDragging = false;
    canvas.releasePointerCapture(e.pointerId);
  });

  function getCameraPosition(): [number, number, number] {
    const sinBeta = Math.sin(beta);
    const x = radius * sinBeta * Math.cos(alpha);
    const y = radius * Math.cos(beta);
    const z = radius * sinBeta * Math.sin(alpha);
    return [x, y, z];
  }

  function frame() {
    updateCameraBuffer(...getCameraPosition());
    console.log(getCameraPosition());
    const commandEncoder = device.createCommandEncoder();

    const computePass = commandEncoder.beginComputePass();
    computePass.setPipeline(computePipeline);
    computePass.setBindGroup(0, computeBindGroup);
    computePass.dispatchWorkgroups(
      Math.ceil(textureSize[0] / 8),
      Math.ceil(textureSize[1] / 8)
    );
    computePass.end();

    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 1 },
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    });

    renderPass.setPipeline(renderPipeline);
    renderPass.setBindGroup(0, renderBindGroup);
    renderPass.draw(6);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
  }

  visualizer.editor.addEventListener("graph-compiled", () => {
    updateCanvas = async () => {
      if (visualizer.state.viewMode !== NoiseViewModes.View3D) return true;
      const endX = visualizer.state.textureSize.x;
      const endY = visualizer.state.textureSize.y;
      const strideX = 16;
      const strideY = 16;
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
        const sectorX = startX / 16;
        const sectorZ = startY / 16;
        const index = sectorZ + sectorsZ * sectorX;
        //   buffer.fill(0xffffffffff);
        uploadBuffer.set(buffer, sectorSize * index);
      }
      device.queue.writeBuffer(voxelBuffer, 0, uploadBuffer);

      frame();
    };
    updateCanvas();
  });

  updateSunPosition(300, 300, 300);

  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Download Image";
  downloadButton.onclick = () => {
    downloadImageFromTexture(
      device,
      textureSize,
      format,
      computePipeline,
      computeBindGroup,
      renderPipeline,
      renderBindGroup
    );
  };

  visualizer.addEventListener("offset-updated", ({ data }) => {
    requestGenUpdate();
  });
  visualizer.addEventListener("view-mode-changed", ({ data }) => {
    console.warn("view mode changed", data.viewMode);
    requestGenUpdate();
  });

  return canvas;
}
