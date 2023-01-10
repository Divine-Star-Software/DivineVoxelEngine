/// <reference types="babylonjs" />
export declare class FONode extends BABYLON.TransformNode {
    private _doublepos;
    get doublepos(): BABYLON.Vector3;
    set doublepos(pos: BABYLON.Vector3);
    constructor(name: string, scene: BABYLON.Scene);
    update(vec3: BABYLON.Vector3): void;
}
