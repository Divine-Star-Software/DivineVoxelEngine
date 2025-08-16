import { StorageBuffer } from "../../Core/Buffers/StorageBuffer";
import { BindGroup } from "../../Core/Bind/BindGroup";
import { RayPipeline } from "./RayPipeline";
import { Texture } from "../../Core/Textures/Texture";
import { TextureSampler } from "../../Core/Textures/TextureSampler";
import { UniformBuffer } from "../../Core/Buffers/UniformBuffer";

type RaySceneComputeInitData = {
  uniforms: UniformBuffer[];
  buffers: StorageBuffer[];
  textures: Texture[];
  sampler: TextureSampler[];
  code: {
    up: string;
    beforeMain: string;
  };
};

export class RaySceneCompute {
  private computePipeline: GPUComputePipeline;
  bindGroup: BindGroup;
  _initalized = false;

  constructor(public pipeline: RayPipeline) {}

  init(data: RaySceneComputeInitData) {
    this.bindGroup = new BindGroup(this.pipeline.engine);
    this.bindGroup.addTexture(this.pipeline.outputTexture, {
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      storageTexture: { format: "rgba32float" },
    });
    for (const buffers of data.uniforms) {
      this.bindGroup.addUniform(buffers, {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type:"uniform" },
      });
    }
    for (const buffers of data.buffers) {
      this.bindGroup.addBuffer(buffers, {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: "storage" },
      });
    }
    for (const buffers of data.buffers) {
      this.bindGroup.addBuffer(buffers, {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: "storage" },
      });
    }
    for (const texture of data.textures) {
      this.bindGroup.addTexture(texture, {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        storageTexture: { format: "rgba32float" },
      });
    }
    for (const sampler of data.sampler) {
      this.bindGroup.addSampler(sampler, {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        sampler: { type: "non-filtering" },
      });
    }
    const device = this.pipeline.engine.device;
    const shaderCode = /* wgsl */ `
      ${data.code.up}
      ${this.bindGroup.createGroupCode()}

      ${data.code.beforeMain}
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
    const bindGroupLayout = this.pipeline.engine.device.createBindGroupLayout(
      this.bindGroup.getLayout()
    );

    this.computePipeline = device.createComputePipeline({
      layout: this.pipeline.engine.device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
      }),
      compute: {
        module: shaderModule,
        entryPoint: "main",
      },
    });
    this._initalized = true;
  }

  compute() {
    if (!this._initalized) return;
    const device = this.pipeline.engine.device;
    const commandEncoder = device.createCommandEncoder();

    const bindGroup = this.bindGroup.createBindGroup(
      this.computePipeline.getBindGroupLayout(this.bindGroup.index)
    );

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
