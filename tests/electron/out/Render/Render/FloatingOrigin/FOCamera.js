export class FOCamera extends BABYLON.UniversalCamera {
    _list = new Array();
    // double precision position
    // you must use the doublepos to change its position, instead of position directly.
    _doublepos = new BABYLON.Vector3();
    get doublepos() {
        return this._doublepos;
    }
    set doublepos(pos) {
        this._doublepos.copyFrom(pos);
    }
    // double precision target
    // you must use the doubletgt to change it, instead of setTarget() directly.
    _doubletgt = new BABYLON.Vector3();
    get doubletgt() {
        return this._doubletgt;
    }
    set doubletgt(tgt) {
        this._doubletgt.copyFrom(tgt);
        this.setTarget(this._doubletgt.subtract(this._doublepos));
    }
    // Constructor
    constructor(name, position, scene) {
        super(name, BABYLON.Vector3.Zero(), scene);
        this.doublepos = position;
        this._scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
            // accumulate any movement on current frame
            // to the double precision position,
            // then clear the camera movement (move camera back to origin);
            // this would not be necessary if we moved the camera
            // ouselves from this class, but for now we're
            // leaving that responsibility for the original UniversalCamera,
            // so when it moves from origin, we must update our doublepos
            // and reset the UniversalCamera back to origin.
            this.doublepos.addInPlace(this.position);
            this.position.set(0, 0, 0);
            // iterate through all registered Entities
            for (let i = 0; i < this._list.length; i++) {
                // update the Entity
                this._list[i].update(this.doublepos);
            }
        });
    }
    // Register an Entity
    add(entity) {
        this._list.push(entity);
    }
}
