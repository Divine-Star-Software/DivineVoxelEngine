import { StartGenerator } from "@divinevoxel/vlox/Init/StartGenerator";
import { WorldGen } from "./WorldGen";
const gen = new WorldGen();
gen.init();
await StartGenerator({});
