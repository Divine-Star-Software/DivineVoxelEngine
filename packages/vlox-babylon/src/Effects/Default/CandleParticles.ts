import { ParticleSystem, Texture, Vector3 } from "@babylonjs/core";
import { DivineVoxelEngineRender } from "@divinevoxel/vlox/Contexts/Render/DivineVoxelEngineRender";
import { VoxelEffect } from "@divinevoxel/vlox/VoxelEffects/VoxelEffect";
import { DVEBabylonRenderer } from "../../Renderer/DVEBabylonRenderer";

const partilceTexture =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAwBAMAAADeCCZ4AAAAD1BMVEUAAAD/agD/2AD/AAD/9cYWS9TqAAAAAXRSTlMAQObYZgAAAG1JREFUCNd1zdEJhTAQRNEbtoHEvAaiKWDFDuy/qDcDoh8ihMtADiwZBGpHb8CSEGuFsp7KVFgG7CQUW22bgU3CtJ6nYlcOi5aINJMNf7wcYVfStYvusSXxE37uXvIecdj1T7c7FcyiVUQGj/sDkDALQ8S396AAAAAASUVORK5CYII=";

export class CandleParticles extends VoxelEffect {
  static id = "candle_particles";
  points: Float32Array;
  particles: ParticleSystem;

  init(): void {

    const scene = DVEBabylonRenderer.instance.scene._scene;
    const particles = new ParticleSystem("", 1000, scene);
    this.particles = particles;
    // Set the particle texture
    const texture = new Texture(
      partilceTexture,
      scene,
      undefined,
      undefined,
      Texture.NEAREST_NEAREST_MIPNEAREST
    );
    particles.particleTexture = texture;
    particles.isAnimationSheetEnabled = true;
    // Define sprite settings
    particles.spriteCellWidth = 8;
    particles.spriteCellHeight = 8;
    particles.spriteCellLoop = true;
    particles.minSize = 0.1;
    particles.maxSize = 0.1;

    particles.beginAnimationLoop = true;
    // Adjust the particle system to flow upwards
    particles.gravity = new Vector3(0, 0, 0); // No gravity effect
    particles.direction1 = new Vector3(-0.1, 1, -0.1); // Initial possible direction
    particles.direction2 = new Vector3(0.1, 1, 0.1); // Final possible direction

    // Optionally, you can define the particle velocity to emphasize upward movement
    particles.minEmitPower = 1;
    particles.maxEmitPower = 1.5;

    const vector = new Vector3();
    particles.startPositionFunction = (worldMatrix, positionToUpdate) => {
      const randomEmitter =
        Math.floor(Math.random() * (this.points.length / 3)) * 3;
      vector.x = this.points[randomEmitter] + this.mesh.location[0];
      vector.y = this.points[randomEmitter + 1] + this.mesh.location[1];
      vector.z = this.points[randomEmitter + 2] + this.mesh.location[2];
      positionToUpdate.copyFrom(vector);
    };

    particles.start();

  }

  setPoints(pointss: Float32Array): void {
    this.points = pointss;
  }

  dispose(): void {
    this.particles.dispose();
  }
}
