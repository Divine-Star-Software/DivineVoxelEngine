import type { ShaderDataTypes } from "../Types/ShaderData.types";
export declare class DivineMesh {
    id: string;
    data: {
        attributes: Map<any, any>;
    };
    constructor(id: string);
    getAttributeList(): any[];
    addAttributes(data: [id: string, type: ShaderDataTypes][]): this;
    clone(id: string): DivineMesh;
}
