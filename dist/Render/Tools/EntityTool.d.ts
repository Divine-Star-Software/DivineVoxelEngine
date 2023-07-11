import { Mesh } from "@babylonjs/core";
import { MatrixArray, MatrixProperty } from "../../Math/Classes/MatrixArray.js";
export declare class EntityInstance {
    private _tool;
    _matrix: MatrixArray;
    constructor(_tool: EntityTool, _matrix: MatrixArray);
    piviotPoint: {
        x: number;
        y: number;
        z: number;
    };
    _scale: {
        x: number;
        y: number;
        z: number;
    };
    scale: MatrixProperty;
    _rotation: {
        x: number;
        y: number;
        z: number;
    };
    rotation: MatrixProperty;
    _position: {
        x: number;
        y: number;
        z: number;
    };
    position: MatrixProperty;
    _updateMatrix(): void;
    destroy(): void;
    update(): void;
}
export declare class EntityTool {
    mesh: Mesh;
    _instanceAmount: number;
    _matrixArray: MatrixArray;
    _usedInstances: Map<number, EntityInstance>;
    constructor(mesh: Mesh);
    setInstanceAmount(amount: number): void;
    getInstance(): false | EntityInstance;
    returnInstance(instance: EntityInstance): void;
    update(): void;
}
