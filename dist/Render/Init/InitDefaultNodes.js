import { NodeShaders } from "../Shaders/NodeShaders.js";
import { TextureManager } from "../../Render/Textures/TextureManager.js";
import { NodeManager } from "../Nodes/NodeManager.js";
export function InitDefaultNodes() {
    TextureManager.addTextureType("#dve_node_texture");
    NodeManager.shaders.create([
        NodeShaders.createBasicTextureShader("#dve_node_texture"),
    ]);
    NodeManager.meshes.create([
        {
            boundingBoxMaxSize: [1, 1, 1],
            id: "#dve_node_texture",
            materialId: "#dve_node_texture",
        },
    ]);
    NodeManager.materials.create([
        {
            id: "#dve_node_texture",
            textureTypeId: "#dve_node_texture",
            alphaBlending: false,
            alphaTesting: true,
        },
    ]);
}
