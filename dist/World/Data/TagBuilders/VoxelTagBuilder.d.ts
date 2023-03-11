import type { TagBuilderNodes } from "Meta/Data/Tags/TagBuilder.types";
import type { TagManagerBase } from "divine-binary-tags";
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
    hasNode(id: string): boolean;
    setNode(id: string, value: string | number | boolean | number[], tagManager: TagManagerBase): false | undefined;
    $INIT(totalVoxels: number): import("divine-binary-tags").RemoteTagManagerInitData;
    $SYNC(): void;
};
