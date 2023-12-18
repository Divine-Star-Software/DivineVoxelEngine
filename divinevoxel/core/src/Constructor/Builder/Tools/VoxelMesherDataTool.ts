import type { FaceDataOverride } from "../Types/Override.types";
import type { DirectionNames } from "Types/Util.types.js";
import type { CustomVertexData } from "../Types/Geometry.types.js";

//objects
import { LightGradient } from "../Calc/Light/LightGradient.js";
import { FlowGradient } from "../Calc/Flow/FlowGradient.js";
import { OverrideManager } from "../Rules/Overrides/OverridesManager.js";
import { SubstanceRules } from "../Rules/SubstanceRules.js";

//tools
import { BuilderDataTool } from "./BuilderDataTool.js";
import { MesherDataTool } from "./MesherDataTools.js";

//data
import { FaceNormals } from "../../../Math/Constants/Faces.js";
import { QuadVertexData } from "../Classes/VertexData.js";
import { LightData } from "../../../Data/Light/LightByte.js";

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
  _lights: Record<DirectionNames, QuadVertexData> = {
    top: new QuadVertexData(),
    bottom: new QuadVertexData(),
    west: new QuadVertexData(),
    east: new QuadVertexData(),
    north: new QuadVertexData(),
    south: new QuadVertexData(),
  };
  _aos: Record<DirectionNames, QuadVertexData> = {
    top: new QuadVertexData(),
    bottom: new QuadVertexData(),
    west: new QuadVertexData(),
    east: new QuadVertexData(),
    north: new QuadVertexData(),
    south: new QuadVertexData(),
  };
  _light = new QuadVertexData();
  _level = new QuadVertexData();
  _ao = new QuadVertexData();
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

export class VoxelMesherDataTool extends MesherDataTool {
  template = new VoxelTemplateDataTool();
  voxel = new BuilderDataTool();
  nVoxel = new BuilderDataTool();
  faceDataOverride = <FaceDataOverride>{
    face: "south",
    default: false,
    currentVoxel: <BuilderDataTool>{},
    neighborVoxel: <BuilderDataTool>{},
  };
  constructor() {
    super();
    this.faceDataOverride.currentVoxel = this.voxel;
    this.faceDataOverride.neighborVoxel = this.nVoxel;
    this.attributes.add([
      ["voxelData", [[], 1, "32f"]],
      ["cuv3", [[], 3, "32f"]],
      ["ocuv3", [[], 4, "32f"]],
      ["colors", [[], 3, "32f"]],
    ]);
    this.segments.add([
      ["uvs", []],
      ["overlay-uvs", []],
    ]);
    this.quadVertexData.add([
      ["light", new QuadVertexData()],
      ["ao", new QuadVertexData()],
      ["level", new QuadVertexData()],
      ["overlay-uvs", new QuadVertexData()],
    ]);

    this.vars.add([
      ["face-flipped", 0],
      ["texture-index", 0],
    ]);
  }

  calculateLight(direction: DirectionNames, ignoreAO = false) {
    if (this.template.isAcive()) {
        this.template._light = this.template._lights[direction];
        this.template._ao = this.template._aos[direction];
      return;
    }
    LightGradient.calculate(direction, this, ignoreAO);
  }

  calculateFlow() {
    if (this.template.isAcive()) {
      return;
    }
    FlowGradient.calculate(this);
  }

  getWorldLight() {
    if (this.template.isAcive()) {
      return this.template._light;
    }
    return this.quadVertexData.get("light")!;
  }

  getWorldAO() {
    if (this.template.isAcive()) {
      return this.template._ao;
    }
    return this.quadVertexData.get("ao")!;
  }

  getWorldLevel() {
    if (this.template.isAcive()) {
      return this.template._level;
    }
    return this.quadVertexData.get("level")!;
  }

  getOverlayTextures() {
    return this.quadVertexData.get("overlay-uvs")!;
  }

  setTexture(uv: number) {
    this.vars.set("texture-index", uv)!;
    return this;
  }

  getTexture() {
    return this.vars.get("texture-index")!;
  }

  setFaceFlipped(value: boolean) {
    this.vars.set("face-flipped", value ? 1 : 0);
    return this;
  }

  isFaceFlipped() {
    return this.vars.get("face-flipped")! == 1;
  }

  isFaceExposed(face: DirectionNames) {
    if (this.template.isAcive()) {
      return this.template.isFaceExposed(face);
    }
    const voxelExists = this.nVoxel.loadInAt(
      FaceNormals[face][0] + this.voxel.x,
      FaceNormals[face][1] + this.voxel.y,
      FaceNormals[face][2] + this.voxel.z
    );

    if (!voxelExists || !this.nVoxel.isRenderable()) return true;
    let finalResult = false;
    let substanceRuleResult = SubstanceRules.exposedCheck(
      this.voxel.getSubstance(),
      this.nVoxel.getSubstance()
    );
    this.faceDataOverride.face = face;
    this.faceDataOverride.default = substanceRuleResult;
    finalResult = substanceRuleResult;
    this.faceDataOverride.default = finalResult;
    finalResult = OverrideManager.runOverride(
      "CullFace",
      this.voxel.getShapeId(),
      "Any",
      this.faceDataOverride
    );
    this.faceDataOverride.default = finalResult;
    finalResult = OverrideManager.runOverride(
      "CullFace",
      this.voxel.getShapeId(),
      this.nVoxel.getShapeId(),
      this.faceDataOverride
    );
    this.faceDataOverride.default = finalResult;
    finalResult = OverrideManager.runOverride(
      "CullFace",
      this.voxel.getStringId(),
      this.nVoxel.getShapeId(),
      this.faceDataOverride
    );
    return finalResult;
  }
}
