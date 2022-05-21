import { EntityTypes } from "./Entity.types";
import { BoundingBox } from "../Nexus/Physics/Physics.types";
import type { DivineVoxelEngineNexus } from "../../Nexus/DivineVoxelEngineNexus.js";
export declare type NexusEntityData = {
    type: EntityTypes;
    boundingBox: BoundingBox;
    numStates: number;
};
export interface NexusEntityInterface {
    position: Float32Array;
    states: Float32Array;
    active: boolean;
    $INIT(DVEN: DivineVoxelEngineNexus, data: NexusEntityData, otherData?: any): void;
    onSpawn(): void;
    onDeSpawn(): void;
    update(): void;
}
export declare type NexusEntity = new () => NexusEntityInterface;
