import type { ChunkMaterial } from "Core/Render/Materials/Chunk/ChunkMaterial";

export class ChunkMesh {
    constructor(private chunkMaterial : ChunkMaterial) {

    }
    rebuildChunkMesh(
        chunkMesh: BABYLON.Mesh,
        chunkX: number,
        chunkZ: number,
        positions: Float32Array,
        indicies: Int32Array,
        colors: Float32Array,
        uvs: Float32Array
    ) {
        const chunkVertexData = new BABYLON.VertexData();
        const calculatedNormals: number[] = [];

        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.normals = calculatedNormals;

        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.applyToMesh(chunkMesh, true);

        chunkMesh.setVerticesData("myuvs", uvs, false, 3);
        chunkMesh.setVerticesData("colors", colors, false, 4);

        chunkMesh.unfreezeWorldMatrix();
        chunkMesh.position.x = chunkX;
        chunkMesh.position.z = chunkZ;
        chunkMesh.freezeWorldMatrix();
        //Babylon throws an error but this functions works
        //So wrapped it in this for now. It works though
        try {
            chunkMesh.updateFacetData();
        } catch (error: any) {}
    }

    makeChunkMesh(
        chunkMesh: BABYLON.Mesh,
        chunkX: number,
        chunkZ: number,
        positions: Float32Array,
        indicies: Int32Array,
        colors: Float32Array,
        uvs: Float32Array
    ) {
        const chunkVertexData = new BABYLON.VertexData();

        const calculatedNormals: number[] = [];
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.normals = calculatedNormals;

        chunkMesh.alphaIndex = 0;
        chunkVertexData.applyToMesh(chunkMesh, true);

        chunkMesh.setVerticesData("myuvs", uvs, false, 3);
        chunkMesh.setVerticesData("colors", colors, false, 4);

        chunkMesh.material = this.chunkMaterial.getMaterial();
        chunkMesh.checkCollisions = true;
        chunkMesh.position.x = chunkX;
        chunkMesh.position.z = chunkZ;
        chunkMesh.freezeWorldMatrix();

        return chunkMesh;
    }
}
