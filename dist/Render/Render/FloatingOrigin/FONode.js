export class FONode extends BABYLON.TransformNode {
    // you must use the doublepos property instead of position directly
    _doublepos = new BABYLON.Vector3();
    get doublepos() { return this._doublepos; }
    set doublepos(pos) { this._doublepos.copyFrom(pos); }
    constructor(name, scene) {
        super(name, scene);
    }
    // This is called automatically by OriginCamera
    update(vec3) {
        this.position = this.doublepos.subtract(vec3);
    }
}
