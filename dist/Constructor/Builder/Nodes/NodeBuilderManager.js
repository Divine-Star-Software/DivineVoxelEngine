import { TextureBuilder } from "./Builders/TextureBuilder.js";
import { VoxelBuilder } from "./Builders/VoxelBuilder.js";
export const NodeBuilderManager = {
    builders: new Map(),
    registerBuilder(builder) {
        this.builders.set(builder.id, builder);
    },
    buildNode(data) {
        const builder = this.builders.get(data[1]);
        console.log("build node", data);
        if (!builder)
            return false;
        return builder.build(data);
    },
};
NodeBuilderManager.registerBuilder(TextureBuilder);
NodeBuilderManager.registerBuilder(VoxelBuilder);
