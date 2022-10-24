import { RegisterVoxelsForConstructor } from "../../Shared/Functions/RegisterVoxelsForConstructor.js";
import { DVEC } from "../../../out/Constructor/DivineVoxelEngineConstructor.js";
import { RegisterItemShapes } from "../../Shared/Functions/RegisterItemShapes.js";
import { RegisterItemForConstructor } from "../../Shared/Functions/RegisterItemsForConstructor.js";

RegisterVoxelsForConstructor(DVEC);
RegisterItemForConstructor(DVEC);
RegisterItemShapes(DVEC);
(self as any).DVEC = DVEC;
DVEC.$INIT();
