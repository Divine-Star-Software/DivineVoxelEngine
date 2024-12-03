import { VoxelMeshTypes } from "@divinevoxel/vlox/Mesher/Types/VoxelMesh.types";
import { VoxelTriangleRender } from "../Shaders/VoxelTriangleRender";
import { VoxelScene } from "../VoxelScene";
import { PerspectiveCamera } from "../../../Camera/PerspectiveCamera";
import { VoxelMesh } from "../Meshes/VoxelMesh";

export class VoxelMeshRenderPipeline {
  _module: GPUShaderModule;
  _pipeline: GPURenderPipeline;
  _descriptor: GPURenderPassDescriptor;
  _depthTextre: GPUTexture | null = null;

  _meshBindGroupLayout: GPUBindGroupLayout;

  _commonBindGroupLayout: GPUBindGroupLayout;
  _commonBindGroup: GPUBindGroup;

  _outputTexture: GPUTexture;

  constructor(public scene: VoxelScene) {}

  async init() {
    const module = this.scene.scene.engine.device.createShaderModule({
      label: "",
      code: VoxelTriangleRender.Create(),
    });
    this._descriptor = {
      label: "our basic canvas renderPass",
      colorAttachments: [
        {
          view: {} as any,
          clearValue: [0.3, 0.3, 0.3, 1],
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

    this._meshBindGroupLayout =
      this.scene.scene.engine.device.createBindGroupLayout({
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

    const pipelineLayout = this.scene.scene.engine.device.createPipelineLayout({
      bindGroupLayouts: [
        this._commonBindGroupLayout, // @group(0)
        this._meshBindGroupLayout, // @group(1)
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
              { shaderLocation: 2, offset: 32, format: "float32" }, // voxelData: f32
              { shaderLocation: 3, offset: 36, format: "float32x3" }, // textureIndex: vec3f
              { shaderLocation: 4, offset: 52, format: "float32x2" }, // uv: vec2f
              { shaderLocation: 5, offset: 60, format: "float32x3" }, // colors: vec3f
              { shaderLocation: 6, offset: 76, format: "float32x4" }, // padding: vec4f
            ],
          },
        ],
      },
      fragment: {
        module,
        targets: [{ format: this.scene.scene.engine.presentationFormat }],
      },
      primitive: {
        frontFace: "cw",
        cullMode: "back",
      },
      depthStencil: {
        depthWriteEnabled: true,
        depthCompare: "less",
        format: "depth24plus",
      },
    });

    this._module = module;
    this._pipeline = pipeline;
  }

  createTexture(width: number, height: number) {
    if (this._outputTexture) this._outputTexture.destroy();

    this._outputTexture = this.scene.scene.engine.device.createTexture({
      size: [width, height, 1], // Width, height, and depth/layers
      format: this.scene.scene.engine.presentationFormat, // Texture format
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
      ],
    });
  }

  render() {
    const canvasTexture = this.scene.scene.engine.context.getCurrentTexture();
    (
      this._descriptor.colorAttachments as GPURenderPassColorAttachment[]
    )[0].view = this._outputTexture.createView();

    let depthTexture = this._depthTextre;
    if (
      !depthTexture ||
      depthTexture.width !== canvasTexture.width ||
      depthTexture.height !== canvasTexture.height
    ) {
      if (depthTexture) {
        depthTexture.destroy();
      }

      depthTexture = this.scene.scene.engine.device.createTexture({
        size: [canvasTexture.width, canvasTexture.height],
        format: "depth24plus",
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
      });
    }
    this._descriptor.depthStencilAttachment!.view = depthTexture.createView();
    this._depthTextre = depthTexture;

    const encoder = this.scene.scene.engine.device.createCommandEncoder({
      label: "our encoder",
    });
    const pass = encoder.beginRenderPass(this._descriptor);
    pass.setPipeline(this._pipeline);
    pass.setBindGroup(0, this._commonBindGroup);

    let voxelMesh: VoxelMesh | null = this.scene.meshes._meshes;
    pass.setVertexBuffer(0, this.scene.meshes._vertexBuffer);
    pass.setIndexBuffer(this.scene.meshes._indexBuffer, "uint32");

    while (voxelMesh) {
      pass.setBindGroup(1, voxelMesh.bindGroup);

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
