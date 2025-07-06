import { StartGenerator } from "@divinevoxel/vlox/Init/StartGenerator";
import { GraphWorldGen } from "./GraphWorldGen";
const gen = new GraphWorldGen();
gen.init();
await gen.initGraph();
await StartGenerator({});
