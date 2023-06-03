import { BuildNodeMesh, SetNodeMesh } from "Meta/Tasks/RenderTasks.types.js";
import { NodeBuilder } from "../Classes/NodeBuilder.js";
declare class TXTBuilderBase extends NodeBuilder {
    build(data: BuildNodeMesh): [SetNodeMesh, ArrayBuffer[]];
}
export declare const TextureBuilder: TXTBuilderBase;
export {};
