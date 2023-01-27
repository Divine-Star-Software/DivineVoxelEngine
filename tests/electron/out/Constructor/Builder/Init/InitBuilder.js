import { RegisterDefaultShapes } from "../Shapes/RegisterDefaultShapes.js";
export function InitBuilder(DVEB) {
    DVEB.processor.$INIT();
    DVEB.voxelHelper.$INIT();
    RegisterDefaultShapes(DVEB);
}
