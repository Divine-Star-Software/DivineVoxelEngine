import type { ShaderDataTypes, ShaderVaryingData } from "Libs/Shaders/Types/ShaderData.types";
import type { DivineShader } from "Libs/Shaders/Classes/DivineShader.js";
export declare const DVEShaders: {
    builder: {
        shaders: {
            _shaders: Map<string, DivineShader>;
            create(id: string): DivineShader;
        };
        functions: {
            _functions: Map<string, import("Libs/Shaders/Types/ShaderData.types").ShaderFunctionData<any>>;
            _functionSets: Map<string, string[]>;
            create(id: string, data: import("Libs/Shaders/Types/ShaderData.types").ShaderFunctionData<any>): void;
            _processFunctinos(id: string, data: import("Libs/Shaders/Types/ShaderData.types").ShaderFunctionData<any>, shader?: DivineShader | null): string;
            build(id: string, data?: import("Libs/Shaders/Types/ShaderData.types").ShaderFunctionData<any> | null, shader?: DivineShader | null): string;
        };
        define: {
            _process(data: import("Libs/Shaders/Types/ShaderData.types").ShaderDefinesData): string;
            build(data: import("Libs/Shaders/Types/ShaderData.types").ShaderDefinesData | Map<string, import("Libs/Shaders/Types/ShaderData.types").ShaderDefinesData> | import("Libs/Shaders/Types/ShaderData.types").ShaderDefinesData[]): string;
        };
        uniforms: {
            _process(data: import("Libs/Shaders/Types/ShaderData.types").ShaderUniformData): string;
            build(data: import("Libs/Shaders/Types/ShaderData.types").ShaderUniformData | Map<string, import("Libs/Shaders/Types/ShaderData.types").ShaderUniformData> | import("Libs/Shaders/Types/ShaderData.types").ShaderUniformData[]): string;
        };
        snippets: {
            _snippets: Map<string, import("Libs/Shaders/Types/ShaderData.types").ShaderSnippetData<any>>;
            create(data: import("Libs/Shaders/Types/ShaderData.types").ShaderSnippetData<any>): void;
            override(id: string, data: import("Libs/Shaders/Types/ShaderData.types").ShaderSnippetData<any>): boolean;
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
    createSkyBoxShader(id: string): DivineShader;
};
