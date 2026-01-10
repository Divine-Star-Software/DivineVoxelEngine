import { WorldGeneration } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGeneration";
import { WorldGenInterface } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGen.types";
import { WorldGenBrush } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGenBrush";
import { WorldSpaces } from "@divinevoxel/vlox/World/WorldSpaces";
import { FunctionCompiler } from "@dvegames/vlox-tools/Flow/Compilers/Function/FunctionCompiler";
import { PerlinNoise3d } from "@amodx/rng/perlin";
import { PaintVoxelData } from "@divinevoxel/vlox/Voxels/Types/PaintVoxelData";
const perlin = new PerlinNoise3d();

perlin.noiseSeed(13129301280);
const [xOffSet, yOffSet, zOffSet] = [1000, 100, 10000];
export class GraphWorldGen implements WorldGenInterface {
  static instance: GraphWorldGen;
  brush: WorldGenBrush;
  noise: FunctionCompiler;
  _noiseSegments = new Map<string, PerlinNoise3d>();
  constructor() {
    if (GraphWorldGen.instance) return GraphWorldGen.instance;
    GraphWorldGen.instance = this;
  }
  init() {
    this.brush = WorldGeneration.getBrush();
    WorldGeneration.setWorldGen(this);
  }
  /*   inNoiseRange(x: number, y: number, z: number) {
    const scale = 30;
    const height = 32; 
    const nx = x / scale;
    const nz = z / scale;
    const terrainHeight = perlin.get(nx, 0, nz)  *  height; 

    return y <= terrainHeight;
  } */
  inNoiseRange(x: number, y: number, z: number) {
    const p1 = perlin;

    const scale = 30; // Adjust for smoother or more rugged terrain

    // Basic terrain height based on x and z
    let height = p1.get((x + xOffSet) / scale, 0, (z + zOffSet) / scale) * 0.5;

    // Additional detail layer
    let detail =
      p1.get((x - xOffSet) / 15, (y + yOffSet) / 15, (z - zOffSet) / 15) * 0.5;

    // Combine basic height and detail for final noise value
    let r = height + detail;

    // Adjust y position based on noise, simulating elevation changes
    let elevation = y / 150; // Example elevation factor, adjust as needed

    // Voxel placement condition, adjust thresholds as needed
    return r > 0.3 + elevation && r < 0.4 + elevation;
  }
  async initGraph() {
    const file = await (await fetch("./noisetest.json")).json();
    this.noise = new FunctionCompiler(file);
    for (const dependcies of this.noise.dependencies) {
      if (dependcies.node.type == "PerlinNoise3DNode") {
        const noiseSegmentId = dependcies.node.properties._noiseSegments;
        if (this._noiseSegments.has(noiseSegmentId)) {
        } else {
          const perlinNoise = new PerlinNoise3d();
          perlinNoise.noiseSeed(13129301280);
          this._noiseSegments.set(noiseSegmentId, perlinNoise);
        }
        const perlin = this._noiseSegments.get(noiseSegmentId)!;
        dependcies.set((x: number, y: number, z: number) =>
          perlin.get(x, y, z)
        );
      }
    }
    console.log("GOT GRAPH", this.noise, file);
  }

  async generate(
    dimension: number,
    cx: number,
    y: number,
    cz: number
  ): Promise<any> {
    const brush = this.brush;
    brush.start(dimension, cx, y, cz);

    const chunkWidth = WorldSpaces.section.bounds.x;
    const chunkDepth = WorldSpaces.section.bounds.z;
    const height = 100;

    //   if (y % 2 == 0) continue;
    brush.setId("dve_dream_stone");
    for (let x = cx; x < chunkWidth + cx; x++) {
      for (let z = cz; z < chunkDepth + cz; z++) {
        for (let y = 0; y < height; y++) {
          this.noise.args.position.x = x;
          this.noise.args.position.y = y;
          this.noise.args.position.z = z;
          if (this.noise.run()) {
            brush.setXYZ(x, y, z)!.paint();
          }
        }
      }
    }

    brush.stop();
  }

  async decorate(
    dimension: number,
    cx: number,
    y: number,
    cz: number
  ): Promise<any> {
   const brush = this.brush;
    brush.start(dimension, cx, y, cz);
    brush.setRaw(
      PaintVoxelData.ToRaw(
        PaintVoxelData.Create({
          id: "dve_dream_stone",
          modString: "grassy=true",
        })
      )
    );
    const chunkWidth = WorldSpaces.section.bounds.x;
    const chunkDepth = WorldSpaces.section.bounds.z;
    const height = 100;
    const nCursor = brush.dataCursor.clone();

    for (let x = cx; x < chunkWidth + cx; x++) {
      for (let z = cz; z < chunkDepth + cz; z++) {
        for (let y = 0; y < height; y++) {
          const voxel = brush.dataCursor.getVoxel(x, y, z);
          if (!voxel) continue;
          if (voxel.getStringId() == "dve_dream_stone") {
            const nVoxel = nCursor.getVoxel(x, y + 1, z);

            if (nVoxel?.isAir()) {
              brush.setXYZ(x, y, z).paint();
            }
          }
        }
      }
    } 
  }
}
