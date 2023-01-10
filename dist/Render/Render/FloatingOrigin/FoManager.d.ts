/// <reference types="babylonjs" />
import { Vector3 } from "Meta/Util.types.js";
import { FOCamera } from "./FOCamera.js";
import { FONode } from "./FONode.js";
export declare const FOManager: {
    activeCamera: FOCamera | null;
    activeNode: FONode | null;
    getCamera(scene: BABYLON.Scene, name: string, position?: BABYLON.Vector3, canvas?: HTMLCanvasElement): FOCamera;
    getNode(scene: BABYLON.Scene, name: string): FONode;
    setOriginCenter(scene: BABYLON.Scene, object: {
        position: BABYLON.Vector3;
    }): void;
};
