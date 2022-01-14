import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import { FullBoxDiagonalIntersection } from "../default/DiagonalIntersection/FullBoxDiagonalIntersection.voxe.shape.js";
import { BoxVoxelShape } from "../default/Box/Box.voxel.shape.js";
import type { ShapeManager } from "../ShapeManager";

export function RegisterDefaultShapes(shpaeManager : ShapeManager,shapeHelper : ShapeHelperInterface) {
    const boxVoxel = new BoxVoxelShape(shapeHelper);
    shpaeManager.registerShape(boxVoxel); 
    const fullBoxDiagonalIntersection = new FullBoxDiagonalIntersection(shapeHelper);
    shpaeManager.registerShape(fullBoxDiagonalIntersection);
}