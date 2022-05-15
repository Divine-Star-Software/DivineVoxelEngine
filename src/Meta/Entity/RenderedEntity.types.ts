import { EntityTypes } from "./Entity.types";



export type RenderedEntityData = {
    type : EntityTypes;
    dependencies : any;
}


export interface RenderedEntityInterface {
 position: Float32Array;
 states: Float32Array;
 $INIT(data : RenderedEntityData): void;
 onSpawn(scene : BABYLON.Scene): void;
 onDeSpawn() : void;
 update(): void;
}
export type RenderedEntity =new () => RenderedEntityInterface;
