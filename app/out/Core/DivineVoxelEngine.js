import { Util } from "../Global/Util.helper.js";
import { BuilderWorkerManager } from "./Builders/BuilderWorkerManager.js";
import { World } from "./World/World.js";
import { RenderManager } from "./Render/RenderManager.js";
import { BuildInitalMeshes } from "./Functions/BuildInitalMeshes.js";
import { MeshManager } from "./Meshes/MeshManager.js";
export class DivineVoxelEngine {
    world = new World(this);
    renderManager = new RenderManager();
    builderManager = new BuilderWorkerManager(this);
    meshManager = new MeshManager(this);
    util = new Util();
    constructor() { }
    async $INIT(data) {
        this.world.createWorldWorker(data.worldWorkerPath);
        this.builderManager.createBuilderWorker(data.builderWorkerPath);
        this.builderManager.createFluidBuilderWorker(data.fluidBuilderWorkerPath);
        await this.world.getBaseWorldData();
        window.addEventListener("beforeunload", () => {
            for (const builder of this.builderManager.builders) {
                builder.terminate();
            }
            this.world.worker.terminate();
        });
    }
    async $SCENEINIT(data) {
        // data.scene.enableDepthRenderer();
        await BuildInitalMeshes(this, data.scene);
        this.world.startWorldGen();
    }
}
