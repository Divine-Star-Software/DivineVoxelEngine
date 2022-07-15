import type { VoxelConstructorObject } from "../../../../../out/Meta/index.js";
import { DreamLampVoxelData } from "./DreamLamp.voxel.data.js";

export const DreamLampVoxelBuilderThread: VoxelConstructorObject = {
 data: DreamLampVoxelData,
 trueShapeId: 1,
 hooks: {},
 process:function (data, DVEB)  {
    const uv = DVEB.textureManager.getTextureUV(
        "solid",
        "dreamlamp"
       );
       if (data.exposedFaces[0]) {
        data.uvTemplate.push(uv);
        data.overlayUVTemplate.push(0,0,0,0);
    }
       if (data.exposedFaces[1]) {
        data.uvTemplate.push(uv);
        data.overlayUVTemplate.push(0,0,0,0);
    }
       if (data.exposedFaces[2]) {
        data.uvTemplate.push(uv);
        data.overlayUVTemplate.push(0,0,0,0);
    }
       if (data.exposedFaces[3]) {
        data.uvTemplate.push(uv);
        data.overlayUVTemplate.push(0,0,0,0);
    }
       if (data.exposedFaces[4]) {
        data.uvTemplate.push(uv);
        data.overlayUVTemplate.push(0,0,0,0);
    }
       if (data.exposedFaces[5]) {
        data.uvTemplate.push(uv);
        data.overlayUVTemplate.push(0,0,0,0);
    }
  
       DVEB.processor.processVoxelLight(data);
 },
};
