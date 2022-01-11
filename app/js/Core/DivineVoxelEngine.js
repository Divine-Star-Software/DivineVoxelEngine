import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./Builders/BuilderManager.js";
import { ChunkMaterial } from "./Builders/ChunkMaterial.js";
import { ChunkManager } from "./Chunks/ChunkManager.js";
import { Player } from "./Player/Player.js";
import { World } from "./World/World.js";
export class DivineVoxelEngine {
    world = new World(this);
    player = new Player(this);
    chunkManager = new ChunkManager(this);
    builderManager = new BuilderManager(this);
    chunkMaterial = new ChunkMaterial();
    util = new Util();
    constructor() {
    }
    async $INIT(data) {
        this.world.createWorldWorker(data.worldWorkerPath);
        this.builderManager.createBuilderWorker(data.builderWorkerPath);
        const baseWorldData = await this.world.getBaseWorldData();
        console.log(baseWorldData);
        console.log("sup");
        window.addEventListener("beforeunload", () => {
            for (const builder of this.builderManager.builders) {
                builder.terminate();
            }
            this.world.worker.terminate();
        });
    }
    async $SCENEINIT(data) {
        if (!this.world.baseWorldData) {
            throw new Error("World base data was not set. Call $INIT before $SCENEINIT");
        }
        console.log(this.world.baseWorldData);
        this.chunkMaterial.setScene(data.scene);
        const textures = this.world.baseWorldData?.texturePaths;
        const combinedTexture = await this.chunkMaterial.createMaterialTexture(textures);
        const material = this.chunkMaterial.getMaterial(combinedTexture);
        this.builderManager.setScene(data.scene);
        this.builderManager.setMaterial(material);
        this.builderManager.createBaseChunkMeshes();
        this.world.startWorldGen();
        const max = 10;
        let count = max;
        let test = true;
        setInterval(() => {
            if (!count) {
                count = max;
                if (test) {
                    this.chunkMaterial.runAnimations(3);
                    test = false;
                }
                else {
                    test = true;
                    this.chunkMaterial.runAnimations(4);
                }
            }
            else {
                count--;
            }
        }, 50);
    }
    createDefaultPlayer(scene, camera) {
        this.player.createPlayerSharedArrays();
        this.player.createPlayer(scene, camera);
        setInterval(() => {
            this.player.update();
        }, 100);
    }
}
