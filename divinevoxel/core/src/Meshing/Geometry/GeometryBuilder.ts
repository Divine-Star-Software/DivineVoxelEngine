import type { Position3Matrix, Vec3Array } from "../../Math";

import { GeometryNormals } from "./GeometryNormals.js";
import { MesherDataTool } from "../Tools/MesherDataTools.js";
import { QuadVertexVec3Data } from "../Geometry.types";

export class GeometryBuilder {
  static addTriangle(
    tool: MesherDataTool,
    origin: Position3Matrix,
    [[p1x, p1y, p1z], [p2x, p2y, p2z], [p3x, p3y, p3z]]: [
      Vec3Array,
      Vec3Array,
      Vec3Array
    ]
  ) {
    tool.addPositions(
      //v1
      origin.x + p1x,
      origin.y + p1y,
      origin.z + p1z,
      //v2
      origin.x + p2x,
      origin.y + p2y,
      origin.z + p2z,
      //v3
      origin.x + p3x,
      origin.y + p3y,
      origin.z + p3z
    );

    const normals = GeometryNormals.getTriangleNormals(
      [p1x, p1y, p1z],
      [p2x, p2y, p2z],
      [p3x, p3y, p3z]
    );

    tool.addIndices(
      tool.indicieIndex,
      tool.indicieIndex + 1,
      tool.indicieIndex + 2
    );
    tool.addNormals(
      //v1
      normals[0],
      normals[1],
      normals[2],
      //v2
      normals[0],
      normals[1],
      normals[2],
      //v3
      normals[0],
      normals[1],
      normals[2]
    );

    tool.indicieIndex += 3;
  }

  static addQuadAttributes() {}
  static addQuad(
    tool: MesherDataTool,
    origin: Position3Matrix,
    doubleSided: boolean,
    [
      [p1x, p1y, p1z],
      [p2x, p2y, p2z],
      [p3x, p3y, p3z],
      [p4x, p4y, p4z],
    ]: QuadVertexVec3Data
  ) {
    let sides = doubleSided ? 2 : 1;

    const normals = GeometryNormals.getQuadNormal(
      [p1x, p1y, p1z],
      [p2x, p2y, p2z],
      [p3x, p3y, p3z],
      [p4x, p4y, p4z]
    );
    tool.addNormals(
      //v1
      normals[0][0],
      normals[0][1],
      normals[0][2],
      //v2
      normals[1][0],
      normals[1][1],
      normals[1][2],
      //v3
      normals[2][0],
      normals[2][1],
      normals[2][2],
      //v4
      normals[3][0],
      normals[3][1],
      normals[3][2]
    );

    tool.addIndices(
      tool.indicieIndex,
      tool.indicieIndex + 1,
      tool.indicieIndex + 2,
      tool.indicieIndex + 2,
      tool.indicieIndex + 3,
      tool.indicieIndex
    );
    if (doubleSided) {
      tool.addIndices(
        tool.indicieIndex,
        tool.indicieIndex + 3,
        tool.indicieIndex + 2,
        tool.indicieIndex + 2,
        tool.indicieIndex + 1,
        tool.indicieIndex
      );
      tool.addNormals(
        //v1
        -normals[0][0],
        -normals[0][1],
        -normals[0][2],
        //v2
        -normals[1][0],
        -normals[1][1],
        -normals[1][2],
        //v3
        -normals[2][0],
        -normals[2][1],
        -normals[2][2],
        //v4
        -normals[3][0],
        -normals[3][1],
        -normals[3][2]
      );
    }
    for (let i = 0; i < sides; i++) {
      tool.addPositions(
        //v1
        origin.x + p1x,
        origin.y + p1y,
        origin.z + p1z,
        //v2
        origin.x + p2x,
        origin.y + p2y,
        origin.z + p2z,
        //v3
        origin.x + p3x,
        origin.y + p3y,
        origin.z + p3z,
        //v4
        origin.x + p4x,
        origin.y + p4y,
        origin.z + p4z
      );

      tool.indicieIndex += 4;
    }
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
    origin: Position3Matrix,
    orientation: 0 | 1,
    flip: boolean,
    [start, end]: [Vec3Array, Vec3Array]
  ) {
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
    //  let sides = doubleSided ? 2 : 1;

    if (!flip) {
      tool.addPositions(
        topRight[0] + origin.x,
        topRight[1] + origin.y,
        topRight[2] + origin.z,
        topLeft[0] + origin.x,
        topLeft[1] + origin.y,
        topLeft[2] + origin.z,
        bottomLeft[0] + origin.x,
        bottomLeft[1] + origin.y,
        bottomLeft[2] + origin.z,
        bottomRight[0] + origin.x,
        bottomRight[1] + origin.y,
        bottomRight[2] + origin.z
      );
    } else {
      tool.addPositions(
        topLeft[0] + origin.x,
        topLeft[1] + origin.y,
        topLeft[2] + origin.z,
        topRight[0] + origin.x,
        topRight[1] + origin.y,
        topRight[2] + origin.z,
        bottomRight[0] + origin.x,
        bottomRight[1] + origin.y,
        bottomRight[2] + origin.z,
        bottomLeft[0] + origin.x,
        bottomLeft[1] + origin.y,
        bottomLeft[2] + origin.z
      );
    }
    if (!orientation && !flip) {
      tool.addIndices(
        tool.indicieIndex,
        tool.indicieIndex + 1,
        tool.indicieIndex + 2,
        tool.indicieIndex + 2,
        tool.indicieIndex + 3,
        tool.indicieIndex
      );
    } else if (!orientation && flip) {
      tool.addIndices(
        tool.indicieIndex,
        tool.indicieIndex + 3,
        tool.indicieIndex + 2,
        tool.indicieIndex + 2,
        tool.indicieIndex + 1,
        tool.indicieIndex
      );
    }
    if (orientation && !flip) {
      tool.addIndices(
        tool.indicieIndex,
        tool.indicieIndex + 3,
        tool.indicieIndex + 2,
        tool.indicieIndex + 2,
        tool.indicieIndex + 1,
        tool.indicieIndex
      );
    } else if (orientation && flip) {
      tool.addIndices(
        tool.indicieIndex,
        tool.indicieIndex + 1,
        tool.indicieIndex + 2,
        tool.indicieIndex + 2,
        tool.indicieIndex + 3,
        tool.indicieIndex
      );
    }
    tool.indicieIndex += 4;

    for (let i = 0; i < 4; i++) {
      tool.addNormals(...normal);
    }
  }
}
