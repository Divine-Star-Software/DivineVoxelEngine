import { Mesh } from "@babylonjs/core";
import { MatrixArray } from "./MatrixArray"
import { EntityInstance } from "./EntityInstance.js";
import "@babylonjs/core/Meshes/thinInstanceMesh";
export class EntityTool {
  _instanceAmount = 0;
  _matrixArray: MatrixArray;
  _instances: EntityInstance[] = [];
  _usedInstances = new Set<EntityInstance>();
  _bufferIds: string[] = [];
  constructor(public mesh: Mesh) {}

  addBuffer(id: string, buffer: Float32Array, stride?: number) {
    this.mesh.thinInstanceSetBuffer(id, buffer, stride, false);
    this._bufferIds.push(id);
  }

  setInstanceAmount(amount: number) {
    this._matrixArray = new MatrixArray(amount);
    this.addBuffer("matrix", this._matrixArray.matricies, 16);

    this._instanceAmount = amount;
    let i = this._instanceAmount;
    while (i--) {
      const newInstance = new EntityInstance(
        i,
        new MatrixArray(this._matrixArray, i),
        this
      );
      newInstance.scale.setAll(0);
      this._instances.push(newInstance);
    }
    this.update();
  }

  getInstance() {
    const instance = this._instances.shift();
    if (!instance) return false;
    instance.scale.setAll(1);
    instance.position.setAll(0);

    this._usedInstances.add(instance);
    return instance;
  }

  returnInstance(instance: EntityInstance) {
    instance.scale.setAll(0);
    instance.position.setAll(0);

    this._instances.push(instance);
    this._usedInstances.delete(instance);
  }

  returnAll() {
    for (const instance of this._usedInstances) {
      this.returnInstance(instance);
    }
    this._usedInstances.clear();
  }

  update() {
    this._bufferIds.forEach((_) => this.mesh.thinInstanceBufferUpdated(_));
  }
}
