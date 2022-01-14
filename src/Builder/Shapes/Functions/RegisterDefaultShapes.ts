import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import { FullBoxCrossVoxelShape } from "../default/flora/FullBoxCross.js";
import { BoxVoxelShape } from "../default/solid/Box.voxel.shape.js";
import type { ShapeManager } from "../ShapeManager";

export function RegisterDefaultShapes(shpaeManager : ShapeManager,shapeHelper : ShapeHelperInterface) {
    const boxVoxel = new BoxVoxelShape(shapeHelper);
    shpaeManager.registerShape(boxVoxel); 
    const fullBoxCross = new FullBoxCrossVoxelShape(shapeHelper);
    shpaeManager.registerShape(fullBoxCross);
}