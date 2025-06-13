import { Scene } from "@babylonjs/core/scene";
import { UniformBuffer } from "@babylonjs/core/Materials/uniformBuffer";
import { Vector4 } from "@babylonjs/core/Maths/math.vector";
import { Color3 } from "@babylonjs/core/Maths/math.color";
const tmepColor = new Color3();
export class SceneUBO {
  static Define = /* glsl */ `
  layout(std140) uniform SceneOptions {
      float scene_time;
      vec3 scene_fogColor;
      vec3 scene_skyColor;
      /*
        x -> mode
            0 -> disabled
            1 -> exp. 
            2 -> volumetric
            3 -> animated volumetric
        y -> density 
        z -> height factor
      */
      vec4 scene_fogOptions; 
      /*
        x -> shadeMode
            0 -> enabled
            1 -> disabled
        y -> fog start
        z -> fog end
      */
      vec4 scene_fogShadeOptions; 
      /*
        x -> sky horizon
        y -> sky horizon start
        z -> sky horizon end
      */
      vec4 scene_skyOptions;
      /*
        x -> sky blend start
        y -> sky blend end
      */
        vec4 scene_skyShadeOptions;
      /*
        x -> doSun
        y -> doRGB
        z -> doAO
        w -> doColors
      */
      vec4 scene_shadeOptions;
      /*
        x -> enabled
      */
      vec4 scene_effectOptions;
      /*
        x -> baseLightLevel
        y -> sunLevel
      */
      vec4 scene_levels;
  };
`;
  static Create(scene: Scene) {
    const buffer = new UniformBuffer(scene.getEngine());
    buffer.addUniform("scene_time", 1);
    buffer.addUniform("scene_fogColor", 3);
    buffer.addUniform("scene_skyColor", 3);
    buffer.addUniform("scene_fogOptions", 4);
    buffer.addUniform("scene_fogShadeOptions", 4);
    buffer.addUniform("scene_skyOptions", 4);
    buffer.addUniform("scene_skyShadeOptions", 4);
    buffer.addUniform("scene_shadeOptions", 4);
    buffer.addUniform("scene_effectOptions", 4);
    buffer.addUniform("scene_levels", 4);
    return buffer;
  }

  fogColor = new Color3();
  skyColor = new Color3();
  fogOptions = new Vector4();
  fogShadeOptions = new Vector4();
  skyOptions = new Vector4();
  skyShadeOptions = new Vector4();
  shadeOptions = new Vector4();
  effectOptions = new Vector4();
  levels = new Vector4();
  _isDirty = false;
  constructor(public buffer: UniformBuffer) {}

  setSkyColor(r: number, g: number, b: number): void;
  setSkyColor(color: Color3): void;
  setSkyColor(x: number | Color3, y?: number, z?: number): void {
    if (x instanceof Color3) {
      this.skyColor.copyFrom(x);
    } else {
      this.skyColor.set(x, y!, z!);
    }
    this._isDirty = true;
    tmepColor.copyFrom(this.skyColor);
    if (tmepColor.r > 1) tmepColor.r /= 255;
    if (tmepColor.g > 1) tmepColor.g /= 255;
    if (tmepColor.b > 1) tmepColor.b /= 255;
    this.buffer.updateColor3("scene_skyColor", tmepColor);
  }

  setSkyOptions(x: number, y: number, z: number, w: number): void;
  setSkyOptions(options: Vector4): void;
  setSkyOptions(x: number | Vector4, y?: number, z?: number, w?: number): void {
    if (x instanceof Vector4) {
      this.skyOptions.copyFrom(x);
    } else {
      this.skyOptions.set(x, y!, z!, w!);
    }
    this._isDirty = true;
    this.buffer.updateVector4("scene_skyOptions", this.skyOptions);
  }

  setSkyShadeOptions(x: number, y: number, z: number, w: number): void;
  setSkyShadeOptions(options: Vector4): void;
  setSkyShadeOptions(
    x: number | Vector4,
    y?: number,
    z?: number,
    w?: number
  ): void {
    if (x instanceof Vector4) {
      this.skyShadeOptions.copyFrom(x);
    } else {
      this.skyShadeOptions.set(x, y!, z!, w!);
    }
    this._isDirty = true;
    this.buffer.updateVector4("scene_skyShadeOptions", this.skyShadeOptions);
  }

