import type { VoxelMesherDataTool } from "../../Tools/VoxelMesherDataTool";
import type { DirectionNames } from "Meta";

import { OverrideManager } from "../../Rules/Overrides/OverridesManager.js";
import { FaceNormals } from "../../../../Data/Constants/Util/Faces.js";
import { LightData } from "../../../../Data/Light/LightByte.js";
import { Vertexes } from "../../Types/Builder.data.types";

const LD = LightData;

const RGBvertexStates = {
 1: {
  totalZero: false,
  value: 0,
 },
 2: {
  totalZero: false,
  value: 0,
 },
 3: {
  totalZero: false,
  value: 0,
 },
 4: {
  totalZero: false,
  value: 0,
 },
};

const sunVertexStates = {
 1: {
  totalZero: false,
  value: 0,
 },
 2: {
  totalZero: false,
  value: 0,
 },
 3: {
  totalZero: false,
  value: 0,
 },
 4: {
  totalZero: false,
  value: 0,
 },
};

const AOVerotexStates = {
 1: {
  totalLight: false,
  value: 1,
 },
 2: {
  totalLight: false,
  value: 1,
 },
 3: {
  totalLight: false,
  value: 1,
 },
 4: {
  totalLight: false,
  value: 1,
 },
};

const swapSun = () => {
 let v1 = LD.getS(RGBvertexStates[1].value);
 let v2 = LD.getS(RGBvertexStates[2].value);
 let v3 = LD.getS(RGBvertexStates[3].value);
 let v4 = LD.getS(RGBvertexStates[4].value);

 RGBvertexStates[1].value = LD.setS(v1, RGBvertexStates[1].value);
 RGBvertexStates[2].value = LD.setS(v4, RGBvertexStates[2].value);
 RGBvertexStates[3].value = LD.setS(v3, RGBvertexStates[3].value);
 RGBvertexStates[4].value = LD.setS(v2, RGBvertexStates[4].value);
};

const swapRGB = () => {
 let v1 = LD.getRGB(RGBvertexStates[1].value);
 let v2 = LD.getRGB(RGBvertexStates[2].value);
 let v3 = LD.getRGB(RGBvertexStates[3].value);
 let v4 = LD.getRGB(RGBvertexStates[4].value);

 RGBvertexStates[2].value = LD.setRGB(v4, RGBvertexStates[2].value);
 RGBvertexStates[1].value = LD.setRGB(v1, RGBvertexStates[1].value);
 RGBvertexStates[4].value = LD.setRGB(v2, RGBvertexStates[4].value);
 RGBvertexStates[3].value = LD.setRGB(v3, RGBvertexStates[3].value);
};

const swapAO = () => {
 let v1 = AOVerotexStates[1].value;
 let v2 = AOVerotexStates[2].value;
 let v3 = AOVerotexStates[3].value;
 let v4 = AOVerotexStates[4].value;

 AOVerotexStates[1].value = v1;
 AOVerotexStates[2].value = v2;
 AOVerotexStates[3].value = v3;
 AOVerotexStates[4].value = v4;
};

const shouldRGBFlip = () => {
 let t1 =
  !RGBvertexStates[1].totalZero &&
  RGBvertexStates[2].totalZero &&
  RGBvertexStates[3].totalZero &&
  RGBvertexStates[4].totalZero;
 let t2 =
  RGBvertexStates[1].totalZero &&
  RGBvertexStates[2].totalZero &&
  !RGBvertexStates[3].totalZero &&
  RGBvertexStates[4].totalZero;
 let t3 =
  !RGBvertexStates[1].totalZero &&
  RGBvertexStates[2].totalZero &&
  !RGBvertexStates[3].totalZero &&
  RGBvertexStates[4].totalZero;

 return t1 || t2 || t3;
};

const shouldSunFlip = () => {
 if (LightGradient.settings.doSun) return false;
 let t1 =
  !sunVertexStates[1].totalZero &&
  sunVertexStates[2].totalZero &&
  sunVertexStates[3].totalZero &&
  sunVertexStates[4].totalZero;
 let t2 =
  sunVertexStates[1].totalZero &&
  sunVertexStates[2].totalZero &&
  !sunVertexStates[3].totalZero &&
  sunVertexStates[4].totalZero;
 let t3 =
  !sunVertexStates[1].totalZero &&
  sunVertexStates[2].totalZero &&
  !sunVertexStates[3].totalZero &&
  sunVertexStates[4].totalZero;

 return t1 || t2 || t3;
};

