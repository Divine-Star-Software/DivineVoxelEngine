import type { Builder as DVEBuilder } from "../Builder";
import { RegisterDefaultShapes } from "../Shapes/default/RegisterDefaultShapes.js";

export function InitBuilder(DVEB: typeof DVEBuilder) {
 DVEB.processor.$INIT();
 DVEB.substanceRules.$INIT();
 RegisterDefaultShapes(DVEB);
}
