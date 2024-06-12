import type { Vector3Like, Vec3Array } from "../../Math";

import { GeometryNormals } from "./GeometryNormals.js";
import { MesherDataTool } from "../Tools/MesherDataTools.js";
import { QuadVertexVec3Data } from "../Geometry.types";
import { Quad } from "../Classes/Quad";

export class GeometryBuilder {
  static addTriangle(
    tool: MesherDataTool,
    origin: Vector3Like,
    [[p1x, p1y, p1z], [p2x, p2y, p2z], [p3x, p3y, p3z]]: [
      Vec3Array,
      Vec3Array,
      Vec3Array
    ]
  ) {
    const { positions, normals, indices } = tool;
    const baseIndex = tool.indicieIndex;
    let posIndex = tool.positions.length;
    let normIndex = tool.normals.length;
    let indIndex = tool.indices.length;

    positions[posIndex++] = origin.x + p1x;
    positions[posIndex++] = origin.y + p1y;
    positions[posIndex++] = origin.z + p1z;
    positions[posIndex++] = origin.x + p2x;
    positions[posIndex++] = origin.y + p2y;
    positions[posIndex++] = origin.z + p2z;
    positions[posIndex++] = origin.x + p3x;
    positions[posIndex++] = origin.y + p3y;
    positions[posIndex++] = origin.z + p3z;

    const triangleNormals = GeometryNormals.getTriangleNormals(
      [p1x, p1y, p1z],
      [p2x, p2y, p2z],
      [p3x, p3y, p3z]
    );

    for (let i = 0; i < 3; i++) {
      normals[normIndex++] = triangleNormals[0];
      normals[normIndex++] = triangleNormals[1];
      normals[normIndex++] = triangleNormals[2];
    }

    indices[indIndex++] = baseIndex;
    indices[indIndex++] = baseIndex + 1;
    indices[indIndex++] = baseIndex + 2;

    tool.positions.length = posIndex;
    tool.normals.length = normIndex;
    tool.indices.length = indIndex;
    tool.indicieIndex += 3;
  }

  static addQuad(tool: MesherDataTool, origin: Vector3Like, quad: Quad) {
    const { positions, normals, indices } = tool;
    const baseIndex = tool.indicieIndex;
    let posIndex = tool.positions.length;
    let normIndex = tool.normals.length;
    let indIndex = tool.indices.length;

    const topRight = quad.positions.vertices[1];
    const topLeft = quad.positions.vertices[2];
    const bottomLeft = quad.positions.vertices[3];
    const bottomRight = quad.positions.vertices[4];

    let normalMulti = 1;

    const { orientation: orin, flip } = quad;

    let orientation = orin;
    if (orientation) {
      normalMulti = -1;
    }

    let sides = quad.doubleSided ? 2 : 1;
    while (sides--) {
      if (!flip) {
        positions[posIndex++] = topRight.x + origin.x;
        positions[posIndex++] = topRight.y + origin.y;
        positions[posIndex++] = topRight.z + origin.z;
        positions[posIndex++] = topLeft.x + origin.x;
        positions[posIndex++] = topLeft.y + origin.y;
        positions[posIndex++] = topLeft.z + origin.z;
        positions[posIndex++] = bottomLeft.x + origin.x;
        positions[posIndex++] = bottomLeft.y + origin.y;
        positions[posIndex++] = bottomLeft.z + origin.z;
        positions[posIndex++] = bottomRight.x + origin.x;
        positions[posIndex++] = bottomRight.y + origin.y;
        positions[posIndex++] = bottomRight.z + origin.z;
      } else {
        positions[posIndex++] = topLeft.x + origin.x;
        positions[posIndex++] = topLeft.y + origin.y;
        positions[posIndex++] = topLeft.z + origin.z;
        positions[posIndex++] = topRight.x + origin.x;
        positions[posIndex++] = topRight.y + origin.y;
        positions[posIndex++] = topRight.z + origin.z;
        positions[posIndex++] = bottomRight.x + origin.x;
        positions[posIndex++] = bottomRight.y + origin.y;
        positions[posIndex++] = bottomRight.z + origin.z;
        positions[posIndex++] = bottomLeft.x + origin.x;
        positions[posIndex++] = bottomLeft.y + origin.y;
        positions[posIndex++] = bottomLeft.z + origin.z;
      }

      if (!orientation && !flip) {
        indices[indIndex++] = baseIndex;
        indices[indIndex++] = baseIndex + 1;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 3;
        indices[indIndex++] = baseIndex;
      } else if (!orientation && flip) {
        indices[indIndex++] = baseIndex;
        indices[indIndex++] = baseIndex + 3;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 1;
        indices[indIndex++] = baseIndex;
      }

      if (orientation && !flip) {
        indices[indIndex++] = baseIndex;
        indices[indIndex++] = baseIndex + 3;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 1;
        indices[indIndex++] = baseIndex;
      } else if (orientation && flip) {
        indices[indIndex++] = baseIndex;
        indices[indIndex++] = baseIndex + 1;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 3;
        indices[indIndex++] = baseIndex;
      }
      {
        const topRight = quad.normals.vertices[1];
        const topLeft = quad.normals.vertices[2];
        const bottomLeft = quad.normals.vertices[3];
        const bottomRight = quad.normals.vertices[4];

        normals[normIndex++] = topRight.x * normalMulti;
        normals[normIndex++] = topRight.y * normalMulti;
        normals[normIndex++] = topRight.z * normalMulti;
        normals[normIndex++] = topLeft.x * normalMulti;
        normals[normIndex++] = topLeft.y * normalMulti;
        normals[normIndex++] = topLeft.z * normalMulti;
        normals[normIndex++] = bottomLeft.x * normalMulti;
        normals[normIndex++] = bottomLeft.y * normalMulti;
        normals[normIndex++] = bottomLeft.z * normalMulti;
        normals[normIndex++] = bottomRight.x * normalMulti;
        normals[normIndex++] = bottomRight.y * normalMulti;
        normals[normIndex++] = bottomRight.z * normalMulti;
      }
      tool.indicieIndex += 4;

      orientation = orientation == 1 ? 0 : 1;
      normalMulti *= -1;
    }

    tool.positions.length = posIndex;
    tool.normals.length = normIndex;
    tool.indices.length = indIndex;
  }

