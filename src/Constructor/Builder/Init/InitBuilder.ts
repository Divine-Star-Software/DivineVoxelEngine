import type { DVEB as DVEBuilder} from "../DivineVoxelEngineBuilder";
import { RegisterDefaultShapes } from "../Shapes/Functions/RegisterDefaultShapes.js";

export function InitBuilder(DVEB: typeof DVEBuilder ) {
 DVEB.processor.$INIT();
 DVEB.voxelHelper.$INIT();
 RegisterDefaultShapes(DVEB);
}
