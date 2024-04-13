import type { TagBuilderNodes } from "Types/TagBuilder.types.js";
import type {
  RemoteTagManagerInitData,
  TagManagerBase,
} from "@divinestar/binary/";
import { TagManager } from "@divinestar/binary/";
import { DataSync } from "../DataSync.js";
import { MappedDataRegister } from "../../../../Data/Register/MappedDataRegister.js";
import {
  RegisterObjectMapSync,
  RegisterStringMapSync,
} from "Types/DataSync.types.js";
import { DivineVoxelEngineWorld } from "../../../../Contexts/World/DivineVoxelEngineWorld.js";

export class TagBuilder {
  _built = false;
  _nodeMap = new Map<string, TagBuilderNodes>();
  _stringMaps = new Map<
    string,
    {
      count: number;
      found: Record<string, number>;
      map: string[];
      allowedComms: string[];
    }
  >();
  _objectMaps = new Map<
    string,
    {
      count: number;
      found: Record<string, number>;
      map: Record<number, any>;
      allowedComms: string[];
    }
  >();
  _defaults = new Map<string, number>();
  _initData: RemoteTagManagerInitData;

  constructor(public id: string, public dataSegment: string) {}

  addNode(node: TagBuilderNodes | TagBuilderNodes[]) {
    if (Array.isArray(node)) {
      for (const n of node) {
        this._nodeMap.set(n.id, n);
      }
      return;
    }
    this._nodeMap.set(node.id, node);
  }

  getNode(id: string) {
    return this._nodeMap.get(id);
  }

  setDefaults(tagManager: TagManagerBase) {
    for (const [key, node] of this._nodeMap) {
      const defaultValue = this._defaults.get(key);
      if (!defaultValue) continue;
      tagManager.setTag(key, Number(defaultValue));
    }
  }

  hasNode(id: string) {
    return this._nodeMap.has(id);
  }

  setNode(id: string, value: any, tagManager: TagManagerBase) {
    const node = this.getNode(id);
    if (!node) return;
    if (node.type == "number") {
      tagManager.setTag(node.id, Number(value));
    }
    if (node.type == "boolean") {
      tagManager.setTag(node.id, Number(value));
    }
    if (node.type == "number-array") {
      if (!Array.isArray(value)) return false;
      let i = value.length;
      while (i--) {
        tagManager.setArrayTagValue(node.id, i, value[i]);
      }
    }
    if (node.type == "string-map") {
      const data = this._stringMaps.get(node.id);
      if (!data) return false;
      const v = String(value).trim();
      if (data.found[v] === undefined) {
        data.map.push(v);
        data.found[v] = data.count;
        data.count++;
      }
      tagManager.setTag(node.id, data.found[v]);
    }
    if (node.type == "object-map") {
      const data = this._objectMaps.get(node.id);
      if (!data) return false;
      const v = JSON.stringify(value);
      if (data.found[v] === undefined) {
        data.map[data.count] = value;
        data.found[v] = data.count;
        data.count++;
      }
      tagManager.setTag(node.id, data.found[v]);
    }
  }

  build(totalTagIndexes: number = 0) {
    if (this._built) return this._initData;

    const tags = new TagManager(this.id);
    for (const [key, node] of this._nodeMap) {
      if (node.type == "number") {
        tags.registerTag({
          id: node.id,
          type: "typed-number",
          numberType: node.numberType,
        });
        this._defaults.set(node.id, node.default);
        continue;
      }
      if (node.type == "number-array") {
        tags.registerTag({
          id: node.id,
          type: "typed-number-array",
          numberType: node.numberType,
          length: node.length,
        });
        continue;
      }
      if (node.type == "boolean") {
        tags.registerTag({
          id: node.id,
          type: "boolean",
        });
        this._defaults.set(node.id, node.default ? 1 : 0);
      }
      if (node.type == "string-map") {
        tags.registerTag({
          id: node.id,
          type: "typed-number",
          numberType: "16ui",
        });
        this._stringMaps.set(node.id, {
          count: 0,
          found: {},
          map: [],
          allowedComms: node.allowedComms,
        });
      }
      if (node.type == "object-map") {
        tags.registerTag({
          id: node.id,
          type: "typed-number",
          numberType: "16ui",
        });
        this._objectMaps.set(node.id, {
          count: 0,
          found: {},
          map: {},
          allowedComms: node.allowedComms,
        });
      }
    }
    tags.$INIT({
      indexBufferMode: "shared",
      numberOfIndexes: totalTagIndexes,
    });
    this._initData = tags.initData;
    return this._initData;
  }

  sync() {
    for (const [key, map] of this._stringMaps) {
      const data: RegisterStringMapSync = [this.dataSegment, key, map.map];
      if (map.allowedComms.includes("world")) {
        MappedDataRegister.stringMaps.sync(data);
      }
      DivineVoxelEngineWorld.instance.core.dataSync.loopThroughComms((comm) => {
        if (comm.name == "world") return;
        if (map.allowedComms.includes(comm.name)) {
          DivineVoxelEngineWorld.instance.core.dataSync.maps.strings.syncInThread(
            comm.name,
            data
          );
        }
      });
    }
    for (const [key, map] of this._objectMaps) {
      const data: RegisterObjectMapSync = [this.dataSegment, key, map.map];
      if (map.allowedComms.includes("world")) {
        MappedDataRegister.objectMaps.sync(data);
      }
      DivineVoxelEngineWorld.instance.core.dataSync.loopThroughComms((comm) => {
        if (comm.name == "world") return;
        if (map.allowedComms.includes(comm.name)) {
          DivineVoxelEngineWorld.instance.core.dataSync.maps.objects.syncInThread(
            comm.name,
            data
          );
        }
      });
    }
  }
}
