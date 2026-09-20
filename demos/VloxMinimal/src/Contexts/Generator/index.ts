import { StartGenerator } from "@divinevoxel/vlox/Init/StartGenerator";
import { WorldGen } from "./WorldGen";
import { WorldGeneration } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGeneration";
const gen = new WorldGen();
WorldGeneration.setWorldGen(gen);
gen.init();
await StartGenerator({});
