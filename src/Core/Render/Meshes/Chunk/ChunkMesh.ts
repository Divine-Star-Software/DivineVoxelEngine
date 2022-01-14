import type { ChunkMaterial } from "Core/Render/Materials/Chunk/ChunkMaterial";
import { VoxelMeshInterface } from "Meta/Core/Meshes/VoxelMesh.interface";

export class ChunkMesh  implements VoxelMeshInterface {
    constructor(private material : ChunkMaterial) {

    }
    rebuildMeshGeometory(
        chunkMesh: BABYLON.Mesh,
        chunkX: number,
        chunkZ: number,
        positions: Float32Array,
        indicies: Int32Array,
        linearcColors: Float32Array,
        fullColors: Float32Array,
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
        chunkMesh.setVerticesData("colors", linearcColors, false, 4);

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



    createTemplateMesh(scene : BABYLON.Scene){
        const mesh = new BABYLON.Mesh("solid", scene);
        mesh.alphaIndex = 0;
        return mesh;
    }

    createMeshGeometory(
        chunkMesh: BABYLON.Mesh,
        chunkX: number,
        chunkZ: number,
        positions: Float32Array,
        indicies: Int32Array,
        linearColors: Float32Array,
        fullColors: Float32Array,
        uvs: Float32Array
    ) {
      
        const chunkVertexData = new BABYLON.VertexData();

        const calculatedNormals: number[] = [];
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.normals = calculatedNormals;

        chunkVertexData.applyToMesh(chunkMesh, true);

        chunkMesh.setVerticesData("myuvs", uvs, false, 3);
        chunkMesh.setVerticesData("colors", linearColors, false, 4);

        chunkMesh.material = this.material.getMaterial();
        chunkMesh.checkCollisions = true;
        chunkMesh.position.x = chunkX;
        chunkMesh.position.z = chunkZ;
        chunkMesh.freezeWorldMatrix();

        return chunkMesh;
    }
}
