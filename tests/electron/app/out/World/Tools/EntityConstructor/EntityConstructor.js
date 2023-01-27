import { DVEW } from "../../DivineVoxelEngineWorld.js";
import { EntityFlat3dArray } from "../../../Data/Entity/EntityFlat3dArray.js";
import { VoxelReader } from "../../../Data/Voxel/VoxelReader.js";
import { LightData } from "../../../Data/Light/LightByte.js";
export const EntityConstructor = {
    voxelData: null,
    voxelStateData: null,
    _3dArray: EntityFlat3dArray,
    voxelByte: VoxelReader,
    lightByte: LightData,
    pos: { x: 0, y: 0, z: 0 },
    composed: 1,
    width: 0,
    depth: 0,
    height: 0,
    begin(width, height, depth, composed = 1) {
        const totalSize = width * height * depth;
        this.voxelData = [];
        this.voxelStateData = [];
        for (let i = 0; i < composed; i++) {
            this.voxelData.push(new Uint32Array(totalSize));
            this.voxelStateData.push(new Uint32Array(totalSize));
        }
        this._3dArray.setBounds(width, height, depth);
        this.composed = composed;
        this.width = width;
        this.height = height;
        this.depth = depth;
    },
    setLight(s, r, g, b, x, y, z, composed = 1) {
        if (!this.voxelData || !this.voxelStateData) {
            throw new Error(`No entity has began construction`);
        }
        const voxelData = this.voxelData[composed - 1];
        this.pos.x = x;
        this.pos.y = y;
        this.pos.z = z;
        let v = 0;
        v = this.lightByte.setS(s, v);
        v = this.lightByte.setR(r, v);
        v = this.lightByte.setG(g, v);
        v = this.lightByte.setB(b, v);
        // v = this.voxelByte.setLight(0, v);
        this._3dArray.setValueUseObj(this.pos, voxelData, v);
    },
    fillLight(s, r, g, b, composed = 1) {
        if (!this.voxelData || !this.voxelStateData) {
            throw new Error(`No entity has began construction`);
        }
        const voxelData = this.voxelData[composed - 1];
        let v = 0;
        v = this.lightByte.setS(s, v);
        v = this.lightByte.setR(r, v);
        v = this.lightByte.setG(g, v);
        v = this.lightByte.setB(b, v);
        // v = this.voxelByte.setLight(0, v);
        for (let x = 0; x < this.width; x++) {
            for (let z = 0; z < this.depth; z++) {
                for (let y = 0; y < this.height; y++) {
                    this.pos.x = x;
                    this.pos.y = y;
                    this.pos.z = z;
                    this._3dArray.setValueUseObj(this.pos, voxelData, v);
                }
            }
        }
    },
    addVoxel(voxelId, voxelStateId, shapeState, x, y, z, composed = 1) {
        /*   if (!this.voxelData || !this.voxelStateData) {
           throw new Error(`No entity has began construction`);
          }
          const voxelData = DVEW.voxelManager.getVoxelData(voxelId);
          if (!voxelData) return;
          const data = DVEW.worldData.getVoxelPaletteId(voxelId, voxelStateId);
          if (data < 0) return;
          this.pos.x = x;
          this.pos.y = y;
          this.pos.z = z;
          const rawVoxelData = this.voxelData[composed - 1];
          const rawVoxelStateData = this.voxelStateData[composed - 1];
          let stateData = this.voxelByte.setShapeState(0, shapeState);
          stateData = DVEW.worldData._getStartingLevel(voxelData, stateData);
          this._3dArray.setValueUseObj(this.pos, rawVoxelStateData, stateData);
          this._3dArray.setValueUseObj(this.pos, rawVoxelData, data); */
    },
    build(x, y, z) {
        if (!this.voxelData || !this.voxelStateData) {
            throw new Error(`No entity has began construction`);
        }
        DVEW.ccm.tasks.build.entity(x, y, z, this.width, this.depth, this.height, this.composed, this.voxelData, this.voxelStateData);
        this.voxelData = null;
        this.voxelStateData = null;
    },
};
