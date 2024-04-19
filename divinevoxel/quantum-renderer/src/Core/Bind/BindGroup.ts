import { StorageBuffer } from "Core/Buffers/StorageBuffer";
import { Texture } from "../Textures/Texture";
import { TextureSampler } from "../Textures/TextureSampler";
import { QuantumEngine } from "Engine/QuantumEngine";
import { UniformBuffer } from "Core/Buffers/UniformBuffer";

abstract class BoundItem {
  index = 0;
  constructor(
    public group: BindGroup,
    public description: GPUBindGroupLayoutEntry
  ) {}
  abstract getBindGroupEntry(): GPUBindGroupEntry;
  getDescription() {
    this.description.binding = this.index;
    return this.description;
  }
  abstract getShaderEntry(): string;
}

class BoundStorageBuffer extends BoundItem {
  constructor(
    public buffer: StorageBuffer,
    description: GPUBindGroupLayoutEntry,
    group: BindGroup
  ) {
    super(group, description);
  }
  getBindGroupEntry(): GPUBindGroupEntry {
    return { binding: this.index, resource: { buffer: this.buffer._buffer } };
  }
  getShaderEntry(): string {
    return /*wgsl */ `@group(${this.group.index}) @binding(${this.index}) ${this.buffer.shaderDefine};`;
  }
}
class BoundUniformBuffer extends BoundItem {
  constructor(
    public buffer: StorageBuffer,
    description: GPUBindGroupLayoutEntry,
    group: BindGroup
  ) {
    super(group, description);
  }
  getBindGroupEntry(): GPUBindGroupEntry {
    return { binding: this.index, resource: { buffer: this.buffer._buffer } };
  }
  getShaderEntry(): string {
    return /*wgsl */ `@group(${this.group.index}) @binding(${this.index}) ${this.buffer.shaderDefine};`;
  }
}
class BoundTexture extends BoundItem {
  constructor(
    public texture: Texture,
    description: GPUBindGroupLayoutEntry,
    group: BindGroup
  ) {
    super(group, description);
  }
  getBindGroupEntry(): GPUBindGroupEntry {
    return {
      binding: this.index,
      resource: this.texture._texture.createView(),
    };
  }
  getShaderEntry(): string {
    return /*wgsl */ `@group(${this.group.index}) @binding(${this.index}) ${this.texture.shaderDefine};`;
  }
}
class BoundSampler extends BoundItem {
  constructor(
    public sampler: TextureSampler,
    description: GPUBindGroupLayoutEntry,
    group: BindGroup
  ) {
    super(group, description);
  }
  getBindGroupEntry(): GPUBindGroupEntry {
    return {
      binding: this.index,
      resource: this.sampler._sampler,
    };
  }
  getShaderEntry(): string {
    return /*wgsl */ `@group(${this.group.index}) @binding(${this.index}) ${this.sampler.shaderDefine};`;
  }
}
export class BindGroup {
  _buffers = new Map<string, BoundStorageBuffer>();
  _textures = new Map<string, BoundTexture>();
  _samplers = new Map<string, BoundSampler>();
  _uniforms = new Map<string, BoundUniformBuffer>();
  _bindGroup: GPUBindGroup;
  _mapped: BoundItem[] = [];
  index = 0;

  constructor(public enigne: QuantumEngine) {}

  mapLayOut() {
    let index = 0;
    const items: BoundItem[] = [];
    for (const [, buffer] of this._uniforms) {
      buffer.index = index;
      items.push(buffer);
      index++;
    }
    for (const [, buffer] of this._buffers) {
      buffer.index = index;
      items.push(buffer);
      index++;
    }
    for (const [, texture] of this._textures) {
      texture.index = index;
      items.push(texture);
      index++;
    }
    for (const [, sampler] of this._samplers) {
      sampler.index = index;
      items.push(sampler);
      index++;
    }
    this._mapped = items;
    return items;
  }

  getLayout(): GPUBindGroupLayoutDescriptor {
    return {
      entries: this.mapLayOut().map((_) => _.getDescription()),
    };
  }

  createBindGroup(layout: GPUBindGroupLayout): GPUBindGroup {
    this._bindGroup = this.enigne.device.createBindGroup({
      layout,
      entries: this.mapLayOut().map((_) => _.getBindGroupEntry()),
    });
    return this._bindGroup;
  }

  createGroupCode() {
    return `${this.mapLayOut()
      .map((_) => _.getShaderEntry())
      .join("\n")}`;
  }
  addUniform(buffer: UniformBuffer, description: GPUBindGroupLayoutEntry) {
    this._uniforms.set(
      buffer.name,
      new BoundUniformBuffer(buffer, description, this)
    );
  }
  addBuffer(buffer: StorageBuffer, description: GPUBindGroupLayoutEntry) {
    this._buffers.set(
      buffer.name,
      new BoundStorageBuffer(buffer, description, this)
    );
  }
  addTexture(texture: Texture, description: GPUBindGroupLayoutEntry) {
    this._textures.set(
      texture.name,
      new BoundTexture(texture, description, this)
    );
  }
  addSampler(sampler: TextureSampler, description: GPUBindGroupLayoutEntry) {
    this._samplers.set(
      sampler.name,
      new BoundSampler(sampler, description, this)
    );
  }
}
