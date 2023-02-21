import type { Scene, TransformNode, Vector3 } from "@babylonjs/core";
export declare const FOManager: {
    activeCamera: TransformNode | null;
    activeNode: TransformNode | null;
    onOriginSet: Function[];
    registerOnOriginSet(run: (node: TransformNode) => void): void;
    setOriginCenter(scene: Scene, object: {
        position: Vector3;
    }): void;
};
