import { Threads } from "@amodx/threads";
import { PerlinNoise3d } from "@amodx/rng/perlin/Perlin3d";
import { FunctionCompiler } from "../../Compilers/Function/FunctionCompiler";
import {
  CreateNoiseMessage,
  Noise2DViewModes,
  NoiseViewModes,
} from "./NoiseVisualizer.types";
console.warn("init noise thread");
Threads.init("noise", self);
const id = crypto.randomUUID();

let noise: FunctionCompiler | null;

Threads.registerTask("set-graph", (json) => {
  console.warn("set graph", json);
  noise = new FunctionCompiler(json);

  for (const dep of noise.dependencies) {
    if (dep.node.type === "PerlinNoise3DNode") {
      const perlin = new PerlinNoise3d();
      perlin.noiseSeed(123123);
      dep.set((x: number, y: number, z: number) => perlin.get(x, y, z));
    }
  }
});

function setVoxelBit(
  data: Uint32Array,
  voxelIndex: number,
  value: boolean
): void {
  const wordIndex = Math.floor(voxelIndex / 32);
  const bitOffset = voxelIndex % 32;
  if (value) {
    data[wordIndex] |= 1 << bitOffset;
  } else {
    data[wordIndex] &= ~(1 << bitOffset);
  }
}

function getVoxelIndex(x: number, y: number, z: number) {
  const sectorBoundsX = 16;
  const sectorBoundsZ = 16;
  return Math.floor(z + sectorBoundsZ * (x + sectorBoundsX * y));
}

Threads.registerTask<CreateNoiseMessage>("create-noise", (createData) => {
  if (!noise) return;
  const { state } = createData;
  const width = createData.size.x;
  const depth = createData.size.y;
  const startX = createData.start.x;
  const startZ = createData.start.y;
  const endX = createData.start.x + createData.size.x;
  const endZ = createData.start.y + createData.size.y;

  if (state.viewMode == NoiseViewModes.View2D) {
    const data = new Uint8Array(width * depth * 4);
    if (state.view2d.mode == Noise2DViewModes.Binary) {
      for (let x = startX; x < endX; x++) {
        for (let z = startZ; z < endZ; z++) {
          noise.args.position.x = x + state.offset.x;
          noise.args.position.y = state.offset.y;
          noise.args.position.z = z + state.offset.z;

          let value = noise.run();
          if (typeof value !== "number") value = value ? 1 : 0;

          const color = Math.floor(value * 255);
          const i = ((z - startZ) * width + (x - startX)) * 4;
          data[i + 0] = color;
          data[i + 1] = color;
          data[i + 2] = color;
          data[i + 3] = 255;
        }
      }
    }
    if (state.view2d.mode == Noise2DViewModes.BinaryCumulative) {
      const height = state.view2d.binaryCumulative.height;
      const heightStep = state.view2d.binaryCumulative.heightStep;
      const range = state.view2d.binaryCumulative.range;
      for (let x = startX; x < endX; x++) {
        for (let z = startZ; z < endZ; z++) {
          let count = 0;
          for (let y = 0; y < height; y += heightStep) {
            noise.args.position.x = x + state.offset.x;
            noise.args.position.y = y + state.offset.y;
            noise.args.position.z = z + state.offset.z;

            let value = noise.run();
            const v = value ? 1 : 0;
            if (v >= range[0] && v <= range[1]) count++;
          }
          const color = Math.floor((count / (height / heightStep)) * 255);
          const i = ((z - startZ) * width + (x - startX)) * 4;
          data[i + 0] = color;
          data[i + 1] = color;
          data[i + 2] = color;
          data[i + 3] = 255;
        }
      }
    }

    return [data, [data.buffer]];
  }

  const data = new Uint32Array(new ArrayBuffer((16 * 256 * 16) / 8));

  const height = state.view3d.binary.height;
  const heightStep = 1;
  const range = state.view2d.binary.range;
  for (let x = startX; x < endX; x++) {
    for (let z = startZ; z < endZ; z++) {
      for (let y = 0; y < height; y += heightStep) {
        noise.args.position.x = x + state.offset.x;
        noise.args.position.y = y + state.offset.y;
        noise.args.position.z = z + state.offset.z;

        let value = noise.run();
        const v = value ? 1 : 0;
        if (v >= range[0] && v <= range[1]) {
          setVoxelBit(data, getVoxelIndex(x - startX, y, z - startZ), true);
        }
      }
    }
  }

  return [data, [data.buffer]];
});