const shouldAOFlip = (face: DirectionNames) => {
 if (LightGradient.settings.doAO) return false;
 LightGradient.tool.faceDataOverride.face = face;
 LightGradient.tool.faceDataOverride.default = false;

 if (
  OverrideManager.runOverride(
   "AOFlipFace",
   LightGradient.tool.voxel.getShapeId(),
   "Any",
   LightGradient.tool.faceDataOverride
  )
 ) {
  return false;
 }

 let check = false;
 if (!states.ignoreAO) {
  let t1 =
   !AOVerotexStates[1].totalLight &&
   AOVerotexStates[2].totalLight &&
   AOVerotexStates[3].totalLight &&
   AOVerotexStates[4].totalLight;
  let t2 =
   AOVerotexStates[1].totalLight &&
   AOVerotexStates[2].totalLight &&
   !AOVerotexStates[3].totalLight &&
   AOVerotexStates[4].totalLight;
  let t3 =
   !AOVerotexStates[1].totalLight &&
   AOVerotexStates[2].totalLight &&
   !AOVerotexStates[3].totalLight &&
   AOVerotexStates[4].totalLight;

  check = t1 || t2 || t3;
 }
 return check;
};

const flipCheck = (face: DirectionNames) => {
 const rgbFlip = shouldRGBFlip();
 const sunFlip = shouldSunFlip();

 if (rgbFlip && !sunFlip) {
  swapSun();
 }
 if (!rgbFlip && sunFlip) {
  swapRGB();
 }

 const aoFlip = shouldAOFlip(face);

 if ((sunFlip || rgbFlip) && !aoFlip) {
  swapAO();
 }

 if (!sunFlip && aoFlip) {
  swapSun();
 }
 if (!rgbFlip && aoFlip) {
  swapRGB();
 }

 return rgbFlip || sunFlip || aoFlip;
};

const checkSets: Record<DirectionNames, Record<Vertexes, number[]>> = {
 top: {
  1: [-1, 1, 0, 0, 1, -1, -1, 1, -1],
  2: [-1, 1, 0, 0, 1, 1, -1, 1, 1],
  3: [1, 1, 0, 0, 1, 1, 1, 1, 1],
  4: [1, 1, 0, 0, 1, -1, 1, 1, -1],
 },
 bottom: {
  1: [0, -1, -1, -1, -1, 0, -1, -1, -1],
  2: [0, -1, -1, 1, -1, 0, 1, -1, -1],
  3: [0, -1, 1, 1, -1, 0, 1, -1, 1],
  4: [0, -1, 1, -1, -1, 0, -1, -1, 1],
 },
 east: {
  1: [1, 0, -1, 1, 1, 0, 1, 1, -1],
  2: [1, 0, 1, 1, 1, 0, 1, 1, 1],
  3: [1, 0, 1, 1, -1, 0, 1, -1, 1],
  4: [1, 0, -1, 1, -1, 0, 1, -1, -1],
 },
 west: {
  1: [-1, 0, 1, -1, 1, 0, -1, 1, 1],
  2: [-1, 0, -1, -1, 1, 0, -1, 1, -1],
  3: [-1, 0, -1, -1, -1, 0, -1, -1, -1],
  4: [-1, 0, 1, -1, -1, 0, -1, -1, 1],
 },
 south: {
  1: [-1, 0, -1, 0, 1, -1, -1, 1, -1],
  2: [1, 0, -1, 0, 1, -1, 1, 1, -1],
  3: [1, 0, -1, 0, -1, -1, 1, -1, -1],
  4: [-1, 0, -1, 0, -1, -1, -1, -1, -1],
 },
 north: {
  1: [1, 0, 1, 0, 1, 1, 1, 1, 1],
  2: [-1, 0, 1, 0, 1, 1, -1, 1, 1],
  3: [-1, 0, 1, 0, -1, 1, -1, -1, 1],
  4: [1, 0, 1, 0, -1, 1, 1, -1, 1],
 },
};
const states = { ignoreAO: false };
const newRGBValues: number[] = [];
const zeroCheck = { s: 0, r: 0, g: 0, b: 0 };