  /*   static addQuad(
    tool: MesherDataTool,
    origin: Vector3Like,
    doubleSided: boolean,
    [
      [p1x, p1y, p1z],
      [p2x, p2y, p2z],
      [p3x, p3y, p3z],
      [p4x, p4y, p4z],
    ]: QuadVertexVec3Data
  ) {
    const { positions, normals, indices } = tool;
    const baseIndex = tool.indicieIndex;
    let posIndex = tool.positions.length;
    let normIndex = tool.normals.length;
    let indIndex = tool.indices.length;

    const quadNormals = GeometryNormals.getQuadNormal(
      [p1x, p1y, p1z],
      [p2x, p2y, p2z],
      [p3x, p3y, p3z],
      [p4x, p4y, p4z]
    );

    positions[posIndex++] = origin.x + p1x;
    positions[posIndex++] = origin.y + p1y;
    positions[posIndex++] = origin.z + p1z;
    positions[posIndex++] = origin.x + p2x;
    positions[posIndex++] = origin.y + p2y;
    positions[posIndex++] = origin.z + p2z;
    positions[posIndex++] = origin.x + p3x;
    positions[posIndex++] = origin.y + p3y;
    positions[posIndex++] = origin.z + p3z;
    positions[posIndex++] = origin.x + p4x;
    positions[posIndex++] = origin.y + p4y;
    positions[posIndex++] = origin.z + p4z;

    indices[indIndex++] = baseIndex;
    indices[indIndex++] = baseIndex + 1;
    indices[indIndex++] = baseIndex + 2;
    indices[indIndex++] = baseIndex + 2;
    indices[indIndex++] = baseIndex + 3;
    indices[indIndex++] = baseIndex;

    for (let i = 0; i < 4; i++) {
      normals[normIndex++] = quadNormals[i][0];
      normals[normIndex++] = quadNormals[i][1];
      normals[normIndex++] = quadNormals[i][2];
    }

    if (doubleSided) {
      positions[posIndex++] = origin.x + p1x;
      positions[posIndex++] = origin.y + p1y;
      positions[posIndex++] = origin.z + p1z;
      positions[posIndex++] = origin.x + p2x;
      positions[posIndex++] = origin.y + p2y;
      positions[posIndex++] = origin.z + p2z;
      positions[posIndex++] = origin.x + p3x;
      positions[posIndex++] = origin.y + p3y;
      positions[posIndex++] = origin.z + p3z;
      positions[posIndex++] = origin.x + p4x;
      positions[posIndex++] = origin.y + p4y;
      positions[posIndex++] = origin.z + p4z;
      
      indices[indIndex++] = baseIndex;
      indices[indIndex++] = baseIndex + 3;
      indices[indIndex++] = baseIndex + 2;
      indices[indIndex++] = baseIndex + 2;
      indices[indIndex++] = baseIndex + 1;
      indices[indIndex++] = baseIndex;

      for (let i = 0; i < 4; i++) {
        normals[normIndex++] = -quadNormals[i][0];
        normals[normIndex++] = -quadNormals[i][1];
        normals[normIndex++] = -quadNormals[i][2];
      }
    }

    tool.positions.length = posIndex;
    tool.normals.length = normIndex;
    tool.indices.length = indIndex;
    tool.indicieIndex += 4 * (doubleSided ? 2 : 1);
  }

  static calculateQuadPoints(start: Vec3Array, end: Vec3Array) {
    const plane = start
      .map((value, index) => (end[index] !== value ? index : -1))
      .filter((index) => index !== -1);

    let topLeft: Vec3Array, bottomRight: Vec3Array;
    const topRight = end;
    const bottomLeft = start;

    if (plane.includes(0) && plane.includes(2)) {
      // XZ plane
      topLeft = [start[0], start[1], end[2]];
      bottomRight = [end[0], start[1], start[2]];
    } else if (plane.includes(0) && plane.includes(1)) {
      // XY plane
      topLeft = [start[0], end[1], start[2]];
      bottomRight = [end[0], start[1], start[2]];
    } else if (plane.includes(1) && plane.includes(2)) {
      // YZ plane
      topLeft = [start[0], end[1], start[2]];
      bottomRight = [start[0], start[1], end[2]];
    }

    const delta = [end[0] - start[0], end[1] - start[1], end[2] - start[2]];

    let normal: Vec3Array = [0, 0, 0];
    if (delta[0] === 0) {
      // Constant X, so normal is along X
      normal[0] = 1;
    } else if (delta[1] === 0) {
      // Constant Y, so normal is along Y
      normal[1] = 1;
    } else if (delta[2] === 0) {
      // Constant Z, so normal is along Z
      normal[2] = 1;
    }

    return {
      //@ts-ignore
      points: [topRight, topLeft, bottomLeft, bottomRight],
      normal,
    } as const;
  }

  static addSimpleQuad(
    tool: MesherDataTool,
    origin: Vector3Like,
    orientation: 0 | 1,
    flip: boolean,
    [start, end]: [Vec3Array, Vec3Array]
  ) {
    const { positions, normals, indices } = tool;
    const baseIndex = tool.indicieIndex;
    let posIndex = tool.positions.length;
    let normIndex = tool.normals.length;
    let indIndex = tool.indices.length;

    const {
      points: [topRight, topLeft, bottomLeft, bottomRight],
      normal,
    } = this.calculateQuadPoints(start, end);

    if (orientation) {
      for (let i = 0; i < normal.length; i++) {
        if (!normal[i]) continue;
        normal[i] = -normal[i];
      }
    }

    if (!flip) {
      positions[posIndex++] = topRight[0] + origin.x;
      positions[posIndex++] = topRight[1] + origin.y;
      positions[posIndex++] = topRight[2] + origin.z;
      positions[posIndex++] = topLeft[0] + origin.x;
      positions[posIndex++] = topLeft[1] + origin.y;
      positions[posIndex++] = topLeft[2] + origin.z;
      positions[posIndex++] = bottomLeft[0] + origin.x;
      positions[posIndex++] = bottomLeft[1] + origin.y;
      positions[posIndex++] = bottomLeft[2] + origin.z;
      positions[posIndex++] = bottomRight[0] + origin.x;
      positions[posIndex++] = bottomRight[1] + origin.y;
      positions[posIndex++] = bottomRight[2] + origin.z;
    } else {
      positions[posIndex++] = topLeft[0] + origin.x;
      positions[posIndex++] = topLeft[1] + origin.y;
      positions[posIndex++] = topLeft[2] + origin.z;
      positions[posIndex++] = topRight[0] + origin.x;
      positions[posIndex++] = topRight[1] + origin.y;
      positions[posIndex++] = topRight[2] + origin.z;
      positions[posIndex++] = bottomRight[0] + origin.x;
      positions[posIndex++] = bottomRight[1] + origin.y;
      positions[posIndex++] = bottomRight[2] + origin.z;
      positions[posIndex++] = bottomLeft[0] + origin.x;
      positions[posIndex++] = bottomLeft[1] + origin.y;
      positions[posIndex++] = bottomLeft[2] + origin.z;
    }

    if (!orientation && !flip) {
      indices[indIndex++] = baseIndex;
      indices[indIndex++] = baseIndex + 1;
      indices[indIndex++] = baseIndex + 2;
      indices[indIndex++] = baseIndex + 2;
      indices[indIndex++] = baseIndex + 3;
      indices[indIndex++] = baseIndex;
    } else if (!orientation && flip) {
      indices[indIndex++] = baseIndex;
      indices[indIndex++] = baseIndex + 3;
      indices[indIndex++] = baseIndex + 2;
      indices[indIndex++] = baseIndex + 2;
      indices[indIndex++] = baseIndex + 1;
      indices[indIndex++] = baseIndex;
    }

    if (orientation && !flip) {
      indices[indIndex++] = baseIndex;
      indices[indIndex++] = baseIndex + 3;
      indices[indIndex++] = baseIndex + 2;
      indices[indIndex++] = baseIndex + 2;
      indices[indIndex++] = baseIndex + 1;
      indices[indIndex++] = baseIndex;
    } else if (orientation && flip) {
      indices[indIndex++] = baseIndex;
      indices[indIndex++] = baseIndex + 1;
      indices[indIndex++] = baseIndex + 2;
      indices[indIndex++] = baseIndex + 2;
      indices[indIndex++] = baseIndex + 3;
      indices[indIndex++] = baseIndex;
    }

    for (let i = 0; i < 4; i++) {
      normals[normIndex++] = normal[0];
      normals[normIndex++] = normal[1];
      normals[normIndex++] = normal[2];
    }

    tool.positions.length = posIndex;
    tool.normals.length = normIndex;
    tool.indices.length = indIndex;
    tool.indicieIndex += 4;
  } */
}
