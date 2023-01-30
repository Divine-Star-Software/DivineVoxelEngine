import { ShaderCodeBody, ShaderData, ShaderDataTypes, ShaderTextureData } from "../Types/ShaderData.types";
declare type ShaderTypes = "shared" | "vertex" | "frag";
export declare class DVEShader {
    id: string;
    data: ShaderData;
    constructor(id: string, data: ShaderData);
    addUniform(data: [id: string, type: ShaderDataTypes][], forSharer?: ShaderTypes): this;
    addVarying(data: [id: string, type: ShaderDataTypes, set: ShaderCodeBody][]): this;
    addAttributes(data: [id: string, type: ShaderDataTypes][]): this;
    addTextures(data: [id: string, data: ShaderTextureData][]): this;
    addFunctions(id: string | string[], forSharer?: ShaderTypes): this;
}
export {};
