import type { ShaderCodeBody, ShaderDataTypes } from "Libs/Shaders/Types/ShaderData.types";
import type { DVEShader } from "Libs/Shaders/Classes/DVEShader.js";
export declare const DVEShaders: {
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
