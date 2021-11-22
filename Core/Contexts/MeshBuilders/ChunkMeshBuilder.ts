import type { Util } from "Global/Util.helper";
import { MeshData } from "Meta/Util.types";
import type { MeshBuilder } from "../Meshes/MeshBuilder";

export class ChunkMeshBuilder {
  constructor(private meshBuilder: MeshBuilder, private UTIL: Util) {}

  buildChunkMesh(
    chunkX: number,
    chunkZ: number,
    chunkPositions: Uint16Array,
    chunkFaces: Uint8Array,
    chunkBlocks: Uint16Array,
    chunkGroups: Float32Array,
    chunkAmbientOcculusion: Float32Array
  ): MeshData {
    const positions: number[] = [];
    const indices: number[] = [];

    const uvs: number[] = [];
    const colors: number[] = [];
    let newIndex = 0;

    /**# Template structure
     * ---
     * exposed face num 1- 6
     * groupBlock - block id for the block
     * x - The groups starting x
     * y - The groups starting y
     * z - The group starting z
     * 0/1 - 0 for a horizontla group 1 for a veertical group
     * width - The width of the group
     * depth - The depth of the gorup
     */

    for (let i = 0; i < chunkGroups.length; i += 8) {
      const faceNum = chunkGroups[i];
      const groupBlock = chunkGroups[i + 1];
      const x = chunkGroups[i + 2];
      const y = chunkGroups[i + 3];
      const z = chunkGroups[i + 4];
      const groupOrientation = chunkGroups[i + 5];
      const width = chunkGroups[i + 6];
      const depth = chunkGroups[i + 7];

   //   console.log(faceNum, groupBlock, x, y, z, groupOrientation, width, depth);
      newIndex = this.meshBuilder.getBoxFace(
        positions,
        indices,
        colors,
        [],
        "top",
        { x: x, y: y, z: z },
        newIndex,
        width / 2,
        depth / 2
      );
    //  console.log(width,depth);
      uvs.push(
        //1
        0,
        0,
        0,
        //2
        width,
        0,
        0,
        //3
        width,
        depth,
        0,
        //4
        0,
        depth,
        0
      );
      colors.push(1, 1, 1, 1);
      // this._calculateColor(colors, chunkAmbientOcculusion, j);
    }



    let k = 0;
    let j = 0;
    for (let i = 0; i < chunkPositions.length; i += 3) {
      // if(chunkFaces[i]==0){continue};
      const x = chunkPositions[i];
      const y = chunkPositions[i + 1];
      const z = chunkPositions[i + 2];

      const faceBit = this.UTIL.getBitArray([chunkFaces[k]]);
      const block = chunkBlocks[i];

      //   console.log(faceBit.getBit(0));

      if (faceBit.getBit(0)) {
        newIndex = this.meshBuilder.getBoxFace(
          positions,
          indices,
          colors,
          uvs,
          "top",
          { x: x, y: y, z: z },
          newIndex
        );
        this._calculateColor(colors, chunkAmbientOcculusion, j);
        j += 4;
      }

      if (faceBit.getBit(1)) {
        newIndex = this.meshBuilder.getBoxFace(
          positions,
          indices,
          colors,
          uvs,
          "bottom",
          { x: x, y: y, z: z },
          newIndex
        );
        this._calculateColor(colors, chunkAmbientOcculusion, j);
        j += 4;
      }

      if (faceBit.getBit(2)) {
        newIndex = this.meshBuilder.getBoxFace(
          positions,
          indices,
          colors,
          uvs,
          "west",
          { x: x, y: y, z: z },
          newIndex
        );
        this._calculateColor(colors, chunkAmbientOcculusion, j);
        j += 4;
      }

      if (faceBit.getBit(3)) {
        newIndex = this.meshBuilder.getBoxFace(
          positions,
          indices,
          colors,
          uvs,
          "east",
          { x: x, y: y, z: z },
          newIndex
        );
        this._calculateColor(colors, chunkAmbientOcculusion, j);
        j += 4;
      }

      if (faceBit.getBit(4)) {
        newIndex = this.meshBuilder.getBoxFace(
          positions,
          indices,
          colors,
          uvs,
          "north",
          { x: x, y: y, z: z },
          newIndex
        );
        this._calculateColor(colors, chunkAmbientOcculusion, j);
        j += 4;
      }

      if (faceBit.getBit(5)) {
        newIndex = this.meshBuilder.getBoxFace(
          positions,
          indices,
          colors,
          uvs,
          "south",
          { x: x, y: y, z: z },
          newIndex
        );
        this._calculateColor(colors, chunkAmbientOcculusion, j);
        j += 4;
      }

      k++;
    }

    return {
      positions: positions,
      indices: indices,
      colors: colors,
      uvs: uvs,
    };
  }

  _toLinearSpace(r: number, g: number, b: number, a: number) {
    r = Math.pow(r, 2.2);
    g = Math.pow(g, 2.2);
    b = Math.pow(b, 2.2);
    a = a * 1;
    return [r, g, b, a];
  }

  _calculateColor(
    colors: number[],
    chunkAmbientOcculusion: Float32Array,
    startIndex: number
  ) {
    const Cr = 1;
    const Cg = 1;
    const Cb = 1;
    const Ca = 1;

    for (let v = 0; v < 4; v++) {
      const aColor = chunkAmbientOcculusion[startIndex + v];
      const Ar = aColor * Cr;
      const Ag = aColor * Cg;
      const Ab = aColor * Cb;
      const Aa = aColor * Ca;

      const newColor = this._toLinearSpace(Ar, Ag, Ab, Aa);
      colors.push(newColor[0], newColor[1], newColor[2], 1);
      //   colors.push(1,1,1,1);
    }
  }
}
