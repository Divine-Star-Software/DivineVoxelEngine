import type { DivineVoxelEngineFluidBuilder } from "Builder/FluidBuilder/DivineVoxelEngineFluidBuilder";
import { FluidSourceBlockVoxelShape } from "../Default/SourceBlock.voxel.shape.js";

export function RegisterDefaultFluidShapes(
 DVEFB: DivineVoxelEngineFluidBuilder
) {
 const sourceBlock = new FluidSourceBlockVoxelShape(DVEFB.shapeHelper);
 DVEFB.shapeManager.registerShape(sourceBlock);
}
