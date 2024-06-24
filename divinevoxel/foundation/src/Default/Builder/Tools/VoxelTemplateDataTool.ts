import type { DirectionNames } from "@divinevoxel/core/Types/Util.types.js";
//data
import { QuadScalarVertexData } from "@amodx/meshing/Classes/QuadVertexData";

export class VoxelTemplateDataTool {
  _active = false;
  _faces: Record<DirectionNames, number> = {
    top: 0,
    bottom: 0,
    west: 0,
    east: 0,
    north: 0,
    south: 0,
  };
  _lights: Record<DirectionNames, QuadScalarVertexData> = {
    top: new QuadScalarVertexData(),
    bottom: new QuadScalarVertexData(),
    west: new QuadScalarVertexData(),
    east: new QuadScalarVertexData(),
    north: new QuadScalarVertexData(),
    south: new QuadScalarVertexData(),
  };
  _aos: Record<DirectionNames, QuadScalarVertexData> = {
    top: new QuadScalarVertexData(),
    bottom: new QuadScalarVertexData(),
    west: new QuadScalarVertexData(),
    east: new QuadScalarVertexData(),
    north: new QuadScalarVertexData(),
    south: new QuadScalarVertexData(),
  };
  _light = new QuadScalarVertexData();
  _level = new QuadScalarVertexData();
  _ao = new QuadScalarVertexData();
  isAcive() {
    return this._active;
  }
  setActive(active: boolean) {
    this._active = active;
  }
  load(template: Uint32Array, index: number) {
    const segment2 = template[index + 1];
    const faceByte = segment2 & 0xff;
    this._faces.top = (faceByte & (0b1 << 0)) >> 0;
    this._faces.bottom = (faceByte & (0b1 << 1)) >> 1;
    this._faces.west = (faceByte & (0b1 << 2)) >> 2;
    this._faces.east = (faceByte & (0b1 << 3)) >> 3;
    this._faces.north = (faceByte & (0b1 << 4)) >> 4;
    this._faces.south = (faceByte & (0b1 << 5)) >> 5;

    //deocde light
    let lightIndex = index + 2;

    {
      const light1 = template[lightIndex];
      const light2 = template[lightIndex + 1];
      this._lights.top.set(
        light1 & 0xffff,
        ((0xffff << 16) & light1) >>> 16,
        light2 & 0xffff,
        ((0xffff << 16) & light2) >>> 16
      );
    }
    {
      const light1 = template[lightIndex + 2];
      const light2 = template[lightIndex + 3];
      this._lights.bottom.set(
        light1 & 0xffff,
        ((0xffff << 16) & light1) >>> 16,
        light2 & 0xffff,
        ((0xffff << 16) & light2) >>> 16
      );
    }
    {
      const light1 = template[lightIndex + 4];
      const light2 = template[lightIndex + 5];
      this._lights.west.set(
        light1 & 0xffff,
        ((0xffff << 16) & light1) >>> 16,
        light2 & 0xffff,
        ((0xffff << 16) & light2) >>> 16
      );
    }
    {
      const light1 = template[lightIndex + 6];
      const light2 = template[lightIndex + 7];
      this._lights.east.set(
        light1 & 0xffff,
        ((0xffff << 16) & light1) >>> 16,
        light2 & 0xffff,
        ((0xffff << 16) & light2) >>> 16
      );
    }
    {
      const light1 = template[lightIndex + 8];
      const light2 = template[lightIndex + 9];
      this._lights.north.set(
        light1 & 0xffff,
        ((0xffff << 16) & light1) >>> 16,
        light2 & 0xffff,
        ((0xffff << 16) & light2) >>> 16
      );
    }
    {
      const light1 = template[lightIndex + 10];
      const light2 = template[lightIndex + 11];
      this._lights.south.set(
        light1 & 0xffff,
        ((0xffff << 16) & light1) >>> 16,
        light2 & 0xffff,
        ((0xffff << 16) & light2) >>> 16
      );
    }
    let aoIndex = lightIndex + 12;
    //decode ao

    {
      const ao = template[aoIndex];
      this._aos.top.set(
        ao & 0xf,
        ((0xf << 4) & ao) >>> 4,
        ((0xf << 8) & ao) >>> 8,
        ((0xf << 12) & ao) >>> 12
      );
    }
    {
      const ao = ((0xffff << 16) & template[aoIndex]) >> 16;
      this._aos.bottom.set(
        ao & 0xf,
        ((0xf << 4) & ao) >>> 4,
        ((0xf << 8) & ao) >>> 8,
        ((0xf << 12) & ao) >>> 12
      );
    }

    {
      const ao = template[aoIndex + 1];
      this._aos.west.set(
        ao & 0xf,
        ((0xf << 4) & ao) >>> 4,
        ((0xf << 8) & ao) >>> 8,
        ((0xf << 12) & ao) >>> 12
      );
    }
    {
      const ao = ((0xffff << 16) & template[aoIndex + 1]) >> 16;
      this._aos.east.set(
        ao & 0xf,
        ((0xf << 4) & ao) >>> 4,
        ((0xf << 8) & ao) >>> 8,
        ((0xf << 12) & ao) >>> 12
      );
    }

    {
      const ao = template[aoIndex + 2];
      this._aos.north.set(
        ao & 0xf,
        ((0xf << 4) & ao) >>> 4,
        ((0xf << 8) & ao) >>> 8,
        ((0xf << 12) & ao) >>> 12
      );
    }
    {
      const ao = ((0xffff << 16) & template[aoIndex + 2]) >> 16;
      this._aos.south.set(
        ao & 0xf,
        ((0xf << 4) & ao) >>> 4,
        ((0xf << 8) & ao) >>> 8,
        ((0xf << 12) & ao) >>> 12
      );
    }
    //   this._light.setAll(LightData.setRGB(0xf0f, 0));
    //   this._ao.setAll(1);
    this._level.setAll(0xf);
  }

  isFaceExposed(face: DirectionNames) {
    return this._faces[face] == 1;
  }
}
