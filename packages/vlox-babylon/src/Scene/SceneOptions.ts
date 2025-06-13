import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Scene } from "@babylonjs/core/scene";
import { SceneUBO } from "./SceneUBO";
const tmepColor = new Color3();
class UBOColor3 {
  constructor(
    private _color: Color3,
    private ubo: SceneUBO,
    private propertyId: string
  ) {}
  _update() {
    this.ubo._isDirty = true;

    tmepColor.copyFrom(this._color);
    if (tmepColor.r > 1) tmepColor.r /= 255;
    if (tmepColor.g > 1) tmepColor.g /= 255;
    if (tmepColor.b > 1) tmepColor.b /= 255;
    this.ubo.buffer.updateColor3(this.propertyId, tmepColor);
  }
  get r() {
    return this._color.r;
  }
  set r(value: number) {
    const old = this._color.r;
    this._color.r = value;
    if (value != old) {
      this._update();
    }
  }
  get g() {
    return this._color.g;
  }
  set g(value: number) {
    const old = this._color.g;
    this._color.g = value;
    if (value != old) {
      this._update();
    }
  }
  get b() {
    return this._color.b;
  }
  set b(value: number) {
    const old = this._color.b;
    this._color.b = value;
    if (value != old) {
      this._update();
    }
  }

  set(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  clone(newColor3: Color3, ubo: SceneUBO) {
    return new UBOColor3(newColor3, ubo, this.propertyId);
  }
}

class ShadeOptions {
  get doSun() {
    return this._options.ubo.shadeOptions.x == 1;
  }
  set doSun(value: boolean) {
    this._options.ubo.shadeOptions.x = value ? 1 : 0;
    this._options.ubo.setShadeOptions(this._options.ubo.shadeOptions);
  }

  get doRGB() {
    return this._options.ubo.shadeOptions.y == 1;
  }
  set doRGB(value: boolean) {
    this._options.ubo.shadeOptions.y = value ? 1 : 0;
    this._options.ubo.setShadeOptions(this._options.ubo.shadeOptions);
  }

  get doAO() {
    return this._options.ubo.shadeOptions.z == 1;
  }
  set doAO(value: boolean) {
    this._options.ubo.shadeOptions.z = value ? 1 : 0;
    this._options.ubo.setShadeOptions(this._options.ubo.shadeOptions);
  }

  get doColor() {
    return this._options.ubo.shadeOptions.w == 1;
  }
  set doColor(value: boolean) {
    this._options.ubo.shadeOptions.w = value ? 1 : 0;
    this._options.ubo.setShadeOptions(this._options.ubo.shadeOptions);
  }

  constructor(private _options: SceneOptions) {}
}

class EffectOptions {
  get enabled() {
    return this._options.ubo.effectOptions.x == 1;
  }
  set enabled(value: boolean) {
    this._options.ubo.effectOptions.x = value ? 1 : 0;
    this._options.ubo.setEffectOptions(this._options.ubo.effectOptions);
  }
  constructor(private _options: SceneOptions) {}
}

class LevelOptions {
  get baseLevel() {
    return this._options.ubo.levels.x;
  }
  set baseLevel(value: number) {
    this._options.ubo.levels.x = value;
    this._options.ubo.setLevels(this._options.ubo.levels);
  }
  get sunLevel() {
    return this._options.ubo.levels.y;
  }
  set sunLevel(value: number) {
    this._options.ubo.levels.y = value;
    this._options.ubo.setLevels(this._options.ubo.levels);
  }

  constructor(private _options: SceneOptions) {}
}

class SkyOptions {
  color: UBOColor3;
  get horizon() {
    return this._options.ubo.skyOptions.x;
  }
  set horizon(value: number) {
    this._options.ubo.skyOptions.x = value;
    this._options.ubo.setSkyOptions(this._options.ubo.skyOptions);
  }
  get horizonStart() {
    return this._options.ubo.skyOptions.y;
  }
  set horizonStart(value: number) {
    this._options.ubo.skyOptions.y = value;
    this._options.ubo.setSkyOptions(this._options.ubo.skyOptions);
  }
  get horizonEnd() {
    return this._options.ubo.skyOptions.z;
  }
  set horizonEnd(value: number) {
    this._options.ubo.skyOptions.z = value;
    this._options.ubo.setSkyOptions(this._options.ubo.skyOptions);
  }
  get startBlend() {
    return this._options.ubo.skyShadeOptions.x;
  }
  set startBlend(value: number) {
    this._options.ubo.skyShadeOptions.x = value;
    this._options.ubo.setSkyShadeOptions(this._options.ubo.skyShadeOptions);
  }

