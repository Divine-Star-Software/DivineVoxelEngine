import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import { FullBoxDiagonalIntersection } from "../default/DiagonalIntersection/FullBoxDiagonalIntersection.voxe.shape.js";
import { BoxVoxelShape } from "../default/Box/Box.voxel.shape.js";
import type { ShapeManager } from "../ShapeManager";

export function RegisterDefaultShapes(shpaeManager : ShapeManager,shapeHelper : ShapeHelperInterface) {
    shpaeManager.registerShape(BoxVoxelShape); 
    const fullBoxDiagonalIntersection = new FullBoxDiagonalIntersection(shapeHelper);
    shpaeManager.registerShape(fullBoxDiagonalIntersection);
}