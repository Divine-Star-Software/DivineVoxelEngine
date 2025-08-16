import { StartGenerator } from "@divinevoxel/vlox/Init/StartGenerator";
import { WorldGeneration } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGeneration";
import { WorldGen } from "./WorldGen";

const gen = new WorldGen();
gen.init();
WorldGeneration.setWorldGen(gen)
await StartGenerator();
