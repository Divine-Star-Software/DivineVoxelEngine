import type { TagBuilderNodes } from "Meta/Data/Tags/TagBuilder.types";
import type { RemoteTagManagerInitData, TagManagerBase } from "divine-binary-tags";
export declare class TagBuilder {
    id: string;
    dataSegment: string;
    _built: boolean;
    _nodeMap: Map<string, TagBuilderNodes>;
    _stringMaps: Map<string, {
        count: number;
        found: Record<string, number>;
        map: string[];
        allowedComms: string[];
    }>;
    _objectMaps: Map<string, {
        count: number;
        found: Record<string, number>;
        map: Record<number, any>;
        allowedComms: string[];
    }>;
    _defaults: Map<string, number>;
    _initData: RemoteTagManagerInitData;
    constructor(id: string, dataSegment: string);
    addNode(node: TagBuilderNodes | TagBuilderNodes[]): void;
    getNode(id: string): TagBuilderNodes | undefined;
    setDefaults(tagManager: TagManagerBase): void;
    hasNode(id: string): boolean;
    setNode(id: string, value: any, tagManager: TagManagerBase): false | undefined;
    build(totalTagIndexes: number): RemoteTagManagerInitData;
    sync(): void;
}
