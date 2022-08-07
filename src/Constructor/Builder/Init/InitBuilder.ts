import type { DivineVoxelEngineBuilder } from "../DivineVoxelEngineBuilder";
import { RegisterDefaultShapes } from "../Shapes/Functions/RegisterDefaultShapes.js";

export function InitBuilder(DVEB: DivineVoxelEngineBuilder) {
 DVEB.processor.$INIT();
 DVEB.voxelHelper.$INIT();
 RegisterDefaultShapes(DVEB);
}
