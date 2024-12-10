import { VoxelMeshTypes } from "@divinevoxel/vlox/Mesher/Types/VoxelMesh.types";
import { VoxelTriangleRender } from "../Shaders/VoxelTriangleRender";
import { VoxelScene } from "../VoxelScene";
import { PerspectiveCamera } from "../../../Camera/PerspectiveCamera";
import { VoxelMesh } from "../Meshes/VoxelMesh";
import { ImageArrayTexture } from "Renderer/Textures/ImageArrayTexture";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";

export class VoxelMeshRenderPipeline {
  _module: GPUShaderModule;
  _pipeline: GPURenderPipeline;
  _descriptor: GPURenderPassDescriptor;

  _meshBindGroupLayout: GPUBindGroupLayout;

  _commonBindGroupLayout: GPUBindGroupLayout;
  _commonBindGroup: GPUBindGroup;

  _outputTexture: GPUTexture;
  _depthTexture: GPUTexture | null = null;
  _normalTexture: GPUTexture;
  _positionTexture: GPUTexture;

  _textureBindGroupLayout: GPUBindGroupLayout;
  _textureBindGroup: GPUBindGroup;

  _voxelTexture: ImageArrayTexture;
  constructor(public scene: VoxelScene) {}

  async init() {
    const device = this.scene.scene.engine.device;
    const module = device.createShaderModule({
      label: "",
      code: VoxelTriangleRender.Create(),
    });

    this._descriptor = {
      label: "our basic canvas renderPass",
      colorAttachments: [
        {
          view: {} as any,
          clearValue: [1, 1, 1, 1],
          loadOp: "clear",
          storeOp: "store",
        },
        {
          view: {} as any,
          clearValue: [1, 1, 1, 1],
          loadOp: "clear",
          storeOp: "store",
        },
        {
          view: {} as any,
          clearValue: [0, 0, 0, 0],
          loadOp: "clear",
          storeOp: "store",
        },
      ],
      depthStencilAttachment: {
        view: {} as any,
        depthClearValue: 1.0,
        depthLoadOp: "clear",
        depthStoreOp: "store",
      },
    };
    this._commonBindGroupLayout = device.createBindGroupLayout({
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
        {
          binding: 2, //time
          visibility: GPUShaderStage.VERTEX,
          buffer: {
            type: "uniform",
          },
        },
      ],
    });

    this._meshBindGroupLayout = device.createBindGroupLayout({
      entries: [
        {
          binding: 0, //vertex
          visibility: GPUShaderStage.VERTEX,
          buffer: {
            type: "uniform",
          },
        },
      ],
    });

    this._voxelTexture =
      TextureManager.textureTypes.get("#dve_voxel")!.shaderTexture;

