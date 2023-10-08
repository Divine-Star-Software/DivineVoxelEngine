import { ObjectPropertyValidatorResponse } from "Validation/ObjectValidation.types";
import {
  ObjectCollectionData,
  ObjectCollectionGroupData,
  ObjectCollectionInputs,
  StoredCollection,
} from "./ObjectCollection.types";
import { ObjectPropertyValidatorManager } from "./Validation/ObjectPropertyValidatorManager.js";

export class ObjectCollection<
  T extends {
    id: string;
    groupId: string;
    input?: ObjectCollectionInputs | any;
  } = ObjectCollectionData
> {
  _nodes: Map<
    string,
    {
      value: any;
      data: T;
    }
  > = new Map();
  _groups: Map<
    string,
    {
      data: ObjectCollectionGroupData;
      nodes: Map<string, T>;
    }
  > = new Map();

  constructor(public save: () => Promise<void> = async () => {}) {}

  addGroups(groups: ObjectCollectionGroupData[]) {
    for (const group of groups) {
      this._groups.set(group.id, { data: group, nodes: new Map() });
    }
  }

  getGroup(id: string) {
    return this._groups.get(id);
  }

  getData(id: string) {
    const node = this._nodes.get(id);
    if (!node) return false;
    return node.data;
  }

  addNodes(nodes: T[]) {
    for (const node of nodes) {
      this._nodes.set(node.id, {
        data: node,
        value: node?.input?.default,
      });
      const group = this._groups.get(node.groupId);
      if (!group) {
        throw new Error(`Group with id:${node.groupId} does not exist.`);
      }
      group.nodes.set(node.id, node);
    }
  }

  update<T = any>(id: string, value: T) {
    const nodes = this._nodes.get(id);
    if (!nodes) return false;
    if (nodes.data.input?.beforeStore) {
      //@ts-ignore
      value = nodes.data.input.beforeStore(value);
    }
    nodes.value = value;
    if (!nodes.data.input?.onUpdate) return;
    //@ts-ignore
    nodes.data.input.onUpdate(nodes.value);
  }

  get<T = any>(id: string) {
    const nodes = this._nodes.get(id);
    if (typeof nodes === "undefined") {
      throw new Error(
        `Node with id: ${id} does not exists in the object collection.`
      );
    }
    let value = nodes.value;
    return <T>value;
  }

  async validate(id: string): Promise<ObjectPropertyValidatorResponse> {
    const data = this.getData(id);
    if (!data) throw new Error(`Nodw with ${id} does not exist`);
    if (!data.input || !data.input.validator) return { success: true };
    const validator = ObjectPropertyValidatorManager.getValidator(
      data.input.validator
    );
    return validator.validate(this.get(data.id), data as any);
  }

  store() {
    const seralized: StoredCollection = [];
    for (const [key, data] of this._nodes) {
      let value = data.value;
      if (data.data.input) {
        if (data.data.input.beforeStore) {
          //@ts-ignore
          value = data.data.input.beforeStore(value as any);
        }
      }
      seralized.push([key, value]);
    }
    return seralized;
  }

  loadIn(data: StoredCollection) {
    for (const [key, value] of data) {
      const nodes = this._nodes.get(key);
      if (!nodes) continue;
      nodes.value = value;
      if (!nodes.data.input?.onUpdate) continue;
      //@ts-ignore
      nodes.data.input.onUpdate(<any>nodes.value);
    }
  }

  restoreDefaults() {
    for (const [key, data] of this._nodes) {
      if (data.data.input) {
        data.value = data.data.input.default;
      }
    }
  }
}
