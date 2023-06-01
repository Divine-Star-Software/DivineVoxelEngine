import { TagManager } from "divine-binary-tags";
import { DataSync } from "../DataSync.js";
import { MappedDataRegister } from "../../../Data/Register/MappedDataRegister.js";
export class TagBuilder {
    id;
    dataSegment;
    _built = false;
    _nodeMap = new Map();
    _stringMaps = new Map();
    _objectMaps = new Map();
    _defaults = new Map();
    _initData;
    constructor(id, dataSegment) {
        this.id = id;
        this.dataSegment = dataSegment;
    }
    addNode(node) {
        if (Array.isArray(node)) {
            for (const n of node) {
                this._nodeMap.set(n.id, n);
            }
            return;
        }
        this._nodeMap.set(node.id, node);
    }
    getNode(id) {
        return this._nodeMap.get(id);
    }
    setDefaults(tagManager) {
        for (const [key, node] of this._nodeMap) {
            const defaultValue = this._defaults.get(key);
            if (!defaultValue)
                continue;
            tagManager.setTag(key, Number(defaultValue));
        }
    }
    hasNode(id) {
        return this._nodeMap.has(id);
    }
    setNode(id, value, tagManager) {
        const node = this.getNode(id);
        if (!node)
            return;
        if (node.type == "number") {
            tagManager.setTag(node.id, Number(value));
        }
        if (node.type == "boolean") {
            tagManager.setTag(node.id, Number(value));
        }
        if (node.type == "number-array") {
            if (!Array.isArray(value))
                return false;
            let i = value.length;
            while (i--) {
                tagManager.setArrayTagValue(node.id, i, value[i]);
            }
        }
        if (node.type == "string-map") {
            const data = this._stringMaps.get(node.id);
            if (!data)
                return false;
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
            if (!data)
                return false;
            const v = JSON.stringify(value);
            if (data.found[v] === undefined) {
                data.map[data.count] = value;
                data.found[v] = data.count;
                data.count++;
            }
            tagManager.setTag(node.id, data.found[v]);
        }
    }
    build(totalTagIndexes) {
        if (this._built)
            return this._initData;
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
            const data = [this.dataSegment, key, map.map];
            if (map.allowedComms.includes("world")) {
                MappedDataRegister.stringMaps.sync(data);
            }
            DataSync.loopThroughComms((comm) => {
                if (comm.name == "world")
                    return;
                if (map.allowedComms.includes(comm.name)) {
                    DataSync.maps.strings.syncInThread(comm.name, data);
                }
            });
        }
        for (const [key, map] of this._objectMaps) {
            const data = [this.dataSegment, key, map.map];
            if (map.allowedComms.includes("world")) {
                MappedDataRegister.objectMaps.sync(data);
            }
            DataSync.loopThroughComms((comm) => {
                if (comm.name == "world")
                    return;
                if (map.allowedComms.includes(comm.name)) {
                    DataSync.maps.objects.syncInThread(comm.name, data);
                }
            });
        }
    }
}
