import { PositionMatrix } from "Meta/Util.types";

export class MeshBuilder {
  textureAtlasImageWidth = 16;
  textureAtlasImageHeight = 16;
  textureAtlasTileVertical = 256;
  textureAtlasTileHorizontal = 256;
  textureAtlasWidth =
    this.textureAtlasImageWidth * this.textureAtlasTileHorizontal;
  textureAtlasHeight =
    this.textureAtlasImageHeight * this.textureAtlasTileVertical;

  getUVS(imageRow: number, imageCol: number): number[] {
    const percentFromBottm =
      ((this.textureAtlasTileVertical - imageRow) *
        this.textureAtlasImageHeight) /
      this.textureAtlasHeight;
    const percentTop =
      percentFromBottm + this.textureAtlasImageHeight / this.textureAtlasHeight;
    const percentFromLeft =
      ((imageCol - 1) * this.textureAtlasImageWidth) / this.textureAtlasWidth;
    const percentLeft =
      percentFromLeft + this.textureAtlasImageWidth / this.textureAtlasWidth;

    return [percentFromBottm, percentFromLeft, percentTop, percentLeft];
  }

  getNextAnimationBoxFaceUVs(
    uvs: number[],
    face: "top" | "bottom" | "north" | "west" | "south" | "east",
    blockID: number
  ) {
    let perc;
    let bottomStart;
    let leftStart;
    let bottomEnd;
    let leftEnd;

    switch (face) {
      case "top":
        perc = this.getUVS(1, Math.floor(Math.random() * 3) + 1);
        bottomStart = perc[0];
        leftStart = perc[1];
        bottomEnd = perc[2];
        leftEnd = perc[3];

        uvs.push(
          //2
          leftStart,
          bottomStart,
          //1
          leftStart,
          bottomEnd,
          //3
          leftEnd,
          bottomEnd,
          //2
          leftStart,
          bottomEnd
        );

        break;

      case "bottom":
        perc = this.getUVS(1, Math.floor(Math.random() * 3) + 1);
        bottomStart = perc[0];
        leftStart = perc[1];
        bottomEnd = perc[2];
        leftEnd = perc[3];

        uvs.push(
          //2
          leftStart,
          bottomStart,
          //1
          leftStart,
          bottomEnd,
          //3
          leftEnd,
          bottomEnd,
          //2
          leftStart,
          bottomEnd
        );
        break;

      case "north":
        perc = this.getUVS(1, Math.floor(Math.random() * 3) + 1);
        bottomStart = perc[0];
        leftStart = perc[1];
        bottomEnd = perc[2];
        leftEnd = perc[3];

        uvs.push(
          //2
          leftStart,
          bottomStart,
          //1
          leftStart,
          bottomEnd,
          //3
          leftEnd,
          bottomEnd,
          //2
          leftStart,
          bottomEnd
        );
        break;

      case "east":
        perc = this.getUVS(1, Math.floor(Math.random() * 3) + 1);
        bottomStart = perc[0];
        leftStart = perc[1];
        bottomEnd = perc[2];
        leftEnd = perc[3];

        uvs.push(
          //2
          leftStart,
          bottomStart,
          //1
          leftStart,
          bottomEnd,
          //3
          leftEnd,
          bottomEnd,
          //2
          leftStart,
          bottomEnd
        );
        break;

      case "south":
        perc = this.getUVS(1, Math.floor(Math.random() * 3) + 1);
        bottomStart = perc[0];
        leftStart = perc[1];
        bottomEnd = perc[2];
        leftEnd = perc[3];

        uvs.push(
          //2
          leftStart,
          bottomStart,
          //1
          leftStart,
          bottomEnd,
          //3
          leftEnd,
          bottomEnd,
          //2
          leftStart,
          bottomEnd
        );
        break;

      case "west":
        perc = this.getUVS(1, Math.floor(Math.random() * 3) + 1);
        bottomStart = perc[0];
        leftStart = perc[1];
        bottomEnd = perc[2];
        leftEnd = perc[3];

        uvs.push(
          //2
          leftStart,
          bottomStart,
          //1
          leftStart,
          bottomEnd,
          //3
          leftEnd,
          bottomEnd,
          //2
          leftStart,
          bottomEnd
        );
        break;
    }
  }

