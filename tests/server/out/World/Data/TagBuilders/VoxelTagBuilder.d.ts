import type { TagBuilderNodes } from "Meta/Data/Tags/TagBuilder.types";
import type { TagManagerBase } from "Libs/DivineBinaryTags/Classes/TagManagerBase.js";
export declare const VoxelTagBuilder: {
    _nodeMap: Map<string, TagBuilderNodes>;
    _stringMaps: Map<string, {
        count: number;
        found: Record<string, number>;
        map: string[];
        allowedComms: string[];
    }>;
    _defaults: Map<string, number>;
    addNode(node: TagBuilderNodes | TagBuilderNodes[]): void;
    getNode(id: string): TagBuilderNodes | undefined;
    setDefaults(tagManager: TagManagerBase): void;
    setNode(id: string, value: string | number | boolean | number[], tagManager: TagManagerBase): false | undefined;
    $INIT(totalVoxels: number): import("../../../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData;
    $SYNC(): void;
};
