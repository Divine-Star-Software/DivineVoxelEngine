import type { DivineVoxelEngineBuilder } from "../DivineVoxelEngineBuilder";
import { RegisterDefaultShapes } from "../Shapes/Functions/RegisterDefaultShapes.js";

export function InitBuilder(DVEB : DivineVoxelEngineBuilder,) {
    RegisterDefaultShapes(DVEB);
}