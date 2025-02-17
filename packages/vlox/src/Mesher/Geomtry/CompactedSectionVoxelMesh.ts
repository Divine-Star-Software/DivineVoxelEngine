import { Vec3Array } from "@amodx/math";
import { LocationData } from "../../Math";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { VoxelMeshVertexStructCursor } from "./VoxelMeshVertexStructCursor";

export class CompactedMeshData {
  material: number;
  materialId: string = "dve_solid";
  minBounds: Vec3Array = [0, 0, 0];
  maxBounds: Vec3Array = [0, 0, 0];
  vertexCount = 0;
  indexCount = 0;
  vertexIndex: [start: number, length: number] = [0, 0];
  indiceIndex: [start: number, length: number] = [0, 0];

  verticies: Float32Array;
  indices: Uint32Array;
}

export class CompactedSectionVoxelMesh {
  static GetHeaderByteSize(totalMeshes = 0) {
    return (
      //dimension index 2 bytes uint16
      2 +
      //position x 4 bytes int32
      4 +
      //position y 4 bytes int32
      4 +
      //position z 4 bytes int32
      4 +
      //total meshes
      1 +
      //other mehes
      totalMeshes * this.GetMeshHeaderByteSize()
    );
  }
  static GetMeshHeaderByteSize() {
    return (
      //material index 1 byte
      1 +
      //min x 4 bytes Float32
      4 +
      //min y 4 bytes Float32
      4 +
      //min z 4 bytes Float32
      4 +
      //max x 4 bytes Float32
      4 +
      //max y 4 bytes Float32
      4 +
      //max z 4 bytes Float32
      4 +
      //Vertex Start Byte uint32
      4 +
      //Vertex Length
      4 +
      //Indice Start Byte uint32
      4 +
      //Indice Length
      4
    );
  }

  data: DataView;
  setData(data: ArrayBuffer) {
    this.data = new DataView(data);
  }

  setTotalMeshes(amount: number) {
    this.data.setUint8(14, amount);
  }

  getTotalMeshes() {
    return this.data.getUint8(14);
  }

  setLocation(dimesion: number, x: number, y: number, z: number) {
    this.data.setInt16(0, dimesion);
    this.data.setInt32(2, x);
    this.data.setInt32(6, y);
    this.data.setInt32(10, z);
  }

  getLocation(location: LocationData = [0, 0, 0, 0]) {
    location[0] = this.data.getInt16(0);
    location[1] = this.data.getInt32(2);
    location[2] = this.data.getInt32(6);
    location[3] = this.data.getInt32(10);
    return location;
  }

  setMeshData(index: number, mesh: CompactedMeshData) {
    const {
      materialId: material,
      minBounds,
      maxBounds,
      vertexIndex,
      indiceIndex,
    } = mesh;
    let startByte =
      CompactedSectionVoxelMesh.GetHeaderByteSize(0) +
      CompactedSectionVoxelMesh.GetMeshHeaderByteSize() * index;
    //material index
    this.data.setUint8(
      startByte,
      VoxelPalettesRegister.material.getNumberId(material)
    );
    startByte++;
    //min bounds
    this.data.setFloat32(startByte, minBounds[0]);
    startByte += 4;
    this.data.setFloat32(startByte, minBounds[1]);
    startByte += 4;
    this.data.setFloat32(startByte, minBounds[2]);
    startByte += 4;
    //max bounds
    this.data.setFloat32(startByte, maxBounds[0]);
    startByte += 4;
    this.data.setFloat32(startByte, maxBounds[1]);
    startByte += 4;
    this.data.setFloat32(startByte, maxBounds[2]);
    startByte += 4;
    //vertex index
    this.data.setUint32(startByte, vertexIndex[0]);
    startByte += 4;
    this.data.setUint32(startByte, vertexIndex[1]);
    startByte += 4;
    //indice index
    this.data.setUint32(startByte, indiceIndex[0]);
    startByte += 4;
    this.data.setUint32(startByte, indiceIndex[1]);
    startByte += 4;
  }

  getMeshData(index: number, mesh: CompactedMeshData) {
    let startByte =
      CompactedSectionVoxelMesh.GetHeaderByteSize(0) +
      CompactedSectionVoxelMesh.GetMeshHeaderByteSize() * index;

    // material index
    mesh.material = this.data.getUint8(startByte);
    mesh.materialId = VoxelPalettesRegister.material.getStringId(mesh.material);
    startByte++;

    // min bounds
    mesh.minBounds[0] = this.data.getFloat32(startByte);
    startByte += 4;
    mesh.minBounds[1] = this.data.getFloat32(startByte);
    startByte += 4;
    mesh.minBounds[2] = this.data.getFloat32(startByte);
    startByte += 4;

    // max bounds
    mesh.maxBounds[0] = this.data.getFloat32(startByte);
    startByte += 4;
    mesh.maxBounds[1] = this.data.getFloat32(startByte);
    startByte += 4;
    mesh.maxBounds[2] = this.data.getFloat32(startByte);
    startByte += 4;

    // vertex index
    mesh.vertexIndex[0] = this.data.getUint32(startByte);
    startByte += 4;
    mesh.vertexIndex[1] = this.data.getUint32(startByte);
    startByte += 4;

    // indice index
    mesh.indiceIndex[0] = this.data.getUint32(startByte);
    startByte += 4;
    mesh.indiceIndex[1] = this.data.getUint32(startByte);
    startByte += 4;

    mesh.verticies = new Float32Array(this.data.buffer, ...mesh.vertexIndex);
    mesh.indices = new Uint32Array(this.data.buffer, ...mesh.indiceIndex);

    mesh.vertexCount =
      mesh.vertexIndex[1] / VoxelMeshVertexStructCursor.VertexFloatSize;
    mesh.indexCount = mesh.indiceIndex[1];
    return mesh;
  }
}
