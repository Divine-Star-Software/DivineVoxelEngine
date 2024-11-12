import type { TagBuilderNodes } from "Types/StructBuilder.types.js";
import {
  BinaryStructData,
  BinraryStructBase,
  BinaryNumberTypes,
} from "@amodx/binary/";
import { BinaryStruct } from "@amodx/binary/";
import { MappedDataRegister } from "../../../../Data/Register/MappedDataRegister.js";
import {
  RegisterObjectMapSync,
  RegisterStringMapSync,
} from "Types/DataSync.types.js";
import { DivineVoxelEngineWorld } from "../../DivineVoxelEngineWorld.js";

export class StructBuilder {
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
      map: any[];
      allowedComms: string[];
    }
  >();
  _defaults = new Map<string, number>();
  _initData: BinaryStructData;

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

  setDefaults(tagManager: BinraryStructBase) {
    for (const [key, node] of this._nodeMap) {
      const defaultValue = this._defaults.get(key);
      if (!defaultValue) continue;
      tagManager.setProperty(key, Number(defaultValue));
    }
  }

  hasNode(id: string) {
    return this._nodeMap.has(id);
  }

  setNode(id: string, value: any, tagManager: BinraryStructBase) {
    const node = this.getNode(id);
    if (!node) return;
    if (node.type == "number") {
      tagManager.setProperty(node.id, Number(value));
    }
    if (node.type == "boolean") {
      tagManager.setProperty(node.id, Number(value));
    }
    if (node.type == "number-array") {
      if (!Array.isArray(value)) return false;
      let i = value.length;
      while (i--) {
        tagManager.setArrayPropertyValue(node.id, i, value[i]);
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
      tagManager.setProperty(node.id, data.found[v]);
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
      tagManager.setProperty(node.id, data.found[v]);
    }
  }

  build(totalTagIndexes: number = 0) {
    const tags = new BinaryStruct(this.id);
    for (const [key, node] of this._nodeMap) {
      if (node.type == "number") {
        tags.registerProperty({
          id: node.id,
          type: "typed-number",
          numberType: node.numberType,
        });
        this._defaults.set(node.id, node.default);
        continue;
      }
      if (node.type == "number-array") {
        tags.registerProperty({
          id: node.id,
          type: "typed-number-array",
          numberType: node.numberType,
          length: node.length,
        });
        continue;
      }
      if (node.type == "boolean") {
        tags.registerProperty({
          id: node.id,
          type: "boolean",
        });
        this._defaults.set(node.id, node.default ? 1 : 0);
      }
      if (node.type == "string-map") {
        tags.registerProperty({
          id: node.id,
          type: "typed-number",
          numberType: BinaryNumberTypes.Uint16,
        });
        this._stringMaps.set(node.id, {
          count: 0,
          found: {},
          map: [],
          allowedComms: node.allowedComms,
        });
      }
      if (node.type == "object-map") {
        tags.registerProperty({
          id: node.id,
          type: "typed-number",
          numberType: BinaryNumberTypes.Uint16,
        });
        this._objectMaps.set(node.id, {
          count: 0,
          found: {},
          map: [],
          allowedComms: node.allowedComms,
        });
      }
    }
    tags.init({
      indexBufferMode: "shared",
      numberOfIndexes: totalTagIndexes,
    });

    return tags;
  }

  sync() {
    for (const [key, map] of this._stringMaps) {
      const data: RegisterStringMapSync = [this.dataSegment, key, map.map];
      if (map.allowedComms.includes("world")) {
        MappedDataRegister.stringMaps.sync(data[0], data[1], data[2]);
      }
      DivineVoxelEngineWorld.instance.dataSync.loopThroughComms((comm) => {
        if (comm.name == "world") return;
        if (map.allowedComms.includes(comm.name)) {
          DivineVoxelEngineWorld.instance.dataSync.maps.strings.syncInThread(
            comm.name,
            data
          );
        }
      });
    }
    for (const [key, map] of this._objectMaps) {
      const data: RegisterObjectMapSync = [this.dataSegment, key, map.map];
      if (map.allowedComms.includes("world")) {
        MappedDataRegister.objectMaps.sync(data[0], data[1], data[2]);
      }
      DivineVoxelEngineWorld.instance.dataSync.loopThroughComms((comm) => {
        if (comm.name == "world") return;
        if (map.allowedComms.includes(comm.name)) {
          DivineVoxelEngineWorld.instance.dataSync.maps.objects.syncInThread(
            comm.name,
            data
          );
        }
      });
    }
  }
}
