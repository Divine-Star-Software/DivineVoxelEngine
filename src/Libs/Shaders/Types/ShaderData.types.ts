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
export type ShaderCodeBody = {
 GLSL: string;
 WGSL?: string;
};
export type ShaderFunctionData = ShaderFuncitonBase & {
 overrides?: ShaderFuncitonBase[];
};
type ShaderFuncitonBase = {
 inputs: [
  id: string,
  type:
   | ShaderDataTypes
   | [type: ShaderDataTypes, arreyLength: number]
   | ShaerTextureTypes
   | [type: ShaerTextureTypes, arreyLength: number]
 ][];
 output: ShaderDataTypes;
 body: ShaderCodeBody;
};
