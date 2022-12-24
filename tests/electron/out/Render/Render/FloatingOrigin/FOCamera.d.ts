/// <reference types="babylonjs" />
import type { FONode } from "./FONode";
export declare class FOCamera extends BABYLON.UniversalCamera {
    private _list;
    private _doublepos;
    get doublepos(): BABYLON.Vector3;
    set doublepos(pos: BABYLON.Vector3);
    private _doubletgt;
    get doubletgt(): BABYLON.Vector3;
    set doubletgt(tgt: BABYLON.Vector3);
    constructor(name: string, position: BABYLON.Vector3, scene: BABYLON.Scene);
    add(entity: FONode): void;
}
