import { URIScene } from "../Scenes/URIScene.js";
import { URIMeshBase } from "./URIMeshBase.js";

export abstract class URIInstanceMeshEntity<
  InternalEntity extends any = unknown
> {
  _entity: InternalEntity;
}

export abstract class URIInstanceMesh<
  Scene extends URIScene = URIScene,
  InternalMesh extends any = unknown,
  InstanceMeshEntity extends URIInstanceMeshEntity = URIInstanceMeshEntity
> extends URIMeshBase {
  _mesh: InternalMesh;
  constructor(public scene: Scene) {
    super();
  }
  abstract setCount(amount: number): void;
  abstract setInstanceBuffer(id: string, data: ArrayBuffer): void;
  abstract getInstance(): InstanceMeshEntity;
}
