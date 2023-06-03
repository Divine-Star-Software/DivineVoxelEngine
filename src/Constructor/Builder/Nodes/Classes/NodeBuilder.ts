import type { BuildNodeMesh, SetNodeMesh } from "Meta/Tasks/RenderTasks.types";

export abstract class NodeBuilder {
 constructor(public id: string) {}
 abstract build(data: BuildNodeMesh): [SetNodeMesh, ArrayBuffer[]] | false;
}
