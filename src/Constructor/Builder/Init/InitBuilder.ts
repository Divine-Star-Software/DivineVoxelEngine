import type { Builder as DVEBuilder} from "../Builder";
import { RegisterDefaultShapes } from "../Shapes/RegisterDefaultShapes.js";

export function InitBuilder(DVEB: typeof DVEBuilder ) {
 DVEB.processor.$INIT();
 DVEB.voxelHelper.$INIT();
 RegisterDefaultShapes(DVEB);
}
