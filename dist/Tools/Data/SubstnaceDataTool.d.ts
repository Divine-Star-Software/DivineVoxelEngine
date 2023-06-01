export declare class SubstanceDataTool {
    static tags: {
        id: string;
        setSubstance(id: string | number): void;
        initData: import("divine-binary-tags").RemoteTagManagerInitData;
        $INIT(data: import("divine-binary-tags").RemoteTagManagerInitData): void;
        byteOffSet: number;
        tagSize: number;
        tagIndexes: number;
        data: DataView;
        indexMap: Map<string, number>;
        index: DataView;
        setBuffer(data: DataView | import("divine-binary-tags").BufferTypes): void;
        getBuffer(): ArrayBuffer;
        setTagIndex(index: number): void;
        getTag(id: string): number;
        setTag(id: string, value: number): boolean;
        getArrayTagValue(id: string, index: number): number;
        getArrayTagByteIndex(id: string, index: number): number;
        setArrayTagValue(id: string, index: number, value: number): number | void;
        loopThroughTags(run: (id: string, value: number) => void): void;
        loopThroughIndex(run: (data: number[]) => void): void;
        loopThroughAllIndexTags(run: (id: string, value: number, index: number) => void): void;
    };
    static getTagValue(index: number, tag: string): number;
    substance: string;
    substanceTagIndex: number;
    setSubstance(substance: string): void;
    isSolid(): boolean;
    isLiquid(): boolean;
    getParent(): string;
    getRendered(): string;
    getCulled(): string[];
    getFlowRate(): number;
}
