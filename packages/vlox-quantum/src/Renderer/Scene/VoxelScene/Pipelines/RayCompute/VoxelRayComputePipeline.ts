import { PerspectiveCamera } from "../../../../Camera/PerspectiveCamera";
import { VoxelRayRender } from "../../Shaders/VoxelRayRender";
import { VoxelScene } from "../../VoxelScene";
import { AOBlurPipeline } from "./AOBlurPipeline";

export class VoxelRayComputePipeline {
  _pipeline: GPUComputePipeline;

  _dataBindgroupLayout: GPUBindGroupLayout;
  _dataBindGroup: GPUBindGroup;

  _commonBindGroupLayout: GPUBindGroupLayout;
  _commonBindGroup: GPUBindGroup;

  _lightTexture: GPUTexture;
  _lightTextureView: GPUTextureView;

  _aoTexture: GPUTexture;
  _aoTextureView: GPUTextureView;

  _outputTextureBindGroupLaytout: GPUBindGroupLayout;
  _outputTextureBindGroup: GPUBindGroup;

  //aoBlurPipeline: AOBlurPipeline;

  constructor(public scene: VoxelScene) {}

  async init() {
    const module = this.scene.scene.engine.device.createShaderModule({
      label: "",
      code: VoxelRayRender.Create(),
    });

    this._commonBindGroupLayout =
      this.scene.scene.engine.device.createBindGroupLayout({
        entries: [
          {
            binding: 0, //camera struct
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
              type: "uniform",
            },
          },
          {
            binding: 1, //scene props struct
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
              type: "uniform",
            },
          },
          {
            binding: 2, //time
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
              type: "uniform",
            },
          },
        ],
      });

    this._dataBindgroupLayout =
      this.scene.scene.engine.device.createBindGroupLayout({
        entries: [
          {
            binding: 0, //vertex
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
              type: "read-only-storage",
            },
          },
          {
            binding: 1, //index
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
              type: "read-only-storage",
            },
          },
          {
            binding: 2, //mesh register
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
              type: "read-only-storage",
            },
          },
          {
            binding: 3, //bvh tree register
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
              type: "read-only-storage",
            },
          },
          {
            binding: 4, //bvh index register
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
              type: "read-only-storage",
            },
          },
        ],
      });

    this._outputTextureBindGroupLaytout =
      this.scene.scene.engine.device.createBindGroupLayout({
        entries: [
          //normal texture
          {
            binding: 0,
            visibility: GPUShaderStage.COMPUTE,
            texture: {
              sampleType: "unfilterable-float",
            },
          },
          //position texture
          {
            binding: 1,
            visibility: GPUShaderStage.COMPUTE,
            texture: {
              sampleType: "unfilterable-float",
            },
          },
          //light texture
          {
            binding: 2,
            visibility: GPUShaderStage.COMPUTE,
            storageTexture: {
              access: "write-only", // Access type
              format: "rgba32float", // Must match the texture format
            },
          },
          //ao texture
          {
            binding: 3,
            visibility: GPUShaderStage.COMPUTE,
            storageTexture: {
              access: "write-only", // Access type
              format: "rgba16float", // Must match the texture format
            },
          },
        ],
      });

    const pipelineLayout = this.scene.scene.engine.device.createPipelineLayout({
      bindGroupLayouts: [
        this._commonBindGroupLayout, // @group(0)
        this._dataBindgroupLayout, // @group(1)
        this._outputTextureBindGroupLaytout,
      ],
    });

    this._pipeline = this.scene.scene.engine.device.createComputePipeline({
      layout: pipelineLayout,
      compute: {
        module,
        entryPoint: "main",
      },
    });

    this._dataBindGroup = this.scene.scene.engine.device.createBindGroup({
      label: "Data bindgroup",
      layout: this._dataBindgroupLayout,
      entries: [
        { binding: 0, resource: { buffer: this.scene.meshes._vertexBuffer } },
        { binding: 1, resource: { buffer: this.scene.meshes._indexBuffer } },
        {
          binding: 2,
          resource: { buffer: this.scene.meshes.register._meshStructBuffer },
        },
        {
          binding: 3,
          resource: { buffer: this.scene.meshes.register._bvhTreeBuffer },
        },
        {
          binding: 4,
          resource: { buffer: this.scene.meshes.register._indiceBuffer },
        },
      ],
    });

    //  this.aoBlurPipeline = new AOBlurPipeline(this.scene.scene);
    //  await this.aoBlurPipeline.init();
  }

  createTexture(width: number, height: number) {
    if (this._lightTexture) this._lightTexture.destroy();
    console.warn("Create compute texture", width, height);

    this._lightTexture = this.scene.scene.engine.device.createTexture({
      size: [width / 2, height / 2, 1],
      format: "rgba32float",
      usage:
        GPUTextureUsage.STORAGE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_SRC,
    });
    this._lightTextureView = this._lightTexture.createView();

    this._aoTexture = this.scene.scene.engine.device.createTexture({
      size: [width / 2, height / 2, 1],
      format: "rgba16float",
      usage:
        GPUTextureUsage.STORAGE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_SRC,
    });
    this._aoTextureView = this._aoTexture.createView();

    this._outputTextureBindGroup =
      this.scene.scene.engine.device.createBindGroup({
        layout: this._outputTextureBindGroupLaytout,
        entries: [
          {
            binding: 0,
            resource: this.scene.renderPipeline._normalTexture!.createView(),
          },
          {
            binding: 1,
            resource: this.scene.renderPipeline._positionTexture!.createView(),
          },
          {
            binding: 2,
            resource: this._lightTextureView,
          },
          {
            binding: 3,
            resource: this._aoTextureView,
          },
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
        { binding: 2, resource: { buffer: this.scene._timeBuffer } },
      ],
    });
  }

  render() {
    //   const t = performance.now();
    const commandEncoder =
      this.scene.scene.engine.device.createCommandEncoder();
    const pass = commandEncoder.beginComputePass();

    const width = this._lightTexture.width;
    const height = this._lightTexture.height;

    pass.setPipeline(this._pipeline);
    pass.setBindGroup(0, this._commonBindGroup);
    pass.setBindGroup(1, this._dataBindGroup);
    pass.setBindGroup(2, this._outputTextureBindGroup);

    pass.dispatchWorkgroups(Math.ceil(width / 8), Math.ceil(height / 8));

    pass.end();

    this.scene.scene.engine.device.queue.submit([commandEncoder.finish()]);
    /*     this.scene.scene.engine.device.queue
      .onSubmittedWorkDone()
      .finally(() => {console.clear(); console.log(performance.now() - t)}); */
  }
}
