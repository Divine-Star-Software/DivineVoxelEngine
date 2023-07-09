import { Mesh } from "@babylonjs/core";
import { MatrixArray, MatrixProperty } from "../../Math/Classes/MatrixArray.js";

export class EntityInstance {
 constructor(private _tool: EntityTool, public _matrix: MatrixArray) {
  this.scale = this._matrix.scale;
  this.position = this._matrix.position;
 }

 scale: MatrixProperty;
 position: MatrixProperty;

 destroy() {
  this._tool.returnInstance(this);
 }
 update() {
  this._tool.mesh.thinInstanceBufferUpdated("matrix");
 }
}

export class EntityTool {
 _instanceAmount = 0;
 _matrixArray: MatrixArray;
 _usedInstances = new Map<number, EntityInstance>();
 constructor(public mesh: Mesh) {}
 setInstanceAmount(amount: number) {
  this._matrixArray = new MatrixArray(amount);
  this.mesh.thinInstanceSetBuffer("matrix", this._matrixArray.matricies);
  this._instanceAmount = amount;
 }
 getInstance() {
  let i = this._instanceAmount;
  while (i--) {
   if (!this._usedInstances.get(i)) {
    const newInstance = new EntityInstance(
     this,
     new MatrixArray(this._matrixArray, i)
    );
    newInstance.scale.setAll(1);
    this._usedInstances.set(i, newInstance);
    newInstance.update();
    return newInstance;
   }
  }
  return false;
 }
 returnInstance(instance: EntityInstance) {
  instance.scale.setAll(0);
  this._usedInstances.delete(instance._matrix.trueIndex);
 }
}
