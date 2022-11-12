/// <reference types="babylonjs" />
import type { EntityTypes } from "../../Data/Entity/Entity.types";
export declare type RenderedEntityData = {
    type: EntityTypes;
    dependencies: any;
};
export interface RenderedEntityInterface {
    position: Float32Array;
    states: Float32Array;
    $INIT(data: RenderedEntityData): void;
    onSpawn(scene: BABYLON.Scene): void;
    onDeSpawn(): void;
    update(): void;
}
export declare type RenderedEntity = new () => RenderedEntityInterface;
