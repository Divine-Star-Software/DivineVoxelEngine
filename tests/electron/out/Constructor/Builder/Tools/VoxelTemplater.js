//objects
import { Processor } from "../Processor/Processor.js";
import { FaceRecord } from "../../../Data/Constants/Util/Faces.js";
class VoxelTemplaterBase {
    _template = {};
    _faces = 0;
    currentVoxel = {};
    utilDataTool = {};
    addUV(index, forNumFaces = 1) {
        while (forNumFaces--) {
            this._template.uvTemplate.push(index);
        }
        return this;
    }
    addOverlayUVs(index, forNumFaces = 1) {
        if (index.length == 1) {
            while (forNumFaces--) {
                this._template.overlayUVTemplate.push(index[0], index[0], index[0], index[0]);
            }
            return this;
        }
        while (forNumFaces--) {
            this._template.overlayUVTemplate.push(...index);
        }
        return this;
    }
    addAOValue(value, forNumFaces = 1) {
        while (forNumFaces--) {
            this._template.aoTemplate.push(value);
        }
        return this;
    }
    addLightValue(value, forNumFaces = 1) {
        while (forNumFaces--) {
            this._template.lightTemplate.push(value);
        }
        return this;
    }
    addCurrentLightValue(forNumFaces = 1) {
        const l = this.currentVoxel.getLight();
        while (forNumFaces--) {
            this._template.lightTemplate.push(l);
        }
        return this;
    }
    setTextureRotation(face, rotation) {
        Processor.textureRotation[FaceRecord[face]] = rotation;
        return this;
    }
    isFaceExpposed(face) {
        return Processor.exposedFaces[FaceRecord[face]] == 1;
    }
    processVoxelLight(ignoreAO = false) {
        Processor.doVoxelLight(this._template, this.currentVoxel.x, this.currentVoxel.y, this.currentVoxel.z, ignoreAO, Processor.LOD);
        return this;
    }
}
export const VoxelTemplater = new VoxelTemplaterBase();
