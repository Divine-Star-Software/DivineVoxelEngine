/// <reference types="babylonjs" />
import type { FOCamera } from "./FOCamera";
export declare class FONode extends BABYLON.TransformNode {
    private _doublepos;
    get doublepos(): BABYLON.Vector3;
    set doublepos(pos: BABYLON.Vector3);
    constructor(name: string, scene: BABYLON.Scene);
    update(cam: FOCamera): void;
}