const RGBValues = { r: 0, g: 0, b: 0 };
const sunValues = { s: 0 };
const nlValues = { s: 0, r: 0, g: 0, b: 0 };
const AOValues = { a: 0 };

export const LightGradient = {
 tool: <VoxelMesherDataTool>{},
 settings: {
  doAO: true,
  doRGB: true,
  doSun: true,
 },

 calculate(
  face: DirectionNames,
  tool: VoxelMesherDataTool,
  ignoreAO?: boolean
 ) {
  this.tool = tool;
  const voxelSubstance = tool.voxel.getSubstance();
  const isLightSource = tool.voxel.isLightSource();

  let light = tool.voxel.getLight();
  let aoValue = -1;

  if (this.settings.doAO && !ignoreAO) {
   AOVerotexStates[1].value = 1;
   AOVerotexStates[2].value = 1;
   AOVerotexStates[3].value = 1;
   AOVerotexStates[4].value = 1;
   AOVerotexStates[1].totalLight = true;
   AOVerotexStates[2].totalLight = true;
   AOVerotexStates[3].totalLight = true;
   AOVerotexStates[4].totalLight = true;
   states.ignoreAO = false;
  } else {
   states.ignoreAO = true;
  }

  const faceNormal = FaceNormals[face];
  tool.nVoxel.loadInAt(
   tool.voxel.x + faceNormal[0],
   tool.voxel.y + faceNormal[1],
   tool.voxel.z + faceNormal[2]
  );

  light = tool.nVoxel.getLight();
  if (light < 0) {
   if (tool.voxel.getLight() >= 0) {
    light = tool.voxel.getLight();
   } else {
    light = 0;
   }
  }
  if (tool.nVoxel.isRenderable()) {
   tool.faceDataOverride.default = false;
   if (
    OverrideManager.runOverride(
     "DarkenFaceUnderneath",
     tool.nVoxel.getShapeId(),
     "All",
     tool.faceDataOverride
    )
   ) {
    aoValue = 0.8;
   }
  }

  for (let vertex: Vertexes = <Vertexes>1; vertex <= 4; vertex++) {
   const checkSet = checkSets[face][vertex];

   if (LightGradient.settings.doRGB || LightGradient.settings.doSun) {
    const values = LD.getLightValues(light);
    if (LightGradient.settings.doSun) {
     sunValues.s = values[0];
     if (sunValues.s == 0) zeroCheck.s++;
    }
    if (LightGradient.settings.doRGB) {
     RGBValues.r = values[1];
     if (RGBValues.r == 0) zeroCheck.r++;
     RGBValues.g = values[2];
     if (RGBValues.g == 0) zeroCheck.g++;
     RGBValues.b = values[3];
     if (RGBValues.b == 0) zeroCheck.b++;
    }
   }

   if (!states.ignoreAO) {
    AOValues.a = 1;
   }

   for (let i = 0; i < 9; i += 3) {
    const cx = checkSet[i] + tool.voxel.x;
    const cy = checkSet[i + 1] + tool.voxel.y;
    const cz = checkSet[i + 2] + tool.voxel.z;

    if (this.settings.doRGB || LightGradient.settings.doSun) {
     if (!this.tool.nVoxel.loadInAt(cx, cy, cz)) continue;

     const nl = this.tool.nVoxel.getLight();
     if (nl != -1) {
      const values = LD.getLightValues(nl);
      nlValues.s = values[0];
      nlValues.r = values[1];
      nlValues.g = values[2];
      nlValues.b = values[3];

      doRGB: if (this.settings.doRGB) {
       if (nlValues.r == 0) zeroCheck.r++;
       if (nlValues.g == 0) zeroCheck.g++;
       if (nlValues.b == 0) zeroCheck.b++;
       if (!LD.removeS(nl)) break doRGB;
       if (nlValues.r > RGBValues.r && RGBValues.r < 15) {
        RGBValues.r++;
       }

       if (nlValues.g > RGBValues.g && RGBValues.g < 15) {
        RGBValues.g++;
       }

       if (nlValues.b > RGBValues.b && RGBValues.b < 15) {
        RGBValues.b++;
       }
      }
      doSun: if (this.settings.doSun) {
       if (nlValues.s == 0) zeroCheck.s++;
       if (!LD.getS(nl)) break doSun;
       if (sunValues.s < nlValues.s && sunValues.s < 15) {
        sunValues.s += LD.SRS;
       }
      }
     }
    }
    /*
    Do AO
    */
    doAO: if (!states.ignoreAO) {
     if (aoValue > 0) {
      AOVerotexStates[vertex].totalLight = false;
      AOValues.a *= aoValue;
      break doAO;
     }

     if (!LightGradient.tool.nVoxel.isRenderable()) break doAO;
     const neighborVoxelSubstance = LightGradient.tool.nVoxel.getSubstance();

     let finalResult = false;
     let substanceRuleResult = true;

     if (
      voxelSubstance == "#dve_transparent" ||
      voxelSubstance == "#dve_solid"
     ) {
      if (
       neighborVoxelSubstance != "#dve_solid" &&
       neighborVoxelSubstance != "#dve_transparent"
      ) {
       substanceRuleResult = false;
      }
     } else {
      if (neighborVoxelSubstance !== voxelSubstance) {
       substanceRuleResult = false;
      }
     }

     const neightLightSource = LightGradient.tool.nVoxel.isLightSource();
     if (isLightSource || neightLightSource) {
      substanceRuleResult = false;
     }

     LightGradient.tool.faceDataOverride.face = face;
     LightGradient.tool.faceDataOverride.default = substanceRuleResult;

     finalResult = OverrideManager.runOverride(
      "AO",
      LightGradient.tool.voxel.getShapeId(),
      LightGradient.tool.nVoxel.getShapeId(),
      LightGradient.tool.faceDataOverride
     );

     if (finalResult) {
      AOVerotexStates[vertex].totalLight = false;
      AOValues.a *= 0.65;
     }
    }
   }

   /*
   Light End
   */
   if (this.settings.doSun || this.settings.doRGB) {
    let zeroTolerance = 2;
    let totalZero = true;
    if (zeroCheck.s >= zeroTolerance) {
     sunVertexStates[vertex].totalZero = true;

     newRGBValues[0] = 0;
    } else {
     sunVertexStates[vertex].totalZero = false;
     newRGBValues[0] = sunValues.s;
    }
    if (zeroCheck.r >= zeroTolerance) {
     newRGBValues[1] = 0;
    } else {
     totalZero = false;
     newRGBValues[1] = RGBValues.r;
    }
    if (zeroCheck.g >= zeroTolerance) {
     newRGBValues[2] = 0;
    } else {
     totalZero = false;
     newRGBValues[2] = RGBValues.g;
    }
    if (zeroCheck.b >= zeroTolerance) {
     newRGBValues[3] = 0;
    } else {
     totalZero = false;
     newRGBValues[3] = RGBValues.b;
    }

    const returnValue = LD.setLightValues(newRGBValues);
    RGBvertexStates[vertex].totalZero = totalZero;
    RGBvertexStates[vertex].value = returnValue;
    zeroCheck.s = 0;
    zeroCheck.r = 0;
    zeroCheck.b = 0;
    zeroCheck.g = 0;
   }
   /*
   AO End
   */
   if (LightGradient.settings.doAO) {
    AOVerotexStates[vertex].value = AOValues.a;
   }
  }

  if (flipCheck(face)) {
   LightGradient.tool
    .setFaceFlipped(true)
    .setLight(
     RGBvertexStates[2].value,
     RGBvertexStates[1].value,
     RGBvertexStates[4].value,
     RGBvertexStates[3].value
    );
   if (!states.ignoreAO) {
    LightGradient.tool.setAO(
     AOVerotexStates[4].value,
     AOVerotexStates[1].value,
     AOVerotexStates[2].value,
     AOVerotexStates[3].value
    );
   }
  } else {
   LightGradient.tool
    .setFaceFlipped(false)
    .setLight(
     RGBvertexStates[1].value,
     RGBvertexStates[2].value,
     RGBvertexStates[3].value,
     RGBvertexStates[4].value
    );
   if (!states.ignoreAO) {
    LightGradient.tool.setAO(
     AOVerotexStates[1].value,
     AOVerotexStates[2].value,
     AOVerotexStates[3].value,
     AOVerotexStates[4].value
    );
   }
  }
 },
};
