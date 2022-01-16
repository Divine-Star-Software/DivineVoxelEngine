import type { SolidMaterial } from "Core/Render/Materials/Solid/SolidMaterial";
import { VoxelMeshInterface } from "Meta/Core/Meshes/VoxelMesh.interface";

export class SolidMesh  implements VoxelMeshInterface {
    constructor(private material : SolidMaterial) {

    }
    rebuildMeshGeometory(
        mesh: BABYLON.Mesh,
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
        chunkVertexData.applyToMesh(mesh, true);

        mesh.setVerticesData("myuvs", uvs, false, 3);
        mesh.setVerticesData("colors", linearcColors, false, 4);

        mesh.unfreezeWorldMatrix();
        //Babylon throws an error but this functions works
        //So wrapped it in this for now. It works though
        try {
            mesh.updateFacetData();
        } catch (error: any) {}
        mesh.freezeWorldMatrix();
    }



    createTemplateMesh(scene : BABYLON.Scene){
        const mesh = new BABYLON.Mesh("solid", scene);
        mesh.alphaIndex = 0;
        mesh.checkCollisions = true;
        return mesh;
    }

    createMeshGeometory(
        mesh: BABYLON.Mesh,
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

        chunkVertexData.applyToMesh(mesh, true);

        mesh.setVerticesData("myuvs", uvs, false, 3);
        mesh.setVerticesData("colors", linearColors, false, 4);

        mesh.material = this.material.getMaterial();
        mesh.freezeWorldMatrix();

        return mesh;
    }
}
