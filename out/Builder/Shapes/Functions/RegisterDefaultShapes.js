import { FullBoxCrossVoxelShape } from "../default/flora/FullBoxCross.js";
import { BoxVoxelShape } from "../default/solid/Box.voxel.shape.js";
export function RegisterDefaultShapes(shpaeManager, shapeHelper) {
    const boxVoxel = new BoxVoxelShape(shapeHelper);
    shpaeManager.registerShape(boxVoxel);
    const fullBoxCross = new FullBoxCrossVoxelShape(shapeHelper);
    shpaeManager.registerShape(fullBoxCross);
}
