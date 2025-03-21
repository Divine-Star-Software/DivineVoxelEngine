import { Vector3Like, Vector2Like, Vector4Like } from "@amodx/math";
import { VoxelShaderData } from "./VoxelShaderData";
import { VoxelModelBuilder } from "../Models/VoxelModelBuilder";

import { Quad } from "./Primitives/Quad";
import { QuadVerticies } from "./Geometry.types";
import { VoxelMeshVertexConstants } from "./VoxelMeshVertexStructCursor";
import { Triangle } from "./Primitives";

const vector1ShaderData = Vector4Like.Create();
const vector2ShaderData = Vector4Like.Create();
const vector3ShaderData = Vector4Like.Create();
const vector4ShaderData = Vector4Like.Create();
export function addVoxelTriangle(builder: VoxelModelBuilder, tri: Triangle) {
  if (!builder.mesh) return;

  const origin = builder.origin;
  const worldLight = builder.vars.light;
  const worldAO = builder.vars.ao;
  const animData = builder.vars.animation;
  const texture = builder.vars.textureIndex;
  const overlayTextures = builder.vars.overlayTextures;
  const topRightPos = tri.positions.vertices[0];
  const topLeftPos = tri.positions.vertices[1];
  const bottomLeftPos = tri.positions.vertices[2];

  const topRightNor = tri.normals.vertices[0];
  const topLeftNor = tri.normals.vertices[1];
  const bottomLeftNor = tri.normals.vertices[2];

  const topRightVoxelData = VoxelShaderData.create(
    worldLight.vertices[QuadVerticies.TopRight],
    worldLight.vertices[QuadVerticies.TopLeft],
    worldLight.vertices[QuadVerticies.BottomLeft],
    worldLight.vertices[QuadVerticies.BottomRight],
    worldAO.vertices[QuadVerticies.TopRight],
    worldAO.vertices[QuadVerticies.TopLeft],
    worldAO.vertices[QuadVerticies.BottomLeft],
    worldAO.vertices[QuadVerticies.BottomRight],
    animData.vertices[QuadVerticies.TopRight],
    QuadVerticies.TopRight,
    vector1ShaderData
  );
  const topLeftVoxelData = VoxelShaderData.create(
    worldLight.vertices[QuadVerticies.TopRight],
    worldLight.vertices[QuadVerticies.TopLeft],
    worldLight.vertices[QuadVerticies.BottomLeft],
    worldLight.vertices[QuadVerticies.BottomRight],
    worldAO.vertices[QuadVerticies.TopRight],
    worldAO.vertices[QuadVerticies.TopLeft],
    worldAO.vertices[QuadVerticies.BottomLeft],
    worldAO.vertices[QuadVerticies.BottomRight],
    animData.vertices[QuadVerticies.TopLeft],
    QuadVerticies.TopLeft,
    vector2ShaderData
  );
  const bottomLeftVoxelData = VoxelShaderData.create(
    worldLight.vertices[QuadVerticies.TopRight],
    worldLight.vertices[QuadVerticies.TopLeft],
    worldLight.vertices[QuadVerticies.BottomLeft],
    worldLight.vertices[QuadVerticies.BottomRight],
    worldAO.vertices[QuadVerticies.TopRight],
    worldAO.vertices[QuadVerticies.TopLeft],
    worldAO.vertices[QuadVerticies.BottomLeft],
    worldAO.vertices[QuadVerticies.BottomRight],
    animData.vertices[QuadVerticies.BottomLeft],
    QuadVerticies.BottomLeft,
    vector3ShaderData
  );

  const indices = builder.mesh!.indices;
  let indIndex = builder.mesh.indicieCount;
  let sides = tri.doubleSided ? 2 : 1;

  const baseIndex = builder.mesh.vertexCount;

  while (sides--) {
    const baseIndex = builder.mesh.vertexCount;
    builder.mesh.buffer.setIndex(baseIndex);
    addVertex(
      builder.mesh.buffer.curentIndex,
      builder.mesh.buffer.currentArray,
      origin,
      topRightPos,
      topRightNor,
      tri.uvs.vertices[QuadVerticies.TopRight],
      topRightVoxelData,
      texture,
      overlayTextures
    );

    builder.mesh.buffer.setIndex(baseIndex + 1);
    addVertex(
      builder.mesh.buffer.curentIndex,
      builder.mesh.buffer.currentArray,
      origin,
      topLeftPos,
      topLeftNor,
      tri.uvs.vertices[QuadVerticies.TopLeft],
      topLeftVoxelData,
      texture,
      overlayTextures
    );
    builder.mesh.buffer.setIndex(baseIndex + 2);
    addVertex(
      builder.mesh.buffer.curentIndex,
      builder.mesh.buffer.currentArray,
      origin,
      bottomLeftPos,
      bottomLeftNor,
      tri.uvs.vertices[QuadVerticies.BottomLeft],
      bottomLeftVoxelData,
      texture,
      overlayTextures
    );

    builder.mesh.addVerticies(3, 3);
  }
  if (!tri.doubleSided) {
    let index = baseIndex;
    indices.setIndex(indIndex).currentArray[indices.curentIndex] = index;
    indices.setIndex(indIndex + 1).currentArray[indices.curentIndex] =
      index + 1;
    indices.setIndex(indIndex + 2).currentArray[indices.curentIndex] =
      index + 2;
  } else {
    let index = baseIndex;
    indices.setIndex(indIndex).currentArray[indices.curentIndex] = index;
    indices.setIndex(indIndex + 1).currentArray[indices.curentIndex] =
      index + 1;
    indices.setIndex(indIndex + 2).currentArray[indices.curentIndex] =
      index + 2;
    index += 3;
    indIndex += 3;
    indices.setIndex(indIndex).currentArray[indices.curentIndex] = index + 3;
    indices.setIndex(indIndex + 1).currentArray[indices.curentIndex] =
      index + 2;
    indices.setIndex(indIndex + 2).currentArray[indices.curentIndex] =
      index + 1;
  }

  builder.vars.reset();
}

