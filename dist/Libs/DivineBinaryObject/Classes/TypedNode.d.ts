export declare class TypedNode<T> {
    data: [type: number, listType: number, length: number, value: T];
    get length(): number;
    get type(): number;
    get typeName(): import("../Types/MMD.types.js").MMDMarks;
    get primiteName(): DBOPrimitive;
    get listType(): number;
    get listTypeName(): DBOPrimitive;
    get value(): T;
    set value(data: T);
    constructor(type: number, value: T, listType?: number, length?: number);
}
