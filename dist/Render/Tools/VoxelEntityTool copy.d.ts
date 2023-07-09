import { Mesh } from "@babylonjs/core";
import { MatrixArray, MatrixProperty } from "../../Math/Classes/MatrixArray.js";
export declare class VoxelEntityInstance {
    private _tool;
    _matrix: MatrixArray;
    constructor(_tool: VoxelEntityTool, _matrix: MatrixArray);
    scale: MatrixProperty;
    position: MatrixProperty;
    destroy(): void;
    update(): void;
}
export declare class VoxelEntityTool {
    mesh: Mesh;
    _instanceAmount: number;
    _matrixArray: MatrixArray;
    _usedInstances: Map<number, VoxelEntityInstance>;
    constructor(mesh: Mesh);
    setInstanceAmount(amount: number): void;
    getInstance(): false | VoxelEntityInstance;
    returnInstance(instance: VoxelEntityInstance): void;
}