export function addVoxelQuad(builder: VoxelModelBuilder, quad: Quad) {
  if (!builder.mesh) return;

  const origin = builder.origin;
  const worldLight = builder.vars.light;
  const worldAO = builder.vars.ao;
  const animData = builder.vars.animation;
  const texture = builder.vars.textureIndex;
  const overlayTextures = builder.vars.overlayTextures;
  const topRightPos = quad.positions.vertices[0];
  const topLeftPos = quad.positions.vertices[1];
  const bottomLeftPos = quad.positions.vertices[2];
  const bottomRightPos = quad.positions.vertices[3];
  const topRightNor = quad.normals.vertices[0];
  const topLeftNor = quad.normals.vertices[1];
  const bottomLeftNor = quad.normals.vertices[2];
  const bottomRightNor = quad.normals.vertices[3];
  const topRightVoxelData = VoxelShaderData.create(
    worldLight.vertices[QuadVerticies.TopRight],
    worldLight.vertices[QuadVerticies.TopLeft],
    worldLight.vertices[QuadVerticies.BottomLeft],
    worldLight.vertices[QuadVerticies.BottomRight],
    worldAO.vertices[QuadVerticies.TopRight],
    worldAO.vertices[QuadVerticies.TopLeft],
    worldAO.vertices[QuadVerticies.BottomLeft],
    worldAO.vertices[QuadVerticies.BottomRight],
    animData.vertices[QuadVerticies.TopRight],
    QuadVerticies.TopRight,
    vector1ShaderData
  );
  const topLeftVoxelData = VoxelShaderData.create(
    worldLight.vertices[QuadVerticies.TopRight],
    worldLight.vertices[QuadVerticies.TopLeft],
    worldLight.vertices[QuadVerticies.BottomLeft],
    worldLight.vertices[QuadVerticies.BottomRight],
    worldAO.vertices[QuadVerticies.TopRight],
    worldAO.vertices[QuadVerticies.TopLeft],
    worldAO.vertices[QuadVerticies.BottomLeft],
    worldAO.vertices[QuadVerticies.BottomRight],
    animData.vertices[QuadVerticies.TopLeft],
    QuadVerticies.TopLeft,
    vector2ShaderData
  );
  const bottomLeftVoxelData = VoxelShaderData.create(
    worldLight.vertices[QuadVerticies.TopRight],
    worldLight.vertices[QuadVerticies.TopLeft],
    worldLight.vertices[QuadVerticies.BottomLeft],
    worldLight.vertices[QuadVerticies.BottomRight],
    worldAO.vertices[QuadVerticies.TopRight],
    worldAO.vertices[QuadVerticies.TopLeft],
    worldAO.vertices[QuadVerticies.BottomLeft],
    worldAO.vertices[QuadVerticies.BottomRight],
    animData.vertices[QuadVerticies.BottomLeft],
    QuadVerticies.BottomLeft,
    vector3ShaderData
  );
  const bottomRightVoxelData = VoxelShaderData.create(
    worldLight.vertices[QuadVerticies.TopRight],
    worldLight.vertices[QuadVerticies.TopLeft],
    worldLight.vertices[QuadVerticies.BottomLeft],
    worldLight.vertices[QuadVerticies.BottomRight],
    worldAO.vertices[QuadVerticies.TopRight],
    worldAO.vertices[QuadVerticies.TopLeft],
    worldAO.vertices[QuadVerticies.BottomLeft],
    worldAO.vertices[QuadVerticies.BottomRight],
    animData.vertices[QuadVerticies.BottomRight],
    QuadVerticies.BottomRight,
    vector4ShaderData
  );
  const indices = builder.mesh!.indices;
  let indIndex = builder.mesh.indicieCount;

  const baseIndex = builder.mesh.vertexCount;
  builder.mesh.buffer.setIndex(baseIndex);
  addVertex(
    builder.mesh.buffer.curentIndex,
    builder.mesh.buffer.currentArray,
    origin,
    topRightPos,
    topRightNor,
    quad.uvs.vertices[QuadVerticies.TopRight],
    topRightVoxelData,
    texture,
    overlayTextures
  );

  builder.mesh.buffer.setIndex(baseIndex + 1);
  addVertex(
    builder.mesh.buffer.curentIndex,
    builder.mesh.buffer.currentArray,
    origin,
    topLeftPos,
    topLeftNor,
    quad.uvs.vertices[QuadVerticies.TopLeft],
    topLeftVoxelData,
    texture,
    overlayTextures
  );
  builder.mesh.buffer.setIndex(baseIndex + 2);
  addVertex(
    builder.mesh.buffer.curentIndex,
    builder.mesh.buffer.currentArray,
    origin,
    bottomLeftPos,
    bottomLeftNor,
    quad.uvs.vertices[QuadVerticies.BottomLeft],
    bottomLeftVoxelData,
    texture,
    overlayTextures
  );
  builder.mesh.buffer.setIndex(baseIndex + 3);
  addVertex(
    builder.mesh.buffer.curentIndex,
    builder.mesh.buffer.currentArray,
    origin,
    bottomRightPos,
    bottomRightNor,
    quad.uvs.vertices[QuadVerticies.BottomRight],
    bottomRightVoxelData,
    texture,
    overlayTextures
  );

  if (!quad.doubleSided) {
    let index = baseIndex;
    indices.setIndex(indIndex).currentArray[indices.curentIndex] = index;
    indices.setIndex(indIndex + 1).currentArray[indices.curentIndex] =
      index + 1;
    indices.setIndex(indIndex + 2).currentArray[indices.curentIndex] =
      index + 2;
    indices.setIndex(indIndex + 3).currentArray[indices.curentIndex] =
      index + 2;
    indices.setIndex(indIndex + 4).currentArray[indices.curentIndex] =
      index + 3;
    indices.setIndex(indIndex + 5).currentArray[indices.curentIndex] = index;
    builder.mesh.addVerticies(4, 6);
  } else {
    let index = baseIndex;
    indices.setIndex(indIndex).currentArray[indices.curentIndex] = index;
    indices.setIndex(indIndex + 1).currentArray[indices.curentIndex] =
      index + 1;
    indices.setIndex(indIndex + 2).currentArray[indices.curentIndex] =
      index + 2;
    indices.setIndex(indIndex + 3).currentArray[indices.curentIndex] =
      index + 2;
    indices.setIndex(indIndex + 4).currentArray[indices.curentIndex] =
      index + 3;
    indices.setIndex(indIndex + 5).currentArray[indices.curentIndex] = index;
    indIndex += 6;
    indices.setIndex(indIndex).currentArray[indices.curentIndex] = index;
    indices.setIndex(indIndex + 1).currentArray[indices.curentIndex] =
      index + 3;
    indices.setIndex(indIndex + 2).currentArray[indices.curentIndex] =
      index + 2;
    indices.setIndex(indIndex + 3).currentArray[indices.curentIndex] =
      index + 2;
    indices.setIndex(indIndex + 4).currentArray[indices.curentIndex] =
      index + 1;
    indices.setIndex(indIndex + 5).currentArray[indices.curentIndex] = index;
    builder.mesh.addVerticies(4, 12);
  }

  builder.vars.reset();
}

