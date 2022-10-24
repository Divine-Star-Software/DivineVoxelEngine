import { RegisterVoxelsForConstructor } from "../../Shared/Functions/RegisterVoxelsForConstructor.js";
import { DVEC } from "../../../out/Constructor/DivineVoxelEngineConstructor.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxelsForConstructor(DVEC);
DVEC.DVEWG.setWorldGen(WorldGen);
await DVEC.$INIT();
