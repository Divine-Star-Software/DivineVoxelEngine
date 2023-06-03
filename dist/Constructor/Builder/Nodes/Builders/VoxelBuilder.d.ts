import type { BuildNodeMesh, SetNodeMesh } from "Meta/Tasks/RenderTasks.types.js";
import { NodeBuilder } from "../Classes/NodeBuilder.js";
import { BuilderDataTool } from "../../Tools/BuilderDataTool.js";
declare class VoxelBuilderBase extends NodeBuilder {
    id: string;
    dataTool: BuilderDataTool;
    constructor(id: string);
    build([location, type, rawVoxelData]: BuildNodeMesh): [SetNodeMesh, ArrayBuffer[]] | false;
}
export declare const VoxelBuilder: VoxelBuilderBase;
export {};
