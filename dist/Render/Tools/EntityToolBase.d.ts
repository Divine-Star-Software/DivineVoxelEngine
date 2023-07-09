import { Mesh } from "@babylonjs/core";
import { MatrixArray, MatrixProperty } from "../../Math/Classes/MatrixArray.js";
export declare class EntityInstance {
    private _tool;
    _matrix: MatrixArray;
    constructor(_tool: EntityToolBase, _matrix: MatrixArray);
    scale: MatrixProperty;
    position: MatrixProperty;
    destroy(): void;
    update(): void;
}
export declare class EntityToolBase {
    mesh: Mesh;
    _instanceAmount: number;
    _matrixArray: MatrixArray;
    _usedInstances: Map<number, EntityInstance>;
    constructor(mesh: Mesh);
    setInstanceAmount(amount: number): void;
    getInstance(): false | EntityInstance;
    returnInstance(instance: EntityInstance): void;
}
