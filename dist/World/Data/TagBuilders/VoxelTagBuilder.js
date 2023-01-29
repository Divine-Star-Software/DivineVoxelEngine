import { VoxelTagIDs } from "../../../Data/Constants/Tags/VoxelTagIds.js";
import { TagManager } from "../../../Libs/DivineBinaryTags/TagManager.js";
import { DataSync } from "../DataSync.js";
import { Register } from "../../../Data/Register/Register.js";
export const VoxelTagBuilder = {
    _nodeMap: new Map(),
    _stringMaps: new Map(),
    _defaults: new Map(),
    addNode(node) {
        if (Array.isArray(node)) {
            for (const n of node) {
                this._nodeMap.set(n.id, n);
            }
            return;
        }
        this._nodeMap.set(node.id, node);
    },
    getNode(id) {
        return this._nodeMap.get(id);
    },
    setDefaults(tagManager) {
        for (const [key, node] of this._nodeMap) {
            const defaultValue = this._defaults.get(key);
            if (!defaultValue)
                continue;
            tagManager.setTag(key, Number(defaultValue));
        }
    },
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
    },
    $INIT(totalVoxels) {
        const tags = new TagManager("voxel-tag-manager");
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
        }
        tags.$INIT({
            indexBufferMode: "shared",
            numberOfIndexes: totalVoxels,
        });
        return tags.initData;
    },
    $SYNC() {
        for (const [key, map] of this._stringMaps) {
            DataSync.loopThroughComms((comm) => {
                if (map.allowedComms.includes(comm.name)) {
                    const data = ["voxel", key, map.map];
                    if (comm.name == "world") {
                        Register.stringMaps.syncStringMap(data);
                        return;
                    }
                    DataSync.stringMap.syncInThread(comm.name, data);
                }
            });
        }
    },
};
VoxelTagBuilder.addNode([
    {
        id: VoxelTagIDs.substance,
        type: "string-map",
        allowedComms: ["constructor", "nexus", "fx", "world"],
    },
    {
        id: VoxelTagIDs.shapeID,
        type: "string-map",
        allowedComms: ["constructor"],
    },
    {
        id: VoxelTagIDs.colliderID,
        type: "string-map",
        allowedComms: ["nexus"],
    },
    {
        id: VoxelTagIDs.checkCollisions,
        type: "boolean",
        default: false,
    },
    {
        id: VoxelTagIDs.material,
        type: "string-map",
        allowedComms: ["nexus"],
    },
    {
        id: VoxelTagIDs.isLightSource,
        type: "boolean",
        default: false,
    },
    {
        id: VoxelTagIDs.lightValue,
        type: "number",
        numberType: "16ui",
        default: 0,
    },
    {
        id: VoxelTagIDs.isRich,
        type: "boolean",
        default: false,
    },
    {
        id: VoxelTagIDs.hardness,
        type: "number",
        numberType: "32ui",
        default: 0,
    },
]);
