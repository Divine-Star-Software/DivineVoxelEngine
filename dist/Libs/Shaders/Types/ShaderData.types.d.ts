export declare type ShaerTextureTypes = "sampler2DArray";
export declare type ShaderTextureData = {
    isArray?: boolean;
    arrayLength?: number;
    type: ShaerTextureTypes;
};
export declare type ShaderDataTypes = "vec4" | "vec3" | "vec2" | "float" | "mat4" | "int";
export declare type ShaderData = {
    attributes: Map<string, ShaderDataTypes>;
    sharedUniforms: Map<string, ShaderUniformData>;
    vertexUniforms: Map<string, ShaderUniformData>;
    fragxUniforms: Map<string, ShaderUniformData>;
    sharedDefines: Map<string, ShaderDefinesData>;
    vertexDefines: Map<string, ShaderDefinesData>;
    fragDefines: Map<string, ShaderDefinesData>;
    localVertexFunctions: Map<string, ShaderFunctionData>;
    localFragFunctions: Map<string, ShaderFunctionData>;
    textures: Map<string, ShaderTextureData>;
    varying: Map<string, [ShaderDataTypes, ShaderCodeBody]>;
    sharedFunctions: string[];
    fragFunctions: string[];
    vertexFunctions: string[];
    fragMain: ShaderCodeBody;
    vertexMain: ShaderCodeBody;
};
export declare type ShaderCodeBody = {
    GLSL: string;
    WGSL?: string;
};
export declare type ShaderFunctionData = ShaderFuncitonBase & {
    overrides?: ShaderFuncitonBase[];
};
declare type ShaderFuncitonBase = {
    inputs: [
        id: string,
        type: ShaderDataTypes | [type: ShaderDataTypes, arreyLength: number] | ShaerTextureTypes | [type: ShaerTextureTypes, arreyLength: number]
    ][];
    output: ShaderDataTypes;
    body: ShaderCodeBody;
    setID?: string;
};
export declare type ShaderDefinesData = [name: string, value: number];
export declare type ShaderUniformData = [name: string, type: ShaderDataTypes] | [name: string, type: ShaderDataTypes, arrayLength: number];
export declare type ShaderAttributeData = [name: string, type: ShaderDataTypes];
export declare type ShaderVaryingData = [name: string, type: ShaderDataTypes];
export {};
