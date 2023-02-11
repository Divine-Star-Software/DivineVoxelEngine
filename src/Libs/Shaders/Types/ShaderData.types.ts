import type { DivineMesh } from "../Classes/DivineMesh";

export type ShaerTextureTypes = "sampler2DArray";
export type ShaderTextureData = {
 isArray?: boolean;
 arrayLength?: number;
 type: ShaerTextureTypes;
};
export type ShaderDataTypes =
 | "vec4"
 | "vec3"
 | "vec2"
 | "float"
 | "mat4"
 | "int";
export type ShaderData = {
 mesh: DivineMesh;
 //snippets
 snippetArgumentOverrides: Map<string, any>;
 //defines
 sharedDefines: Map<string, ShaderDefinesData>;
 vertexDefines: Map<string, ShaderDefinesData>;
 fragDefines: Map<string, ShaderDefinesData>;
 //uniforms
 sharedUniforms: Map<string, ShaderUniformData>;
 vertexUniforms: Map<string, ShaderUniformData>;
 fragxUniforms: Map<string, ShaderUniformData>;
 //varying
 varying: Map<string, ShaderVaryingData<any>>;
 varyingArgumentOverrides: Map<string, any>;
 //functions
 localVertexFunctions: Map<string, ShaderFunctionData<any>>;
 localFragFunctions: Map<string, ShaderFunctionData<any>>;
 sharedFunctions: string[];
 fragFunctions: string[];
 vertexFunctions: string[];
 functionArgumentOverrides: Map<string, any>;
 //textures
 textures: Map<string, ShaderTextureData>;
 //code
 fragMain: ShaderCodeBody;
 vertexMain: ShaderCodeBody;
};
export type ShaderCodeBody = {
 GLSL: string;
 WGSL?: string;
};
export type GeneratedShaderCodeBody<T> = {
 GLSL: (data: T) => string;
 WGSL?: (data: T) => string;
};
export type ShaderFunctionData<T> = ShaderFuncitonBase<T> & {
 overrides?: ShaderFuncitonBase<T>[];
};

export type ShaderVaryingData<T> = {
 id: string;
 type: ShaderDataTypes;
 arguments?: T;
 body: GeneratedShaderCodeBody<T>;
};
type ShaderFuncitonBase<T> = {
 inputs: [
  id: string,
  type:
   | ShaderDataTypes
   | [type: ShaderDataTypes, arreyLength: number]
   | ShaerTextureTypes
   | [type: ShaerTextureTypes, arreyLength: number]
 ][];
 output: ShaderDataTypes;
 setID?: string;
 arguments: T;
 body: GeneratedShaderCodeBody<T>;
};
export type ShaderSnippetData<T> = {
 id: string;
 arguments?: T;
 body: GeneratedShaderCodeBody<T>;
};

export type ShaderDefinesData = [name: string, value: number];
export type ShaderUniformData =
 | [name: string, type: ShaderDataTypes]
 | [name: string, type: ShaderDataTypes, arrayLength: number];
export type ShaderAttributeData = [name: string, type: ShaderDataTypes];
