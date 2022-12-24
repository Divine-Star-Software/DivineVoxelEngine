import type { FOCamera } from "./FOCamera";

export class FONode extends BABYLON.TransformNode {
    // you must use the doublepos property instead of position directly
    private _doublepos: BABYLON.Vector3 = new BABYLON.Vector3();
    public get doublepos() { return this._doublepos; }
    public set doublepos(pos: BABYLON.Vector3) { this._doublepos.copyFrom(pos); }

    constructor(name: string, scene: BABYLON.Scene) {
        super(name, scene);
    }

    // This is called automatically by OriginCamera
    public update(cam: FOCamera): void {
        this.position = this.doublepos.subtract(cam.doublepos);
    }
}
