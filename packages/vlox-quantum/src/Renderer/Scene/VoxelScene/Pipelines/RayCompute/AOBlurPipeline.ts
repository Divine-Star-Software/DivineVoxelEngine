import { Scene } from "../../../Scene";

export class AOBlurPipeline {
  _pipeline: GPUComputePipeline;
  _bindGroupLayout: GPUBindGroupLayout;
  _bindGroup: GPUBindGroup;

  _outputTexture: GPUTexture;
  _outputTextureView: GPUTextureView;

  _textureSizeUniform = new Float32Array(2);
  _textureSizeUniformBuffer: GPUBuffer;

  _kernalWeightUniform = new Float32Array(5 * 2);
  _kernelWeightUniformBuffer: GPUBuffer;

  _inputTextureView: GPUTextureView;
  _guideTextureView: GPUTextureView;

  constructor(public scene: Scene) {}

  async init() {
    const module = this.scene.engine.device.createShaderModule({
      label: "",
      code: /* wgsl */ `
@group(0) @binding(0) var inputTexture: texture_storage_2d<rgba32float, write>;
@group(0) @binding(1) var outputTexture: texture_storage_2d<rgba32float, write>;
@group(0) @binding(2) var<uniform> textureSize : vec2<u32>;
@group(0) @binding(3) var guideTexture: texture_storage_2d<rgba32float, write>;
@group(0) @binding(4) var<uniform> kernelWeights : array<vec4<f32>, 5>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) global_id : vec3<u32>) {
    let x = global_id.x;
    let y = global_id.y;

    if (x >= textureSize.x || y >= textureSize.y) {
        return;
    }

    let idx = y * textureSize.x + x;
    var color : vec4<f32> = vec4(0.0);
    var weightSum : f32 = 0.0;

    // Loop through the kernel
    let kernelOffsets = array<i32, 5>(-2, -1, 0, 1, 2);
    for (var ky = 0; ky < 5; ky++) {
        for (var kx = 0; kx < 5; kx++) {
            let offsetX = x + u32(kernelOffsets[kx]);
            let offsetY = y + u32(kernelOffsets[ky]);
            if (offsetX < 0 || offsetX >= textureSize.x || offsetY < 0 || offsetY >= textureSize.y) {
                continue;
            }

            let neighborIdx = offsetY * textureSize.x + offsetX;
            let neighborColor = inputTexture[neighborIdx];
            let guideColor = guideTexture[idx];
            let diff = length(guideColor.rgb - neighborColor.rgb);

            // Apply edge-aware weight
            let weight = kernelWeights[kx] * kernelWeights[ky] * exp(-diff * diff);
            color += neighborColor * weight;
            weightSum += weight;
        }
    }

    // Normalize the result
    outputTexture[idx] = color / weightSum;
}`,
    });
    this._textureSizeUniformBuffer = this.scene.engine.device.createBuffer({
      usage: GPUBufferUsage.UNIFORM,
      size: this._textureSizeUniform.byteLength,
    });

    this._kernelWeightUniformBuffer = this.scene.engine.device.createBuffer({
      usage: GPUBufferUsage.UNIFORM,
      size: this._kernalWeightUniform.byteLength,
    });

    this._bindGroupLayout = this.scene.engine.device.createBindGroupLayout({
      entries: [
        {
          binding: 0, //input texture
          visibility: GPUShaderStage.COMPUTE,
          buffer: {
            type: "storage",
          },
        },
        {
          binding: 1, //output texture
          visibility: GPUShaderStage.COMPUTE,
          buffer: {
            type: "storage",
          },
        },
        {
          binding: 2, //texture size
          visibility: GPUShaderStage.COMPUTE,
          buffer: {
            type: "uniform",
          },
        },
        {
          binding: 3, //guide texture
          visibility: GPUShaderStage.COMPUTE,
          buffer: {
            type: "storage",
          },
        },
        {
          binding: 4, //kernal weights
          visibility: GPUShaderStage.COMPUTE,
          buffer: {
            type: "uniform",
          },
        },
      ],
    });
    const pipelineLayout = this.scene.engine.device.createPipelineLayout({
      bindGroupLayouts: [this._bindGroupLayout],
    });

    this._pipeline = this.scene.engine.device.createComputePipeline({
      layout: pipelineLayout,
      compute: {
        module,
        entryPoint: "main",
      },
    });

    const kernelWeights = [
      1.0, 0, 0, 0, 4.0, 0, 0, 0, 6.0, 0, 0, 0, 4.0, 0, 0, 0, 1.0, 0, 0, 0,
    ];

    this.scene.engine.device.queue.writeBuffer(
      this._kernelWeightUniformBuffer,
      0,
      new Float32Array(kernelWeights)
    );
  }

  setTextures(inputTexture: GPUTexture, guideTexture: GPUTexture) {
    const width = inputTexture.width;
    const height = inputTexture.width;

    this._outputTexture = this.scene.engine.device.createTexture({
      size: [width, height, 1],
      format: "rgba32float",
      usage:
        GPUTextureUsage.STORAGE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_SRC,
    });
    this._outputTextureView = this._outputTexture.createView();
    this._inputTextureView = inputTexture.createView();
    this._guideTextureView = guideTexture.createView();

    this._bindGroup = this.scene.engine.device.createBindGroup({
      layout: this._bindGroupLayout,
      entries: [
        { binding: 0, resource: this._inputTextureView },
        { binding: 1, resource: this._outputTextureView },
        {
          binding: 2,
          resource: { buffer: this._textureSizeUniformBuffer },
        },
        {
          binding: 3,
          resource: this._guideTextureView,
        },
        {
          binding: 4,
          resource: { buffer: this._kernelWeightUniformBuffer },
        },
      ],
    });

    this.scene.engine.device.queue.writeBuffer(
      this._textureSizeUniformBuffer,
      0,
      new Float32Array([this._outputTexture.width, this._outputTexture.height])
    );
  }

  render() {
    // Create a command encoder
    const commandEncoder = this.scene.engine.device.createCommandEncoder();

    // Begin compute pass
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(this._pipeline);
    passEncoder.setBindGroup(0, this._bindGroup);

    // Dispatch workgroups
    const workgroupSize = 16;
    const dispatchX = Math.ceil(this._outputTexture.width / workgroupSize);
    const dispatchY = Math.ceil(this._outputTexture.height / workgroupSize);
    passEncoder.dispatchWorkgroups(dispatchX, dispatchY);

    passEncoder.end();

    // Submit the commands
    this.scene.engine.device.queue.submit([commandEncoder.finish()]);
  }
}
