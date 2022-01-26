import { ShapeHelper } from '../Shapes/ShapeHelper.ts';
import { ShapeManager } from '../Shapes/ShapeManager.ts';
import { Util } from '../../Global/Util.helper.ts';
import { FluidMeshBuilder } from './FluidMeshBuilder.ts';

declare class DivineVoxelEngineFluidBuilder {
    util: Util;
    worker: Worker;
    shapeHelper: ShapeHelper;
    shapeManager: ShapeManager;
    fluidMeshBuilder: FluidMeshBuilder;
    constructor();
    reStart(): void;
    $INIT(worker: Worker): void;
}

export { DivineVoxelEngineFluidBuilder };
