import { DVEC } from "../../../out/Constructor/DivineVoxelEngineConstructor.js";
import { RegisterVoxelsForConstructor } from "../Functions/RegisterVoxelsForConstructor.js";

RegisterVoxelsForConstructor(DVEC);
await DVEC.$INIT();
if (DVEC.environment == "browser") {
 //testing purposes only
 (self as any).DVEC = DVEC;
}
