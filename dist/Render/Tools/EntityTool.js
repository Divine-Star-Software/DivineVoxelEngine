import { MatrixArray } from "../../Math/Classes/MatrixArray.js";
export class EntityInstance {
    _tool;
    _matrix;
    constructor(_tool, _matrix) {
        this._tool = _tool;
        this._matrix = _matrix;
        this.scale = this._matrix.scale;
        this.position = this._matrix.position;
    }
    scale;
    position;
    destroy() {
        this._tool.returnInstance(this);
    }
    update() {
        this._tool.mesh.thinInstanceBufferUpdated("matrix");
    }
}
export class EntityTool {
    mesh;
    _instanceAmount = 0;
    _matrixArray;
    _usedInstances = new Map();
    constructor(mesh) {
        this.mesh = mesh;
    }
    setInstanceAmount(amount) {
        this._matrixArray = new MatrixArray(amount);
        this.mesh.thinInstanceSetBuffer("matrix", this._matrixArray.matricies);
        this._instanceAmount = amount;
    }
    getInstance() {
        let i = this._instanceAmount;
        while (i--) {
            if (!this._usedInstances.get(i)) {
                const newInstance = new EntityInstance(this, new MatrixArray(this._matrixArray, i));
                newInstance.scale.setAll(1);
                this._usedInstances.set(i, newInstance);
                newInstance.update();
                return newInstance;
            }
        }
        return false;
    }
    returnInstance(instance) {
        instance.scale.setAll(0);
        this._usedInstances.delete(instance._matrix.trueIndex);
    }
}
