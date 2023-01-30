import { ShaderCodeBody, ShaderData, ShaderDataTypes, ShaderFunctionData, ShaderTextureData } from "../Types/ShaderData.types";
declare type ShaderTypes = "shared" | "vertex" | "frag";
export declare class DVEShader {
    id: string;
    data: ShaderData;
    constructor(id: string, data: ShaderData);
    compiled: {
        vertex: string;
        fragment: string;
    };
    setCodeBody(forSharer: ShaderTypes | undefined, text: string): this;
    getUniformList(): string[];
    getAttributeList(): string[];
    addUniform(data: [id: string, type: ShaderDataTypes][], forSharer?: ShaderTypes): this;
    addVarying(data: [id: string, type: ShaderDataTypes, set: ShaderCodeBody][]): this;
    addAttributes(data: [id: string, type: ShaderDataTypes][]): this;
    addTextures(data: [id: string, data: ShaderTextureData][]): this;
    addFunction(id: string, forSharer: ShaderTypes, data: ShaderFunctionData): this;
    loadInFunctions(id: string | string[], forSharer?: ShaderTypes): this;
    compile(): {
        vertex: string;
        fragment: string;
    };
    clone(newID: string): DVEShader;
}
export {};