    this._textureBindGroupLayout = device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.FRAGMENT,
          texture: {
            viewDimension: "2d-array", // Texture array binding
            sampleType: "float",
          },
        },
        {
          binding: 1,
          visibility: GPUShaderStage.FRAGMENT,
          sampler: {
            type: "filtering",
          },
        },
      ],
    });

    this._textureBindGroup = device.createBindGroup({
      layout: this._textureBindGroupLayout,
      entries: [
        {
          binding: 0,
          resource: this._voxelTexture.createView(),
        },
        {
          binding: 1,
          resource: this._voxelTexture._smapler,
        },
      ],
    });

    const pipelineLayout = this.scene.scene.engine.device.createPipelineLayout({
      bindGroupLayouts: [
        this._commonBindGroupLayout, // @group(0)
        this._textureBindGroupLayout, // @group(1)
        this._meshBindGroupLayout, // @group(2)
      ],
    });

    const pipeline = this.scene.scene.engine.device.createRenderPipeline({
      layout: pipelineLayout,
      label: "",
      vertex: {
        module,
        buffers: [
          {
            arrayStride: VoxelMeshTypes.vertexStrideBytes,
            attributes: [
              { shaderLocation: 0, offset: 0, format: "float32x3" }, // position: vec3f
              { shaderLocation: 1, offset: 16, format: "float32x3" }, // normal: vec3f
              { shaderLocation: 2, offset: 32, format: "float32x3" }, // textureIndex: vec3f
              { shaderLocation: 3, offset: 48, format: "float32x2" }, // uv: vec2f
              { shaderLocation: 4, offset: 56, format: "float32x3" }, // colors: vec3f
              { shaderLocation: 5, offset: 72, format: "float32" }, // voxelData: f32
              { shaderLocation: 6, offset: 76, format: "float32x4" }, // padding: vec4f
            ],
          },
        ],
      },

      fragment: {
        module,

        targets: [
          { format: this.scene.scene.engine.presentationFormat },
          { format: "rgba16float" },
          { format: "rgba32float" },
        ],
      },
      /*     primitive: {
        frontFace: "cw",
        cullMode: "back",
      }, */
      depthStencil: {
        depthWriteEnabled: true,
        depthCompare: "less",
        format: "depth32float",
      },
    });

    this._module = module;
    this._pipeline = pipeline;
  }

  createTexture(width: number, height: number) {
    console.warn("Create render texture", width, height);
    if (this._outputTexture) this._outputTexture.destroy();
    this._outputTexture = this.scene.scene.engine.device.createTexture({
      size: [width, height, 1],
      format: this.scene.scene.engine.presentationFormat,
      usage:
        GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
    });

    if (this._normalTexture) this._normalTexture.destroy();
    this._normalTexture = this.scene.scene.engine.device.createTexture({
      size: [width, height, 1],
      format: "rgba16float",
      usage:
        GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
    });

    if (this._positionTexture) this._positionTexture.destroy();
    this._positionTexture = this.scene.scene.engine.device.createTexture({
      size: [width, height, 1],
      format: "rgba32float",
      usage:
        GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
    });

    if (this._depthTexture) this._depthTexture.destroy();
    console.warn("make dpeth texture", width, height);
    this._depthTexture = this.scene.scene.engine.device.createTexture({
      size: [width, height],
      format: "depth32float",
      usage:
        GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
    });
  }

  setCamera(camera: PerspectiveCamera) {
    this._commonBindGroup = this.scene.scene.engine.device.createBindGroup({
      label: "Common bindgroup",
      layout: this._commonBindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: camera._cameraDataUniformBuffer } },
        { binding: 1, resource: { buffer: this.scene._scenePropsBuffer } },
        { binding: 2, resource: { buffer: this.scene._timeBuffer } },
      ],
    });
  }

  render() {
    (
      this._descriptor.colorAttachments as GPURenderPassColorAttachment[]
    )[0].view = this._outputTexture.createView();
    (
      this._descriptor.colorAttachments as GPURenderPassColorAttachment[]
    )[1].view = this._normalTexture.createView({
      format: "rgba16float",
    });
    (
      this._descriptor.colorAttachments as GPURenderPassColorAttachment[]
    )[2].view = this._positionTexture.createView({
      format: "rgba32float",
    });

    this._descriptor.depthStencilAttachment!.view =
      this._depthTexture!.createView();

    const encoder = this.scene.scene.engine.device.createCommandEncoder({
      label: "voxel render pass",
    });
    const pass = encoder.beginRenderPass(this._descriptor);
    pass.setPipeline(this._pipeline);
    pass.setBindGroup(0, this._commonBindGroup);

    let voxelMesh: VoxelMesh | null = this.scene.meshes._meshes;
    pass.setVertexBuffer(0, this.scene.meshes._vertexBuffer);
    pass.setIndexBuffer(this.scene.meshes._indexBuffer, "uint32");

    pass.setBindGroup(1, this._textureBindGroup);
    while (voxelMesh) {
      pass.setBindGroup(2, voxelMesh.bindGroup);

      pass.drawIndexed(
        voxelMesh.data.indicesLength,
        undefined,
        voxelMesh.data.indicesStartIndex,
        voxelMesh.data.verticesStartIndex
      );

      voxelMesh = voxelMesh.next;
    }
    pass.end();
    const commandBuffer = encoder.finish();
    this.scene.scene.engine.device.queue.submit([commandBuffer]);
  }
}
