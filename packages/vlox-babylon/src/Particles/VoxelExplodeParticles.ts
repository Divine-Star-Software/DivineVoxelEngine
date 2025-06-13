import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CreatePlane } from "@babylonjs/core/Meshes/Builders/planeBuilder";
import { Observer } from "@babylonjs/core/Misc/observable";
import { SolidParticleSystem } from "@babylonjs/core/Particles/solidParticleSystem";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
import { TextureId } from "@divinevoxel/vlox/Textures/Texture.types";

import { DataCursorInterface } from "@divinevoxel/vlox/Voxels/Cursor/DataCursor.interface";
export class VoxelExplodeParticles {
  static Quads = new Map<Scene, Mesh>();
  private _textureId = 0;
  private _sps: SolidParticleSystem;
  private _mesh: Mesh;
  private _dead = 0;
  private _disposed = false;

  private _beforeRender: Observer<any>;

  constructor(
    public scene: Scene,
    public dataCursor: DataCursorInterface,
    private _count = 15,
    public disposeOnDead = true
  ) {
    const material =
      DVEBabylonRenderer.instance.materials.get("dve_voxel_particle")!;

    this._sps = new SolidParticleSystem("voxelExplosionSPS", scene, {
      isPickable: false,
      computeBoundingBox: false,
    });

    if (!VoxelExplodeParticles.Quads.get(scene)) {
      const quad = CreatePlane("voxelParticle", { size: 1 }, scene);
      VoxelExplodeParticles.Quads.set(scene, quad);
      quad.setEnabled(false);
    }

    const quad = VoxelExplodeParticles.Quads.get(scene)!;
    this._sps.addShape(quad, this._count);
    this._sps.billboard = true;
    this._mesh = this._sps.buildMesh();
    this._mesh.renderingGroupId = 1;
    this._mesh.material = material._material;
    this._mesh.isVisible = false;
    this._mesh.alwaysSelectAsActiveMesh = true;

    this._sps.computeParticleTexture = false;
    this._sps.computeParticleColor = true;

    this._sps.initParticles = () => {
      for (let i = 0; i < this._sps.nbParticles; i++) {
        const particle = this._sps.particles[i];

        const sizeX = Math.floor(Math.random() * 10);
        const sizeY = Math.floor(Math.random() * 10);
        const encodedSize = sizeX | (sizeY << 4);
        particle.scale.set(
          0.05 + sizeX * 0.1 * 0.2,
          0.05 + sizeY * 0.1 * 0.2,
          1
        );
        particle.color = new Color4(0, encodedSize, 0, 1);
      }
    };

    const temp = new Vector3();
    this._sps.updateParticle = (particle) => {
      temp.copyFrom(particle.position);
      temp.addInPlace(particle.velocity);
      const ligtvoxel = this.dataCursor.getVoxel(
        Math.floor(this._mesh.position.x + temp.x),
        Math.floor(this._mesh.position.y + temp.y),
        Math.floor(this._mesh.position.z + temp.z)
      );
      if (ligtvoxel) {
        const light = ligtvoxel.getLight();
        if (light >= 0) particle.color!.b = light;
      }
      if (
        !this.dataCursor
          .getVoxel(
            Math.floor(this._mesh.position.x + temp.x),
            Math.floor(this._mesh.position.y + temp.y - particle.scale.y / 2),
            Math.floor(this._mesh.position.z + temp.z)
          )
          ?.isAir()
      ) {
        particle.velocity.set(0, 0, 0);

        particle.color!.a -= 0.02;
        return particle;
      }

      particle.position.addInPlace(particle.velocity);
      particle.velocity.y -= 0.01;

      if (particle.color!.a < 1) {
        particle.color!.a -= 0.02;
        if (particle.color!.a <= 0) {
          particle.alive = false;
          this._dead++;
        }
      }

      return particle;
    };

    this._sps.initParticles();

    this._beforeRender = this.scene.onBeforeRenderObservable.add(() => {
      if (this._disposed) return;
      if (this._dead >= this._count) {
        if (this.disposeOnDead) {
          this.dispose();

          return;
        }
      }
      this._sps.setParticles();
    });
  }

  explodeAt(x: number, y: number, z: number, textureID: TextureId) {
    this._textureId =
      TextureManager.getTexture("dve_voxel")!.getTextureIndex(textureID);

    this._mesh.isVisible = true;
    this._mesh.position.set(x + 0.5, y + 0.75, z + 0.5);

    const speed = 0.1;
    // Activate particles
    for (let i = 0; i < this._sps.nbParticles; i++) {
      const particle = this._sps.particles[i];

      particle.position.set(0, 0, 0);
      particle.velocity.set(
        (Math.random() - 0.5) * speed,
        Math.random() * speed,
        (Math.random() - 0.5) * speed
      );

      particle.color!.r = this._textureId;
      particle.color!.a = 2;
      particle.alive = true;
    }

    this._sps.setParticles();
  }

  dispose() {
    if (this._disposed) return;
    this._disposed = true;
    this.scene.onBeforeRenderObservable.remove(this._beforeRender);
    this._sps.dispose();

    this._mesh.dispose();
  }
}
