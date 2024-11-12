import { Texture } from "../../Core/Textures/Texture";
import { QuantumEngine } from "../../Engine/QuantumEngine";
import { RaySceneCompute } from "./RaySceneCompute";

export class RayPipeline {
  engine: QuantumEngine;
  quadVertexBuffer: GPUBuffer;
  renderPipeline: GPURenderPipeline;
  bindGroup: GPUBindGroup;


  outputTexture: Texture;

  rayScene: RaySceneCompute;
  constructor(canvas: HTMLCanvasElement | OffscreenCanvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.engine = new QuantumEngine(canvas);
  }

  async init(rayScene: RaySceneCompute) {
    await this.engine.init();
    this.initBuffers();
    this.createOutputTexture();
    await this.initMaterial();
    this.rayScene = rayScene;
  }

  initBuffers() {
    const quadVertices = new Float32Array([
      // x, y, u, v
      // vertex 1
      -1.0, -1.0, 0.0, 0.0,
      // vertex 2
      1.0, -1.0, 1.0, 0.0,
      // vertex 3
      -1.0, 1.0, 0.0, 1.0,
      // vertex 4
      1.0, 1.0, 1.0, 1.0,
    ]);

    this.quadVertexBuffer = this.engine.device.createBuffer({
      size: quadVertices.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    });
    new Float32Array(this.quadVertexBuffer.getMappedRange()).set(quadVertices);
    this.quadVertexBuffer.unmap();
  }

  async initMaterial() {
    const format = this.engine.presentationFormat;
    const vertexShaderCode = /* wgsl */ `
    struct VertexOutput {
      @builtin(position) position : vec4<f32>,
      @location(0) uv : vec2<f32>,
    };

    @vertex
    fn main(@location(0) position: vec4<f32>, @location(1) uv: vec2<f32>) -> VertexOutput {
      var output: VertexOutput;
      output.position = position;
      output.uv = uv;
      return output;
    }
    `;

    const fragmentShaderCode = /* wgsl */ `
    @group(0) @binding(0) var mySampler: sampler;
    @group(0) @binding(1) var myTexture: texture_2d<f32>;

    @fragment
    fn main(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
      return  textureSample(myTexture, mySampler, uv);
    }
    `;

    const vertexShaderModule = this.engine.device.createShaderModule({
      code: vertexShaderCode,
    });

    const fragmentShaderModule = this.engine.device.createShaderModule({
      code: fragmentShaderCode,
    });
    const bindGroupLayout = this.engine.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.FRAGMENT,
          sampler: { type: "non-filtering" },
        },
        {
          binding: 1,

          visibility: GPUShaderStage.FRAGMENT,
          texture: { sampleType: "unfilterable-float" },
        },
      ],
    });
    this.renderPipeline = this.engine.device.createRenderPipeline({
      label: "hardcoded textured quad pipeline",
      layout: this.engine.device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
      }),
      vertex: {
        module: vertexShaderModule,
        entryPoint: "main",
        buffers: [
          {
            arrayStride: 4 * 4,
            attributes: [
              {
                shaderLocation: 0,
                offset: 0,
                format: "float32x2",
              },
              {
                shaderLocation: 1,
                offset: 2 * 4,
                format: "float32x2",
              },
            ],
          },
        ],
      },
      fragment: {
        module: fragmentShaderModule,
        entryPoint: "main",
        targets: [{ format: format }],
      },
      primitive: {
        upology: "triangle-strip",
      },
    });

    const textureView = this.outputTexture._texture.createView({
      format: "rgba32float",
    });
    const sampler = this.engine.device.createSampler();

    this.bindGroup = this.engine.device.createBindGroup({
      layout: this.renderPipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: sampler },
        { binding: 1, resource: textureView },
      ],
    });
  }

  render() {
    /*     const render = () => {
      this._renderPass();
      requestAnimationFrame(render);
    };
    render(); */

    this._renderPass();
  }

  createOutputTexture() {
    this.outputTexture = new Texture(
      this.engine,
      "outputTexture",
      {
        size: [this.engine.canvas.width, this.engine.canvas.height],
        format: "rgba32float",
        usage:
          GPUTextureUsage.TEXTURE_BINDING |
          GPUTextureUsage.COPY_DST |
          GPUTextureUsage.RENDER_ATTACHMENT |
          GPUTextureUsage.STORAGE_BINDING,
      },
      "var outputTexture: texture_storage_2d<rgba32float, write>"
    );


  }

  private _renderPass() {
    this.rayScene.compute();
    const commandEncoder = this.engine.device.createCommandEncoder();
    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: this.engine.context.getCurrentTexture().createView(),
          clearValue: [0.3, 0.3, 0.3, 1],
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(this.renderPipeline);
    passEncoder.setVertexBuffer(0, this.quadVertexBuffer);
    passEncoder.setBindGroup(0, this.bindGroup);
    passEncoder.draw(4, 1, 0, 0);
    passEncoder.end();

    const gpuCommandBuffer = commandEncoder.finish();
    this.engine.device.queue.submit([gpuCommandBuffer]);
  }
}
