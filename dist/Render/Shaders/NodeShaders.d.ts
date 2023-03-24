import type { ShaderDataTypes, ShaderVaryingData } from "divine-shaders";
import type { DivineShader } from "divine-shaders";
export declare const NodeShaders: {
    builder: {
        shaders: {
            _shaders: Map<string, DivineShader>;
            create(id: string): DivineShader;
        };
        functions: {
            _functions: Map<string, import("divine-shaders").ShaderFunctionData<any>>;
            _functionSets: Map<string, string[]>;
            create(id: string, data: import("divine-shaders").ShaderFunctionData<any>): void;
            _processFunctinos(id: string, data: import("divine-shaders").ShaderFunctionData<any>, shader?: DivineShader | null | undefined): string;
            build(id: string, data?: import("divine-shaders").ShaderFunctionData<any> | null | undefined, shader?: DivineShader | null | undefined): string;
        };
        define: {
            _process(data: import("divine-shaders").ShaderDefinesData): string;
            build(data: import("divine-shaders").ShaderDefinesData | import("divine-shaders").ShaderDefinesData[] | Map<string, import("divine-shaders").ShaderDefinesData>): string;
        };
        uniforms: {
            _process(data: import("divine-shaders").ShaderUniformData): string;
            build(data: import("divine-shaders").ShaderUniformData | import("divine-shaders").ShaderUniformData[] | Map<string, import("divine-shaders").ShaderUniformData>): string;
        };
        snippets: {
            _snippets: Map<string, import("divine-shaders").ShaderSnippetData<any>>;
            create(data: import("divine-shaders").ShaderSnippetData<any>): void;
            override(id: string, data: import("divine-shaders").ShaderSnippetData<any>): boolean;
            get(id: string, args?: any): string;
            _process(text: string, shader?: DivineShader | undefined): {
                newBody: string;
                foundSnippet: boolean;
            };
            build(text: string, shader?: DivineShader | undefined): string;
        };
    };
    voxelAttributes: [id: string, type: ShaderDataTypes][];
    voxelSharedUniforms: [id: string, type: ShaderDataTypes][];
    voxelVertexUniforms: [id: string, type: ShaderDataTypes][];
    voxelVarying: ShaderVaryingData<any>[];
    voxelFragFunctions: string[];
    voxelVertexFunctions: string[];
    _defaultShader: DivineShader;
    $INIT(): void;
    createVoxelShader(id: string): DivineShader;
    createBasicTextureShader(id: string): DivineShader;
    createSkyBoxShader(id: string): DivineShader;
};
