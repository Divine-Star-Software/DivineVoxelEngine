import { ParticleSystem } from "@babylonjs/core/Particles/particleSystem";
import { GPUParticleSystem } from "@babylonjs/core/Particles/gpuParticleSystem";
import "@babylonjs/core/Particles/webgl2ParticleSystem";
import { CustomParticleEmitter } from "@babylonjs/core/Particles/EmitterTypes/customParticleEmitter";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder";


export class LevelParticles {
  static particle: ParticleSystem | GPUParticleSystem;
  static emitter: Mesh;
  static activeParticles: ParticleSystem | GPUParticleSystem;
  static texture: Texture;
  static scene: Scene;
  static init(scene: Scene) {
    // Create a particle system
    this.scene = scene;
    const box = CreateBox("", { size: 1 }, scene);
    box.parent = scene.activeCamera!;
    this.emitter = box;
    box.isVisible = false;
    box.position.y = 200;

    //Texture of each particle
    const texture = new Texture(
      "assets/particle.png",
      scene,
      false,
      false,
      Texture.NEAREST_SAMPLINGMODE,
      () => {
        texture.hasAlpha = true;
        texture.updateSamplingMode(Texture.NEAREST_SAMPLINGMODE);
      }
    );
    texture.hasAlpha = true;
    this.texture = texture;
  }

  static _getParticleSystem() {
    const scene = this.scene;
    let particleSystem: GPUParticleSystem | ParticleSystem;
    if (GPUParticleSystem.IsSupported) {
      particleSystem = new GPUParticleSystem(
        "particles",
        { capacity: 4_000, randomTextureSize: 4096 },
        scene
      );
    } else {
      particleSystem = new ParticleSystem("paritcles", 2000, scene);
    }
    this.particle = particleSystem;

    particleSystem.particleTexture = this.texture;

    // particleSystem.translationPivot = new Vector3(0, 100,0);
    particleSystem.translationPivot.set(0, 100);
    // Where the particles come from
    // ps1.emitter = fountain; // the starting object, the emitter
    particleSystem.emitter = this.emitter;
    particleSystem.minEmitBox = new Vector3(-0.3, 0, 0); // Starting all from
    particleSystem.maxEmitBox = new Vector3(0.3, 0, 0); // To...

    particleSystem.blendMode = ParticleSystem.BLENDMODE_STANDARD;

    // Colors of all particles
    particleSystem.color1 = new Color4(0, 1, 1, 1.0);
    particleSystem.color2 = new Color4(1, 0, 1, 1.0);
    particleSystem.colorDead = new Color4(0, 1, 1, 0.5);

    // Size of each particle (random between...
    particleSystem.minSize = 0.2;
    particleSystem.maxSize = 0.7;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 50;
    particleSystem.maxLifeTime = 100;

    // Emission rate
    particleSystem.emitRate = 600;
    // ps1.manualEmitCount = 100;

    // Set the gravity of all particles
    particleSystem.gravity = new Vector3(0, -1, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new Vector3(-0.5, -1, 1);
    particleSystem.direction2 = new Vector3(0.5, 10, 10);

    particleSystem.isAnimationSheetEnabled = true;
    particleSystem.spriteCellHeight = 32;
    particleSystem.spriteCellWidth = 32;
    particleSystem.spriteRandomStartCell = true;
    particleSystem.startSpriteCellID = 0;
    particleSystem.endSpriteCellID = 3;
    particleSystem.spriteCellChangeSpeed = 0;

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI * 0.5;


    const customEmitter = new CustomParticleEmitter();
    customEmitter.particlePositionGenerator = (index, particle, out) => {
      out.x = Math.random() * 500 * (Math.random() > 0.5 ? 1 : -1);
      out.y = 100 + Math.random() * 200; // Higher starting point
      out.z = Math.random() * 500 * (Math.random() > 0.5 ? 1 : -1);

    };
    customEmitter.particleDestinationGenerator = (index, particle, out) => {
      out.x = Math.random() * 500 * (Math.random() > 0.5 ? 1 : -1);
      out.y = -100;
      out.z = Math.random() * 500 * (Math.random() > 0.5 ? 1 : -1);
    };
    particleSystem.particleEmitterType = customEmitter;
    // Speed
    particleSystem.minEmitPower = 0.1;
    particleSystem.maxEmitPower = 1;
    return particleSystem;
  }

  static start(
    color1: Color4,
    color2: Color4 = color1,
    colorDead: Color4 = color1
  ) {
    if (this.activeParticles) {
      this.stop();
    }
    this.activeParticles = this._getParticleSystem();
    this.activeParticles.color1.copyFrom(color1);
    this.activeParticles.color2.copyFrom(color2);
    this.activeParticles.colorDead.copyFrom(colorDead);
    this.activeParticles.start();
  }

  static stop() {
    if (!this.activeParticles) return;
    this.activeParticles.stop();
    this.activeParticles.dispose(false);
  }
}
