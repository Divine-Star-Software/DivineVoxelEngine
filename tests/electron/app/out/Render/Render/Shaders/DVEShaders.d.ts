import type { ShaderCodeBody, ShaderDataTypes } from "Libs/Shaders/Types/ShaderData.types";
import type { DVEShader } from "Libs/Shaders/Classes/DVEShader.js";
export declare const DVEShaders: {
    builder: {
        buildShader(id: string): void;
        shaders: {
            _shaders: Map<string, DVEShader>;
            create(id: string): DVEShader;
        };
        functions: {
            _functions: Map<string, import("Libs/Shaders/Types/ShaderData.types").ShaderFunctionData>;
            _functionSets: Map<string, string[]>;
            create(id: string, data: import("Libs/Shaders/Types/ShaderData.types").ShaderFunctionData): void;
            _processFunctinos(id: string, data: import("Libs/Shaders/Types/ShaderData.types").ShaderFunctionData): string;
            build(id: string, data?: import("Libs/Shaders/Types/ShaderData.types").ShaderFunctionData | undefined): string;
        };
        snippets: {
            _snippets: Map<string, ShaderCodeBody>;
            create(id: string, data: ShaderCodeBody): void;
            override(id: string, data: ShaderCodeBody): boolean;
            get(id: string): string;
            _process(text: string): {
                newBody: string;
                foundSnippet: boolean;
            };
            build(text: string): string;
        };
    };
    voxelAttributes: [id: string, type: ShaderDataTypes][];
    voxelSharedUniforms: [id: string, type: ShaderDataTypes][];
    voxelVertexUniforms: [id: string, type: ShaderDataTypes][];
    voxelVarying: [id: string, type: ShaderDataTypes, set: ShaderCodeBody][];
    voxelFragFunctions: string[];
    voxelVertexFunctions: string[];
    _defaultShader: DVEShader;
    $INIT(): void;
    createVoxelShader(id: string): DVEShader;
    createSkyBoxShader(id: string): DVEShader;
};