  setFogColor(r: number, g: number, b: number): void;
  setFogColor(color: Color3): void;
  setFogColor(x: number | Color3, y?: number, z?: number): void {
    if (x instanceof Color3) {
      this.fogColor.copyFrom(x);
    } else {
      this.fogColor.set(x, y!, z!);
    }
    this._isDirty = true;
    tmepColor.copyFrom(this.fogColor);
    if (tmepColor.r > 1) tmepColor.r /= 255;
    if (tmepColor.g > 1) tmepColor.g /= 255;
    if (tmepColor.b > 1) tmepColor.b /= 255;

    this.buffer.updateColor3("scene_fogColor", tmepColor);
  }

  setFogOptions(x: number, y: number, z: number, w: number): void;
  setFogOptions(options: Vector4): void;
  setFogOptions(x: number | Vector4, y?: number, z?: number, w?: number): void {
    if (x instanceof Vector4) {
      this.fogOptions.copyFrom(x);
    } else {
      this.fogOptions.set(x, y!, z!, w!);
    }
    this._isDirty = true;
    this.buffer.updateVector4("scene_fogOptions", this.fogOptions);
  }

  setFogShadeOptions(x: number, y: number, z: number, w: number): void;
  setFogShadeOptions(options: Vector4): void;
  setFogShadeOptions(
    x: number | Vector4,
    y?: number,
    z?: number,
    w?: number
  ): void {
    if (x instanceof Vector4) {
      this.fogShadeOptions.copyFrom(x);
    } else {
      this.fogShadeOptions.set(x, y!, z!, w!);
    }
    this._isDirty = true;
    this.buffer.updateVector4("scene_fogShadeOptions", this.fogShadeOptions);
  }

  setShadeOptions(x: number, y: number, z: number, w: number): void;
  setShadeOptions(options: Vector4): void;
  setShadeOptions(
    x: number | Vector4,
    y?: number,
    z?: number,
    w?: number
  ): void {
    if (x instanceof Vector4) {
      this.shadeOptions.copyFrom(x);
    } else {
      this.shadeOptions.set(x, y!, z!, w!);
    }
    this._isDirty = true;
    this.buffer.updateVector4("scene_shadeOptions", this.shadeOptions);
  }

  setEffectOptions(x: number, y: number, z: number, w: number): void;
  setEffectOptions(options: Vector4): void;
  setEffectOptions(
    x: number | Vector4,
    y?: number,
    z?: number,
    w?: number
  ): void {
    if (x instanceof Vector4) {
      this.effectOptions.copyFrom(x);
    } else {
      this.effectOptions.set(x, y!, z!, w!);
    }
    this._isDirty = true;
    this.buffer.updateVector4("scene_effectOptions", this.effectOptions);
  }

  setLevels(x: number, y: number, z: number, w: number): void;
  setLevels(levels: Vector4): void;
  setLevels(x: number | Vector4, y?: number, z?: number, w?: number): void {
    if (x instanceof Vector4) {
      this.levels.copyFrom(x);
    } else {
      this.levels.set(x, y!, z!, w!);
    }
    this._isDirty = true;
    this.buffer.updateVector4("scene_levels", this.levels);
  }

  updateTime(time: number): void {
    this._isDirty = true;
    this.buffer.updateFloat("scene_time", time);
  }

  clone(scene: Scene) {
    const buffer = SceneUBO.Create(scene);
    const ubo = new SceneUBO(buffer);

    ubo.setFogColor(this.fogColor);
    ubo.setSkyColor(this.skyColor);
    ubo.setFogOptions(this.fogOptions);
    ubo.setFogShadeOptions(this.fogShadeOptions);
    ubo.setSkyOptions(this.skyOptions);
    ubo.setSkyShadeOptions(this.skyShadeOptions);
    ubo.setLevels(this.levels);
    ubo.setEffectOptions(this.effectOptions);
    ubo.setShadeOptions(this.shadeOptions);
    ubo.updateTime(0);

    return ubo;
  }

  update() {
    if (!this._isDirty) return;
    this.buffer.update();
    this._isDirty = false;
  }
}
