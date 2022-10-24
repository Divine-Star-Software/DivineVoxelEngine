import { RegisterDefaultShapes } from "../Shapes/Functions/RegisterDefaultShapes.js";
export function InitBuilder(DVEB) {
    DVEB.processor.$INIT();
    DVEB.voxelHelper.$INIT();
    RegisterDefaultShapes(DVEB);
}
