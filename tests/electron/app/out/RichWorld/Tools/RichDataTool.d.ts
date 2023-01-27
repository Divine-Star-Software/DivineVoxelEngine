import type { TypedNode } from "Libs/DivineBinaryObject/Classes/TypedNode.js";
import { RichDataToolBase } from "./Classes/RichDataToolBase.js";
import { RichChunkDataTool } from "./RichChunkDataTool.js";
export declare class RichDataTool extends RichDataToolBase {
    data: TypedNode<any>;
    static chunkTool: RichChunkDataTool;
    loadIn(): boolean;
    create<T>(data: TypedNode<T>): void;
    setData(data: TypedNode<any>): void;
    getData<T>(): TypedNode<T>;
    commit(): boolean;
    toBuffer(): false | ArrayBuffer;
}
