export declare class TypedNode<T> {
    data: [type: number, listType: number, length: number, value: T];
    get length(): number;
    get type(): number;
    get typeName(): import("../Types/MMD.types.js").MMDMarks;
    get listType(): number;
    get listTypeName(): import("../Types/MMD.types.js").MMDMarks;
    get value(): T;
    set value(data: T);
    constructor(type: number, value: T, listType?: number, length?: number);
}
