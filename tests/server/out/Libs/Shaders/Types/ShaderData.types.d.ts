export declare type ShaerTextureTypes = "sampler2DArray";
export declare type ShaderTextureData = {
    isArray?: boolean;
    arrayLength?: number;
    type: ShaerTextureTypes;
};
export declare type ShaderDataTypes = "vec4" | "vec3" | "vec2" | "float" | "mat4" | "int";
export declare type ShaderData = {
    fragDefines: Map<string, number>;
    vertexDefines: Map<string, number>;
    attributes: Map<string, ShaderDataTypes>;
    sharedUniforms: Map<string, ShaderDataTypes>;
    vertexUniforms: Map<string, ShaderDataTypes>;
    fragxUniforms: Map<string, ShaderDataTypes>;
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
};
export {};
