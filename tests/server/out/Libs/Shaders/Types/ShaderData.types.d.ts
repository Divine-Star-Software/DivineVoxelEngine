import type { DivineMesh } from "../Classes/DivineMesh";
export declare type ShaerTextureTypes = "sampler2DArray";
export declare type ShaderTextureData = {
    isArray?: boolean;
    arrayLength?: number;
    type: ShaerTextureTypes;
};
export declare type ShaderDataTypes = "vec4" | "vec3" | "vec2" | "float" | "mat4" | "int";
export declare type ShaderData = {
    mesh: DivineMesh;
    snippetArgumentOverrides: Map<string, any>;
    sharedDefines: Map<string, ShaderDefinesData>;
    vertexDefines: Map<string, ShaderDefinesData>;
    fragDefines: Map<string, ShaderDefinesData>;
    sharedUniforms: Map<string, ShaderUniformData>;
    vertexUniforms: Map<string, ShaderUniformData>;
    fragxUniforms: Map<string, ShaderUniformData>;
    varying: Map<string, ShaderVaryingData<any>>;
    varyingArgumentOverrides: Map<string, any>;
    localVertexFunctions: Map<string, ShaderFunctionData<any>>;
    localFragFunctions: Map<string, ShaderFunctionData<any>>;
    sharedFunctions: string[];
    fragFunctions: string[];
    vertexFunctions: string[];
    functionArgumentOverrides: Map<string, any>;
    textures: Map<string, ShaderTextureData>;
    fragMain: ShaderCodeBody;
    vertexMain: ShaderCodeBody;
};
export declare type ShaderCodeBody = {
    GLSL: string;
    WGSL?: string;
};
export declare type GeneratedShaderCodeBody<T> = {
    GLSL: (data: T) => string;
    WGSL?: (data: T) => string;
};
export declare type ShaderFunctionData<T> = ShaderFuncitonBase<T> & {
    overrides?: ShaderFuncitonBase<T>[];
};
export declare type ShaderVaryingData<T> = {
    id: string;
    type: ShaderDataTypes;
    arguments?: T;
    body: GeneratedShaderCodeBody<T>;
};
declare type ShaderFuncitonBase<T> = {
    inputs: [
        id: string,
        type: ShaderDataTypes | [type: ShaderDataTypes, arreyLength: number] | ShaerTextureTypes | [type: ShaerTextureTypes, arreyLength: number]
    ][];
    output: ShaderDataTypes;
    setID?: string;
    arguments: T;
    body: GeneratedShaderCodeBody<T>;
};
export declare type ShaderSnippetData<T> = {
    id: string;
    arguments?: T;
    body: GeneratedShaderCodeBody<T>;
};
export declare type ShaderDefinesData = [name: string, value: number];
export declare type ShaderUniformData = [name: string, type: ShaderDataTypes] | [name: string, type: ShaderDataTypes, arrayLength: number];
export declare type ShaderAttributeData = [name: string, type: ShaderDataTypes];
export {};
