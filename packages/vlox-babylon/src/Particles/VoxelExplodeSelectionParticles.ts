import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CreatePlane } from "@babylonjs/core/Meshes/Builders/planeBuilder";
import { Observer } from "@babylonjs/core/Misc/observable";
import { Material } from "@babylonjs/core/Materials/material";
import { SolidParticleSystem } from "@babylonjs/core/Particles/solidParticleSystem";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
import { TextureId } from "@divinevoxel/vlox/Textures/Texture.types";
import { DataCursorInterface } from "@divinevoxel/vlox/Voxels/Cursor/DataCursor.interface";
import { GetXYZOrderArrayIndex } from "@divinevoxel/vlox/Math/Indexing";
import { IVoxelSelection } from "@divinevoxel/vlox/Templates/Selection/VoxelSelecton";
import { VoxelPropertiesRegister } from "@divinevoxel/vlox/Voxels/Data/VoxelPropertiesRegister";
import { SchemaRegister } from "@divinevoxel/vlox/Voxels/State/SchemaRegister";
export class VoxelExplodeSelectionParticles {
  static CreateParticleData(
    iSelection: IVoxelSelection,
    cursor: DataCursorInterface
  ) {
    const { x: ox, y: oy, z: oz } = iSelection.origin;
    const { x: sx, y: sy, z: sz } = iSelection.size;
    const ex = ox + sx;
    const ey = oy + sy;
    const ez = oz + sz;
    const size = iSelection.size;
    const textures: (TextureId | 0)[] = new Array(
      size.x * size.y * size.z
    ).fill(0);

    for (let x = ox; x < ex; x++) {
      for (let y = oy; y < ey; y++) {
        for (let z = oz; z < ez; z++) {
          const index = GetXYZOrderArrayIndex(
            x - ox,
            y - oy,
            z - oz,
            size.x,
            size.y,
            size.z
          );

          if (!iSelection.isSelected(x, y, z)) continue;

          const voxel = cursor.getVoxel(x, y, z);
          if (!voxel || voxel.isAir()) continue;

          const modState = SchemaRegister.getVoxelSchemas(voxel.getStringId())
            .mod.startEncoding(voxel.getMod())
            .toStateString();
          textures[index] =
            VoxelPropertiesRegister.VoxelProperties[voxel.getVoxelId()][
              "dve_particle_data"
            ]?.[modState] || "";
        }
      }
    }
    return textures;
  }
  static Quads = new Map<Scene, Mesh>();
  private _sps: SolidParticleSystem;
  private _mesh: Mesh;
  private _dead = 0;
  private _disposed = false;

  private _active = false;
  private _beforeRender: Observer<any>;

  private _material: Material;
  constructor(
    public scene: Scene,
    public dataCursor: DataCursorInterface,
    private _count = 15,
    public disposeOnDead = true
  ) {
    this._material =
      DVEBabylonRenderer.instance.materials.get(
        "dve_voxel_particle"
      )!._material;

    this._sps = new SolidParticleSystem("voxelExplosionSPS", scene, {
      isPickable: false,
      computeBoundingBox: false,
      expandable: true,
    });

    this._sps.billboard = true;

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
        Math.floor(temp.x),
        Math.floor(temp.y),
        Math.floor(temp.z)
      );

      if (ligtvoxel) {
        const light = ligtvoxel.getLight();
        if (light >= 0) particle.color!.b = light;
      }
      if (
        !this.dataCursor
          .getVoxel(
            Math.floor(temp.x),
            Math.floor(temp.y - particle.scale.y / 2),
            Math.floor(temp.z)
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
      if (!this._active) return;
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

  expand(count: number) {
    if (this._mesh) this._mesh.dispose();
    const scene = this.scene;
    if (!VoxelExplodeSelectionParticles.Quads.get(scene)) {
      const quad = CreatePlane("voxelParticle", { size: 1 }, scene);
      VoxelExplodeSelectionParticles.Quads.set(scene, quad);
      quad.setEnabled(false);
    }

    const quad = VoxelExplodeSelectionParticles.Quads.get(scene)!;
    this._sps.addShape(quad, count);

    this._count = count;
    this._sps.initParticles();
    this._mesh = this._sps.buildMesh();
    this._mesh.renderingGroupId = 1;
    this._mesh.material = this._material;
    this._mesh.isVisible = false;
    this._mesh.alwaysSelectAsActiveMesh = true;
  }

  explode(iSelection: IVoxelSelection, textures: (TextureId | 0)[]) {
    let totalVoxels = 0;
    for (let i = 0; i < textures.length; i++) {
      if (textures[i] === 0) continue;
      totalVoxels++;
    }
    if (totalVoxels == 0) return false;
    const size = iSelection.size;
    const { x: ox, y: oy, z: oz } = iSelection.origin;
    const { x: sx, y: sy, z: sz } = iSelection.size;
    const ex = ox + sx;
    const ey = oy + sy;
    const ez = oz + sz;

    let particleCount = 0;
    let particlesPerVoxel = 5;
    const speed = 0.1;
    const totalParticles = particlesPerVoxel * totalVoxels;
    if (this._sps.particles.length < totalParticles) {
      this.expand(totalParticles);
    }
    if (!this._mesh || !this._sps.particles.length) return false;
    this._mesh.isVisible = true;
    for (let x = ox; x < ex; x++) {
      for (let y = oy; y < ey; y++) {
        for (let z = oz; z < ez; z++) {
          if (!iSelection.isSelected(x, y, z)) continue;
          const index = GetXYZOrderArrayIndex(
            x - ox,
            y - oy,
            z - oz,
            size.x,
            size.y,
            size.z
          );
          const texture = textures[index];
          if (texture === 0 || !iSelection.isSelected(x, y, z)) continue;
          for (
            let i = particleCount;
            i < particleCount + particlesPerVoxel;
            i++
          ) {
            const particle = this._sps.particles[i];

            particle.position.set(x + 0.5, y + 0.5, z + 0.5);
            particle.velocity.set(
              (Math.random() - 0.5) * speed,
              Math.random() * speed,
              (Math.random() - 0.5) * speed
            );

            particle.color!.r =
              TextureManager.getTexture("dve_voxel")!.getTextureIndex(texture);
            particle.color!.a = 2;
            particle.alive = true;
          }
          particleCount += particlesPerVoxel;
        }
      }
    }
    this._active = true;
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
