import { VoxelScene } from "../VoxelScene";
import { PerspectiveCamera } from "../../../Camera/PerspectiveCamera";
import { VoxelFinalRender } from "../Shaders/VoxelFinalRender";

export class VoxelFinalPipeLine {
  _module: GPUShaderModule;
  _pipeline: GPURenderPipeline;

  _depthTextre: GPUTexture | null = null;

  _commonBindGroupLayout: GPUBindGroupLayout;
  _commonBindGroup: GPUBindGroup;

  _textureBindGroupLayout: GPUBindGroupLayout;
  _textureBindGroup: GPUBindGroup;

  _quadVertexBuffer: GPUBuffer;
  constructor(public scene: VoxelScene) {}

  async init() {
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

    console.log(quadVertices);
    this._quadVertexBuffer = this.scene.scene.engine.device.createBuffer({
      size: quadVertices.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    });
    new Float32Array(this._quadVertexBuffer.getMappedRange()).set(quadVertices);
    this._quadVertexBuffer.unmap();

    const module = this.scene.scene.engine.device.createShaderModule({
      label: "",
      code: VoxelFinalRender.Create(),
    });

    this._commonBindGroupLayout =
      this.scene.scene.engine.device.createBindGroupLayout({
        entries: [
          {
            binding: 0, //camera
            visibility: GPUShaderStage.VERTEX,
            buffer: {
              type: "uniform",
            },
          },
          {
            binding: 1, //scene props
            visibility: GPUShaderStage.VERTEX,
            buffer: {
              type: "uniform",
            },
          },
        ],
      });

    this._textureBindGroupLayout =
      this.scene.scene.engine.device.createBindGroupLayout({
        entries: [
          //scene texture
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
          //normal texture
          {
            binding: 2,
            visibility: GPUShaderStage.FRAGMENT,
            sampler: { type: "non-filtering" },
          },
          {
            binding: 3,
            visibility: GPUShaderStage.FRAGMENT,
            texture: { sampleType: "unfilterable-float" },
          },
          //light texture
          {
            binding: 4,
            visibility: GPUShaderStage.FRAGMENT,
            sampler: { type: "non-filtering" },
          },
          {
            binding: 5,
            visibility: GPUShaderStage.FRAGMENT,
            texture: { sampleType: "unfilterable-float" },
          },
          //ao texture
          {
            binding: 6,
            visibility: GPUShaderStage.FRAGMENT,
            sampler: { type: "filtering" },
          },
          {
            binding: 7,
            visibility: GPUShaderStage.FRAGMENT,
            texture: { sampleType: "float" },
          },
        ],
      });

    const pipelineLayout = this.scene.scene.engine.device.createPipelineLayout({
      bindGroupLayouts: [
        this._commonBindGroupLayout, // @group(0)
        this._textureBindGroupLayout, // @group(1)
      ],
    });

    const pipeline = this.scene.scene.engine.device.createRenderPipeline({
      layout: pipelineLayout,
      label: "",
      vertex: {
        module,
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
        module,
        targets: [{ format: this.scene.scene.engine.presentationFormat }],
      },
      primitive: {
        topology: "triangle-strip",
      },
    });

    this._module = module;
    this._pipeline = pipeline;
  }

  setTextures(
    sceneTexture: GPUTexture,
    normalTexture: GPUTexture,
    lightTexture: GPUTexture,
    aoTexture: GPUTexture
  ) {
    const sceneTextureView = sceneTexture.createView({
      format: this.scene.scene.engine.presentationFormat,
    });
    const sceneTextureSampler = this.scene.scene.engine.device.createSampler();
    const normalTextureView = normalTexture.createView({
      format: "rgba16float",
    });
    const normalTextureSampler = this.scene.scene.engine.device.createSampler({});
    const lightTextureView = lightTexture.createView({
      format: "rgba32float",
    });
    const lightTextureSampler = this.scene.scene.engine.device.createSampler();
    const aoTextureView = aoTexture.createView({
      format: "rgba16float",
    });
    const aoTextureSampler = this.scene.scene.engine.device.createSampler({
      minFilter: "linear",
      magFilter: "linear",
    });

    this._textureBindGroup = this.scene.scene.engine.device.createBindGroup({
      layout: this._textureBindGroupLayout,
      entries: [
        { binding: 0, resource: sceneTextureSampler },
        { binding: 1, resource: sceneTextureView },
        { binding: 2, resource: normalTextureSampler },
        { binding: 3, resource: normalTextureView },
        { binding: 4, resource: lightTextureSampler },
        { binding: 5, resource: lightTextureView },
        { binding: 6, resource: aoTextureSampler },
        { binding: 7, resource: aoTextureView },
      ],
    });
  }

  setCamera(camera: PerspectiveCamera) {
    this._commonBindGroup = this.scene.scene.engine.device.createBindGroup({
      label: "Common bindgroup",
      layout: this._commonBindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: camera._cameraDataUniformBuffer } },
        { binding: 1, resource: { buffer: this.scene._scenePropsBuffer } },
      ],
    });
  }

  render() {
    const encoder = this.scene.scene.engine.device.createCommandEncoder();
    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: this.scene.scene.engine.context
            .getCurrentTexture()
            .createView(),
          clearValue: [0.3, 0.3, 0.3, 1],
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    };

    const pass = encoder.beginRenderPass(renderPassDescriptor);
    pass.setPipeline(this._pipeline);
    pass.setVertexBuffer(0, this._quadVertexBuffer);
    pass.setBindGroup(0, this._commonBindGroup);
    pass.setBindGroup(1, this._textureBindGroup);

    pass.draw(4, 1, 0, 0);
    pass.end();

    const gpuCommandBuffer = encoder.finish();
    this.scene.scene.engine.device.queue.submit([gpuCommandBuffer]);
  }
}
