import { DVER } from "../DivineVoxelEngineRender.js";
import { TextureManager } from "../Nodes/Textures/TextureManager.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
import { NodeManager } from "../Nodes/NodeManager.js";
export class NodeMeshTool extends LocationBoundTool {
    buildTexture(textureIdData, textureData, onDone) {
        const textureId = TextureManager.getTextureIndex(textureIdData);
        if (!textureId)
            return onDone(false);
        DVER.constructorCommManager.runPromiseTasks("build-node-mesh", [
            this.location,
            "#dve_node_texture",
            {
                textureId: textureId,
                textureData: textureData,
            },
        ], [textureData.buffer], (data) => {
            if (!data)
                return onDone(false);
            onDone(NodeManager.meshes.create("#dve_node_texture", data));
            return;
        });
    }
    asyncBuildTexture(textureIdData, textureData) {
        return new Promise((resolve) => {
            this.buildTexture(textureIdData, textureData, (data) => {
                resolve(data);
            });
        });
    }
}
