import { ParticleSystem } from "@babylonjs/core/Particles/particleSystem";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { VoxelEffect } from "@divinevoxel/vlox/Voxels/Effects/VoxelEffect";
import { DVEBabylonRenderer } from "../../Renderer/DVEBabylonRenderer";

const smokeTexture =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAT0lEQVQ4jWNgGAW0BzU1Nf/J1kiMZkZSbG1pacFQz0SKq7KzszEMxmrA+/fvGd6/fw9nI9PoAKsXcNk2depU4ryArBmmCZtmvACbC4YpAAABtiTWb256SQAAAABJRU5ErkJggg==";
const flameTexture =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAwBAMAAADeCCZ4AAAAD1BMVEUAAAD/agD/2AD/AAD/9cYWS9TqAAAAAXRSTlMAQObYZgAAAG1JREFUCNd1zdEJhTAQRNEbtoHEvAaiKWDFDuy/qDcDoh8ihMtADiwZBGpHb8CSEGuFsp7KVFgG7CQUW22bgU3CtJ6nYlcOi5aINJMNf7wcYVfStYvusSXxE37uXvIecdj1T7c7FcyiVUQGj/sDkDALQ8S396AAAAAASUVORK5CYII=";

export class CandleParticles extends VoxelEffect {
  static id = "candle_particles";
  points: Float32Array;
  flameParticles: ParticleSystem;
  smokeParticles: ParticleSystem;

  init(): void {
    const scene = DVEBabylonRenderer.instance.scene;
    const meshPositoin = this.mesh.getPosition();

    {
      const particles = new ParticleSystem("", 1000, scene);
      particles.isAnimationSheetEnabled = true;
      particles.beginAnimationLoop = true;
      this.flameParticles = particles;
      // Set the particle texture
      const texture = new Texture(
        flameTexture,
        scene,
        undefined,
        false,
        Texture.NEAREST_NEAREST_MIPNEAREST
      );
      particles.particleTexture = texture;

      particles.minLifeTime *= 2;

      particles.maxLifeTime *= 2;

      // Define sprite settings
      particles.spriteCellWidth = 8;
      particles.spriteCellHeight = 8;
      particles.startSpriteCellID = 0;
      particles.endSpriteCellID = 7;
      particles.spriteCellChangeSpeed = 4;
      particles.spriteCellLoop = true;
      particles.minSize = 0.25;
      particles.maxSize = 0.25;

      particles.gravity = new Vector3(0, 0, 0);

      particles.minEmitPower = 0;
      particles.maxEmitPower = 0;

      particles.startPositionFunction = (worldMatrix, positionToUpdate) => {
        const randomEmitter =
          Math.floor(Math.random() * (this.points.length / 3)) * 3;
        positionToUpdate.x = this.points[randomEmitter] + meshPositoin[0];
        positionToUpdate.y = this.points[randomEmitter + 1] + meshPositoin[1];
        positionToUpdate.z = this.points[randomEmitter + 2] + meshPositoin[2];
      };

      particles.start();
    }
    {
      const particles = new ParticleSystem("", 1000, scene);
      this.smokeParticles = particles;
      // Set the particle texture
      const texture = new Texture(
        smokeTexture,
        scene,
        undefined,
        false,
        Texture.NEAREST_NEAREST_MIPNEAREST
      );
      particles.particleTexture = texture;

      particles.minSize = 0.3;
      particles.maxSize = 0.3;

      particles.gravity = new Vector3(0, 0, 0);
      particles.direction1 = new Vector3(-0.1, 1, -0.1);
      particles.direction2 = new Vector3(0.1, 1, 0.1);

      particles.minEmitPower = 0.5;
      particles.maxEmitPower = 1.25;

      particles.startPositionFunction = (worldMatrix, positionToUpdate) => {
        const randomEmitter =
          Math.floor(Math.random() * (this.points.length / 3)) * 3;
        positionToUpdate.x = this.points[randomEmitter] + meshPositoin[0];
        positionToUpdate.y = this.points[randomEmitter + 1] + meshPositoin[1];
        positionToUpdate.z = this.points[randomEmitter + 2] + meshPositoin[2];
      };

      particles.start();
    }
  }

  setPoints(pointss: Float32Array) {
    this.points = pointss;
    this.flameParticles.emitRate = pointss.length / 3;
    this.smokeParticles.emitRate = pointss.length / 3;
  }

  dispose() {
    this.flameParticles.dispose();
    this.smokeParticles.dispose();
  }
}
