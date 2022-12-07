import { RegisterVoxelsForConstructor } from "../../Shared/Functions/RegisterVoxelsForConstructor.js";
import { DVEC } from "../../../out/Constructor/DivineVoxelEngineConstructor.js";
import { WorldGen } from "./WorldGen/WorldGen.js";


RegisterVoxelsForConstructor(DVEC);
DVEC.worldGen.setWorldGen(WorldGen);
await DVEC.$INIT();

(self as any).DVEC = DVEC;