  get endBlend() {
    return this._options.ubo.skyShadeOptions.y;
  }
  set endBlend(value: number) {
    this._options.ubo.skyShadeOptions.y = value;
    this._options.ubo.setSkyShadeOptions(this._options.ubo.skyShadeOptions);
  }

  constructor(private _options: SceneOptions) {
    if (this._options.ubo) {
      this.color = new UBOColor3(
        this._options.ubo.skyColor,
        this._options.ubo,
        "scene_skyColor"
      );
    }
  }
  getColor() {
    return this._options.ubo.skyColor;
  }
  setColor(r: number, g: number, b: number) {
    this._options.ubo.skyColor.set(r, g, b);
    this._options.ubo.setSkyColor(this._options.ubo.skyColor);
  }
}

enum FogModes {
  None = 0,
  Exp = 1,
  Volumetric = 2,
  AnimatedVolumetric = 3,
}

class FogOptions {
  readonly Modes = FogModes;
  color: UBOColor3;

  get mode() {
    return this._options.ubo.fogOptions.x as FogModes;
  }
  set mode(mode: FogModes) {
    this._options.ubo.fogOptions.x = mode;
    this._options.ubo.setFogOptions(this._options.ubo.fogOptions);
  }
  get density() {
    return this._options.ubo.fogOptions.y;
  }
  set density(value: number) {
    this._options.ubo.fogOptions.y = value;
    this._options.ubo.setFogOptions(this._options.ubo.fogOptions);
  }
  get heightFactor() {
    return this._options.ubo.fogOptions.z;
  }
  set heightFactor(value: number) {
    this._options.ubo.fogOptions.z = value;
    this._options.ubo.setFogOptions(this._options.ubo.fogOptions);
  }

  get start() {
    return this._options.ubo.fogOptions.y;
  }
  set start(value: number) {
    this._options.ubo.fogOptions.y = value;
    this._options.ubo.setFogShadeOptions(this._options.ubo.fogOptions);
  }

  get end() {
    return this._options.ubo.fogOptions.z;
  }
  set end(value: number) {
    this._options.ubo.fogOptions.z = value;
    this._options.ubo.setFogShadeOptions(this._options.ubo.fogOptions);
  }

  get skyShade() {
    return this._options.ubo.fogShadeOptions.x == 1;
  }
  set skyShade(value: boolean) {
    this._options.ubo.fogShadeOptions.x = value ? 1 : 0;
    this._options.ubo.setFogShadeOptions(this._options.ubo.fogShadeOptions);
  }
  constructor(public _options: SceneOptions) {
    if (this._options.ubo) {
      this.color = new UBOColor3(
        this._options.ubo.fogColor,
        this._options.ubo,
        "scene_fogColor"
      );
    }
  }
  getColor() {
    return this._options.ubo.fogColor;
  }
  setColor(r: number, g: number, b: number) {
    this._options.ubo.fogColor.set(r, g, b);
    this._options.ubo.setFogColor(this._options.ubo.fogColor);
  }
}

export class SceneOptions {
  shade: ShadeOptions;
  levels: LevelOptions;
  sky: SkyOptions;
  fog: FogOptions;
  effects: EffectOptions;
  ubo: SceneUBO;

  constructor(
    public scene: Scene,
    postponeUBOCreation = false
  ) {
    if (!postponeUBOCreation) {
      this.ubo = new SceneUBO(SceneUBO.Create(scene));
    }
    this.shade = new ShadeOptions(this);
    this.levels = new LevelOptions(this);
    this.sky = new SkyOptions(this);
    this.fog = new FogOptions(this);
    this.effects = new EffectOptions(this);
  }

  clone(scene: Scene) {
    const newOptions = new SceneOptions(scene, true);
    newOptions.ubo = this.ubo.clone(scene);
    newOptions.sky.color = this.sky.color.clone(
      newOptions.ubo.skyColor,
      newOptions.ubo
    );
    newOptions.fog.color = this.fog.color.clone(
      newOptions.ubo.fogColor,
      newOptions.ubo
    );

    return newOptions;
  }
}
