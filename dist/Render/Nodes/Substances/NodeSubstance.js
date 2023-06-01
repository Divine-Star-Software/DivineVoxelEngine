import { NodeManager } from "../NodeManager.js";
export class NodeSubstance {
    data;
    constructor(data) {
        this.data = data;
    }
    build() {
        NodeManager.materials.create([
            {
                id: this.data.id,
                ...this.data.material,
                shaderId: this.data.shader.id,
                textureTypeId: this.data.texture.id,
            },
        ]);
        NodeManager.shaders.create([this.data.shader]);
        NodeManager.meshes.add([
            {
                id: this.data.id,
                ...this.data.mesh,
            },
        ]);
    }
}
