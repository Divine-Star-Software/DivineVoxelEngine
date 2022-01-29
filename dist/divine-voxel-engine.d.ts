import { ShapeHelper } from '../Shapes/ShapeHelper.ts';
import { ShapeManager } from '../Shapes/ShapeManager.ts';
import { Util } from '../../Global/Util.helper.ts';
import { FluidMeshBuilder } from './FluidMeshBuilder.ts';
import { EngineSettings } from '../../Global/EngineSettings.ts';
import { EngineSettingsData } from 'Meta/Global/EngineSettings.types.js';

declare class DivineVoxelEngineFluidBuilder {
    util: Util;
    worker: Worker;
    engineSettings: EngineSettings;
    shapeHelper: ShapeHelper;
    shapeManager: ShapeManager;
    fluidMeshBuilder: FluidMeshBuilder;
    constructor();
    reStart(): void;
    syncSettings(data: EngineSettingsData): void;
    $INIT(worker: Worker): void;
}

export { DivineVoxelEngineFluidBuilder };
