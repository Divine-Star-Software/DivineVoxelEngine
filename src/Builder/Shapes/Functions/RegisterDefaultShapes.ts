import type { DivineVoxelEngineBuilder } from "../../DivineVoxelEngineBuilder.js";
//shapes
import { FullBoxDiagonalIntersection } from "../default/DiagonalIntersection/FullBoxDiagonalIntersection.voxe.shape.js";
import { BoxVoxelShape } from "../default/Box/Box.voxel.shape.js";
import { FluidSourceBlockVoxelShape } from "../default/Fluid/SourceBlock.voxel.shape.js";

export function RegisterDefaultShapes(DVEB: DivineVoxelEngineBuilder) {
 DVEB.shapeManager.registerShape(BoxVoxelShape);
 DVEB.shapeManager.registerShape(FluidSourceBlockVoxelShape);
 DVEB.shapeManager.registerShape(FullBoxDiagonalIntersection);
}
