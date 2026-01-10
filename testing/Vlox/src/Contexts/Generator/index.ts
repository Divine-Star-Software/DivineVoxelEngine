import { StartGenerator } from "@divinevoxel/vlox/Init/StartGenerator";
/* import { GraphWorldGen } from "./GraphWorldGen";
const gen = new GraphWorldGen();
gen.init(); */

import { WorldGen } from "./WorldGen";
const gen = new WorldGen();
gen.init();
await StartGenerator({});
