import { RayPipeline } from "./RayPipeline";
import { SDFShader } from "./SDFShader";
import { VoxelShader } from "./VoxelShader";

export class RaySceneCompute {
  private computePipeline: GPUComputePipeline;
  voxelLookUpTableBuffer: GPUBuffer;
  voxelGridBuffer: GPUBuffer;

  constructor(public pipeline: RayPipeline) {
    this.setupComputePipeline();
  }

  setBuffers(voxelLookUpTableData: Uint8Array, voxelGridData: Uint32Array) {
    this.voxelLookUpTableBuffer = this.pipeline.engine.device.createBuffer({
      size: voxelLookUpTableData.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    this.voxelGridBuffer = this.pipeline.engine.device.createBuffer({
      size: voxelGridData.byteLength,

      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    // Upload data to the buffers
    this.pipeline.engine.device.queue.writeBuffer(
      this.voxelLookUpTableBuffer,
      0,
      voxelLookUpTableData.buffer
    );
    this.pipeline.engine.device.queue.writeBuffer(
      this.voxelGridBuffer,
      0,
      voxelGridData.buffer
    );
  }

  private setupComputePipeline() {
    const device = this.pipeline.engine.device;
    const shaderCode = /* wgsl */ `
      ${VoxelShader.define}
      @group(0) @binding(0) var<storage, read_write> voxelLookUpTable: VoxelLookup;
      @group(0) @binding(1) var<storage, read_write> voxelGrid: VoxelData;
      @group(0) @binding(2) var outputTexture: texture_storage_2d<rgba32float, write>;



      ${VoxelShader.functions}
      @compute @workgroup_size(8, 8, 1)
      fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
          textureStore(
          outputTexture, 
          vec2<i32>(global_id.xy), 
          mainFragment(vec2<f32>(f32(global_id.x),f32(global_id.y))) 
          );
      }
    `;

    const shaderModule = device.createShaderModule({ code: shaderCode });
    const bindGroupLayout = this.pipeline.engine.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.COMPUTE,
          buffer: { type: "storage" },
        },
        {
          binding: 1,
          visibility: GPUShaderStage.COMPUTE,
          buffer: { type: "storage" },
        },
        {
          binding: 2,
          visibility: GPUShaderStage.COMPUTE,
          storageTexture: { format: "rgba32float" },
        },
      ],
    });

    this.computePipeline = device.createComputePipeline({
      layout: this.pipeline.engine.device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
      }),
      compute: {
        module: shaderModule,
        entryPoint: "main",
      },
    });
  }

  compute() {
    if(!this.voxelGridBuffer || !this.voxelLookUpTableBuffer) return;
    const device = this.pipeline.engine.device;
    const commandEncoder = device.createCommandEncoder();

    const bindGroup = device.createBindGroup({
      layout: this.computePipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this.voxelLookUpTableBuffer } },
        { binding: 1, resource: { buffer: this.voxelGridBuffer } },
        { binding: 2, resource: this.pipeline.outputTexture.createView() },
      ],
    });

    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(this.computePipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(
      Math.ceil(this.pipeline.engine.canvas.width / 8),
      Math.ceil(this.pipeline.engine.canvas.height / 8)
    );
    passEncoder.end();

    const commands = commandEncoder.finish();
    device.queue.submit([commands]);
  }
}
