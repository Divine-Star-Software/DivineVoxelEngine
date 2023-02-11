import { ShaderCodeBody, ShaderData, ShaderDataTypes, ShaderFunctionData, ShaderTextureData, ShaderUniformData } from "../Types/ShaderData.types";
declare type ShaderTypes = "shared" | "vertex" | "frag";
export declare class DVEShader {
    id: string;
    data: ShaderData;
    constructor(id: string);
    compiled: {
        vertex: string;
        fragment: string;
    };
    setCodeBody(forSharer: ShaderTypes | undefined, text: string): this;
    getUniformList(): string[];
    getAttributeList(): string[];
    addUniform(data: ShaderUniformData[], forSharer?: ShaderTypes): this;
    addVarying(data: [id: string, type: ShaderDataTypes, set: ShaderCodeBody][]): this;
    addAttributes(data: [id: string, type: ShaderDataTypes][]): this;
    addTextures(data: [id: string, data: ShaderTextureData][]): this;
    addFunction<T = void>(id: string, forSharer: ShaderTypes, data: ShaderFunctionData<T>): this;
    loadInFunctions(id: string | string[], forSharer?: ShaderTypes): this;
    compile(): {
        vertex: string;
        fragment: string;
    };
    clone(newID: string): DVEShader;
}
export {};
