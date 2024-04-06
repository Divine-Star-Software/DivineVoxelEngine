import { BuildNodeMesh, SetNodeMesh } from "Builder/Tasks/BuidlerTasks.types";

export abstract class NodeBuilder {
 constructor(public id: string) {}
 abstract build(data: BuildNodeMesh): [SetNodeMesh, ArrayBuffer[]] | false;
}
