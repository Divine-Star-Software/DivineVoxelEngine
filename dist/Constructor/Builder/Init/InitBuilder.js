import { RegisterDefaultShapes } from "../Shapes/default/RegisterDefaultShapes.js";
export function InitBuilder(DVEB) {
    DVEB.processor.$INIT();
    DVEB.substanceRules.$INIT();
    RegisterDefaultShapes(DVEB);
}