function addVertex(
  index: number,
  array: Float32Array,
  origin: Vector3Like,
  position: Vector3Like,
  normal: Vector3Like,
  uvs: Vector2Like,
  voxelData: Vector4Like,
  texture: number,
  overlayTextures: Vector4Like
) {
  index *= VoxelMeshVertexConstants.VertexFloatSize;
  array[VoxelMeshVertexConstants.PositionOffset + index] =
    position.x + origin.x;
  array[VoxelMeshVertexConstants.PositionOffset + index + 1] =
    position.y + origin.y;
  array[VoxelMeshVertexConstants.PositionOffset + index + 2] =
    position.z + origin.z;

  array[VoxelMeshVertexConstants.UVOffset + index] = uvs.x;
  array[VoxelMeshVertexConstants.UVOffset + index + 1] = uvs.y;

  array[VoxelMeshVertexConstants.NormalOffset + index] = normal.x;
  array[VoxelMeshVertexConstants.NormalOffset + index + 1] = normal.y;
  array[VoxelMeshVertexConstants.NormalOffset + index + 2] = normal.z;

  array[VoxelMeshVertexConstants.TextureIndexOffset + index] =
    VoxelShaderData.createTextureIndex(texture, overlayTextures.x);
  array[VoxelMeshVertexConstants.TextureIndexOffset + index + 1] =
    VoxelShaderData.createTextureIndex(overlayTextures.y, overlayTextures.z);
  array[VoxelMeshVertexConstants.TextureIndexOffset + index + 2] =
    VoxelShaderData.createTextureIndex(overlayTextures.w, 0);

  array[VoxelMeshVertexConstants.VoxelDataOFfset + index] = voxelData.x;
  array[VoxelMeshVertexConstants.VoxelDataOFfset + index + 1] = voxelData.y;
  array[VoxelMeshVertexConstants.VoxelDataOFfset + index + 2] = voxelData.z;
  array[VoxelMeshVertexConstants.VoxelDataOFfset + index + 3] = voxelData.w;
}
