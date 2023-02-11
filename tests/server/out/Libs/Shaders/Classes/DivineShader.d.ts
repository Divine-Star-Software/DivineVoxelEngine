import { ShaderData, ShaderDataTypes, ShaderFunctionData, ShaderTextureData, ShaderUniformData, ShaderVaryingData } from "../Types/ShaderData.types";
declare type ShaderTypes = "shared" | "vertex" | "frag";
export declare class DivineShader {
    id: string;
    data: ShaderData;
    compiled: {
        vertex: string;
        fragment: string;
    };
    constructor(id: string);
    setCodeBody(forSharer: ShaderTypes | undefined, text: string): this;
    getUniformList(): string[];
    getAttributeList(): any[];
    addAttributes(data: [id: string, type: ShaderDataTypes][]): this;
    setArgumentOverride(type: "function" | "varying" | "snippet", id: string, data: any): Map<string, any> | undefined;
    addUniform(data: ShaderUniformData[], forSharer?: ShaderTypes): this;
    addVarying(data: ShaderVaryingData<any>[]): this;
    addTextures(data: [id: string, data: ShaderTextureData][]): this;
    addFunction<T = void>(id: string, forSharer: ShaderTypes, data: ShaderFunctionData<T>): this;
    loadInFunctions(id: string | string[], forSharer?: ShaderTypes): this;
    compile(): {
        vertex: string;
        fragment: string;
    };
    clone(newID: string): DivineShader;
    merge(shader: DivineShader, overrideMesh?: boolean): DivineShader;
}
export {};