  getBoxFace(
    postions: number[],
    indices: number[],
    colors: number[],
    uvs: number[],
    face: "top" | "bottom" | "north" | "west" | "south" | "east",
    position: PositionMatrix,
    startingIndices: number,
    width: number = 0.5,
    depth: number = 0.5,
    height: number = 0.5
  ) {
   let uv = 2;
 //  let uv =  Math.floor(Math.random() * 5) ;
   let numIndices = 0;
    //let uv = 1.0;
    let perc;
    let bottomStart;
    let leftStart;
    let bottomEnd;
    let leftEnd;
    position.x += width;
    position.z += depth;
    position.y += height;

    switch (face) {
      case "top":
        postions.push(
          position.x + -width,
          position.y + height,
          position.z + -depth,
          position.x + -width,
          position.y + height,
          position.z + depth,
          position.x + width,
          position.y + height,
          position.z + depth,
          position.x + width,
          position.y + height,
          position.z + -depth
        );
        indices.push(
          startingIndices + 3,
          startingIndices + 2,
          startingIndices,
          startingIndices + 2,
          startingIndices + 1,
          startingIndices
        );
        numIndices = 4;

        uvs.push(
          //1
          0,
          0,
          uv,
          //2
          1,
          0,
          uv,
          //3
          1,
          1,
          uv,
          //4
          0,
          1,
          uv
        );

        break;

      case "bottom":
        postions.push(
          position.x + -width,
          position.y + -height,
          position.z + -depth,
          position.x + width,
          position.y + -height,
          position.z + -depth,
          position.x + width,
          position.y + -height,
          position.z + depth,
          position.x + -width,
          position.y + -height,
          position.z + depth
        );
        indices.push(
          startingIndices + 2,
          startingIndices + 1,
          startingIndices,

          startingIndices + 3,
          startingIndices + 2,
          startingIndices
        );
        numIndices = 4;
        uvs.push(
          //1
          0,
          0,
          uv,
          //2
          1,
          0,
          uv,
          //3
          1,
          1,
          uv,
          //4
          0,
          1,
          uv
        );
        //   this._getLightLevelColors(Math.floor(Math.random() * 16) + 1, 1, colors);
        break;

      case "north":
        postions.push(
          position.x + -width,
          position.y + -height,
          position.z + -depth,
          position.x + -width,
          position.y + height,
          position.z + -depth,
          position.x + width,
          position.y + height,
          position.z + -depth,
          position.x + width,
          position.y + -height,
          position.z + -depth
        );
        indices.push(
          startingIndices + 2,
          startingIndices + 1,
          startingIndices,

          startingIndices + 3,
          startingIndices + 2,
          startingIndices
        );
      
        numIndices = 4;
        uvs.push(
          //1
          0,
          0,
          uv,
          //2
          1,
          0,
          uv,
          //3
          1,
          1,
          uv,
          //4
          0,
          1,
          uv
        );
        //  this._getLightLevelColors(Math.floor(Math.random() * 16) + 1, 1, colors);
        break;
      case "south":
        postions.push(
          position.x + -width,
          position.y + -height,
          position.z + depth,
          position.x + width,
          position.y + -height,
          position.z + depth,
          position.x + width,
          position.y + height,
          position.z + depth,
          position.x + -width,
          position.y + height,
          position.z + depth
        );
        indices.push(
          startingIndices + 3,
          startingIndices + 2,
          startingIndices,
          startingIndices + 2,
          startingIndices + 1,
          startingIndices
        );
        numIndices = 4;
        uvs.push(
          //1
          0,
          0,
          uv,
          //2
          1,
          0,
          uv,
          //3
          1,
          1,
          uv,
          //4
          0,
          1,
          uv
        );
        //   this._getLightLevelColors(Math.floor(Math.random() * 16) + 1, 1, colors);
        break;

      case "east":
        postions.push(
          position.x + -width,
          position.y + -height,
          position.z + -depth,
          position.x + -width,
          position.y + -height,
          position.z + depth,
          position.x + -width,
          position.y + height,
          position.z + depth,
          position.x + -width,
          position.y + height,
          position.z + -depth
        );
        indices.push(
          startingIndices + 2,
          startingIndices + 1,
          startingIndices,

          startingIndices + 3,
          startingIndices + 2,
          startingIndices
        );
        numIndices = 4;
        uvs.push(
          //1
          0,
          0,
          uv,
          //2
          1,
          0,
          uv,
          //3
          1,
          1,
          uv,
          //4
          0,
          1,
          uv
        );
        //     this._getLightLevelColors(Math.floor(Math.random() * 16) + 1, 1, colors);
        break;
      case "west":
        postions.push(
          position.x + width,
          position.y + -height,
          position.z + -depth,
          position.x + width,
          position.y + height,
          position.z + -depth,
          position.x + width,
          position.y + height,
          position.z + depth,
          position.x + width,
          position.y + -height,
          position.z + depth
        );
        indices.push(
          startingIndices + 2,
          startingIndices + 1,
          startingIndices,

          startingIndices + 3,
          startingIndices + 2,
          startingIndices
        );

        numIndices = 4;



        uvs.push(
          //1
          0,
          0,
          uv,
          //2
          1,
          0,
          uv,
          //3
          1,
          1,
          uv,
          //4
          0,
          1,
          uv
        );
        // this._getLightLevelColors(Math.floor(Math.random() * 16) + 1, 1, colors);
        break;
    }

    return startingIndices + numIndices;
  }

  _getLightLevelColors(level: number, color: number, colors: number[]) {
    const lightMulti = level / 16;

    colors.push(
      //1
      1 * lightMulti,
      1 * lightMulti,
      1 * lightMulti,
      1,
      //2
      1 * lightMulti,
      1 * lightMulti,
      1 * lightMulti,
      1,
      //3
      1 * lightMulti,
      1 * lightMulti,
      1 * lightMulti,
      1,
      //4
      1 * lightMulti,
      1 * lightMulti,
      1 * lightMulti,
      1,
      //5
      1 * lightMulti,
      1 * lightMulti,
      1 * lightMulti,
      1,
      //6
      1 * lightMulti,
      1 * lightMulti,
      1 * lightMulti,
      1
    );
  }
}
