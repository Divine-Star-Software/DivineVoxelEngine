//types
import type { IlluminationManager } from "../IlluminationManager";
import type { Position3Matrix } from "Meta/Util.types";
//objects
import { DVEC } from "../../../DivineVoxelEngineConstructor.js";
import { DVEP } from "../../DivineVoxelEnginePropagation.js";

export function runRGBFloodFill(this: typeof IlluminationManager) {
 while (this._RGBlightUpdateQue.length != 0) {
  const node = this._RGBlightUpdateQue.shift();
  if (!node) {
   break;
  }
  const x = node[0];
  const y = node[1];
  const z = node[2];
  const sl = DVEC.worldMatrix.getLight(x, y, z);
  if(sl == -1) continue;

  const n1 = DVEC.worldMatrix.getLight(x - 1, y, z);
  if (n1 > -1 && this.lightByte.isLessThanForRGBAdd(n1, sl)) {
   this._RGBlightUpdateQue.push([x - 1, y, z]);
   DVEC.worldMatrix.setLight(
    x - 1,
    y,
    z,
    this.lightByte.getMinusOneForRGB(sl, n1)
   );
   DVEP.addToRebuildQue(x - 1, y, z, "all");
  }

  const n2 = DVEC.worldMatrix.getLight(x + 1, y, z);
  if (n2 > -1 && this.lightByte.isLessThanForRGBAdd(n2, sl)) {
   this._RGBlightUpdateQue.push([x + 1, y, z]);
   DVEC.worldMatrix.setLight(
    x + 1,
    y,
    z,
    this.lightByte.getMinusOneForRGB(sl, n2)
   );
   DVEP.addToRebuildQue(x + 1, y, z, "all");
  }

  const n3 = DVEC.worldMatrix.getLight(x, y, z - 1);
  if (n3 > -1 && this.lightByte.isLessThanForRGBAdd(n3, sl)) {
   this._RGBlightUpdateQue.push([x, y, z - 1]);
   DVEC.worldMatrix.setLight(
    x,
    y,
    z - 1,
    this.lightByte.getMinusOneForRGB(sl, n3)
   );
   DVEP.addToRebuildQue(x, y, z - 1, "all");
  }

  const n4 = DVEC.worldMatrix.getLight(x, y, z + 1);
  if (n4 > -1 && this.lightByte.isLessThanForRGBAdd(n4, sl)) {
   this._RGBlightUpdateQue.push([x, y, z + 1]);
   DVEC.worldMatrix.setLight(
    x,
    y,
    z + 1,
    this.lightByte.getMinusOneForRGB(sl, n4)
   );
   DVEP.addToRebuildQue(x, y, z + 1, "all");
  }

  const n5 = DVEC.worldMatrix.getLight(x, y - 1, z);
  if (n5 > -1 && this.lightByte.isLessThanForRGBAdd(n5, sl)) {
   this._RGBlightUpdateQue.push([x, y - 1, z]);
   DVEC.worldMatrix.setLight(
    x,
    y - 1,
    z,
    this.lightByte.getMinusOneForRGB(sl, n5)
   );
   DVEP.addToRebuildQue(x, y - 1, z, "all");
  }

  const n6 = DVEC.worldMatrix.getLight(x, y + 1, z);
  if (n6 > -1 && this.lightByte.isLessThanForRGBAdd(n6, sl)) {
   this._RGBlightUpdateQue.push([x, y + 1, z]);
   DVEC.worldMatrix.setLight(
    x,
    y + 1,
    z,
    this.lightByte.getMinusOneForRGB(sl, n6)
   );
   DVEP.addToRebuildQue(x, y + 1, z, "all");
  }
 }
}

export function runRGBFloodFillAt(
 this: typeof IlluminationManager,
 x: number,
 y: number,
 z: number
) {
 this._RGBlightUpdateQue.push([x, y, z]);

 this.runRGBFloodFill();
}

export function runRGBFloodRemoveAt(
 this: typeof IlluminationManager,
 removeVoxel: boolean,
 x: number,
 y: number,
 z: number
) {
 this._RGBlightRemovalQue.push([x, y, z]);
 if (removeVoxel) {
  this.runRGBFloodRemove({ x: x, y: y, z: z });
 } else {
  this.runRGBFloodRemove();
 }
}
export function runRGBFloodRemove(
 this: typeof IlluminationManager,
 lightSource?: Position3Matrix
) {
 while (this._RGBlightRemovalQue.length != 0) {
  const node = this._RGBlightRemovalQue.shift();
  if (!node) {
   break;
  }

  const x = node[0];
  const y = node[1];
  const z = node[2];
  const sl = DVEC.worldMatrix.getLight(x, y, z);

  const n1 = DVEC.worldMatrix.getLight(x - 1, y, z);
  const n1HasRGB = this.lightByte.hasRGBLight(n1);
  if (n1HasRGB && this.lightByte.isLessThanForRGBRemove(n1, sl)) {
   this._RGBlightRemovalQue.push([x - 1, y, z]);
  } else {
   if (n1HasRGB) {
    if (!this._visitMap[`${x - 1}-${y}-${z}`]) {
     if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n1, sl)) {
      this._RGBlightUpdateQue.push([x - 1, y, z]);
      this._visitMap[`${x - 1}-${y}-${z}`] = true;
     }
    }
   }
  }

  const n2 = DVEC.worldMatrix.getLight(x + 1, y, z);
  const n2HasRGB = this.lightByte.hasRGBLight(n2);
  if (n2HasRGB && this.lightByte.isLessThanForRGBRemove(n2, sl)) {
   this._RGBlightRemovalQue.push([x + 1, y, z]);
  } else {
   if (n2HasRGB) {
    if (!this._visitMap[`${x + 1}-${y}-${z}`]) {
     if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n2, sl)) {
      this._RGBlightUpdateQue.push([x + 1, y, z]);
      this._visitMap[`${x + 1}-${y}-${z}`] = true;
     }
    }
   }
  }

  const n3 = DVEC.worldMatrix.getLight(x, y, z - 1);
  const n3HasRGB = this.lightByte.hasRGBLight(n3);
  if (n3HasRGB && this.lightByte.isLessThanForRGBRemove(n3, sl)) {
   this._RGBlightRemovalQue.push([x, y, z - 1]);
  } else {
   if (n3HasRGB) {
    if (!this._visitMap[`${x}-${y}-${z - 1}`]) {
     if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n3, sl)) {
      this._RGBlightUpdateQue.push([x, y, z - 1]);
      this._visitMap[`${x}-${y}-${z - 1}`] = true;
     }
    }
   }
  }

  const n4 = DVEC.worldMatrix.getLight(x, y, z + 1);
  const n4HasRGB = this.lightByte.hasRGBLight(n4);
  if (n4HasRGB && this.lightByte.isLessThanForRGBRemove(n4, sl)) {
   this._RGBlightRemovalQue.push([x, y, z + 1]);
  } else {
   if (n4HasRGB) {
    if (!this._visitMap[`${x}-${y}-${z + 1}`]) {
     if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n4, sl)) {
      this._RGBlightUpdateQue.push([x, y, z + 1]);
      this._visitMap[`${x}-${y}-${z + 1}`] = true;
     }
    }
   }
  }

  const n5 = DVEC.worldMatrix.getLight(x, y - 1, z);
  const n5HasRGB = this.lightByte.hasRGBLight(n5);
  if (n5HasRGB && this.lightByte.isLessThanForRGBRemove(n5, sl)) {
   this._RGBlightRemovalQue.push([x, y - 1, z]);
  } else {
   if (n5HasRGB) {
    if (!this._visitMap[`${x}-${y - 1}-${z}`]) {
     if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n5, sl)) {
      this._RGBlightUpdateQue.push([x, y - 1, z]);
      this._visitMap[`${x}-${y - 1}-${z}`] = true;
     }
    }
   }
  }

  const n6 = DVEC.worldMatrix.getLight(x, y + 1, z);
  const n6HasRGB = this.lightByte.hasRGBLight(n6);
  if (n6HasRGB && this.lightByte.isLessThanForRGBRemove(n6, sl)) {
   this._RGBlightRemovalQue.push([x, y + 1, z]);
  } else {
   if (n6HasRGB) {
    if (!this._visitMap[`${x}-${y + 1}-${z}`]) {
     if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n6, sl)) {
      this._RGBlightUpdateQue.push([x, y + 1, z]);
      this._visitMap[`${x}-${y + 1}-${z}`] = true;
     }
    }
   }
  }
  const nl = this.lightByte.removeRGBLight(sl);
  DVEC.worldMatrix.setLight(x, y, z, nl);
  DVEP.addToRebuildQue(x, y, z, "all");
 }

 if (lightSource) {
  const voxelData = DVEC.worldMatrix.getVoxelData(
   lightSource.x,
   lightSource.y,
   lightSource.z
  );

  if (!voxelData) {
   DVEC.worldMatrix.setData(
    lightSource.x,
    lightSource.y,
    lightSource.z,
    DVEC.UTIL.getVoxelByte().setId(1, 0)
   );
  } else {
   if (voxelData.lightSource) {
    DVEC.worldMatrix.setAir(lightSource.x, lightSource.y, lightSource.z, 0);
   }
  }

  const l = DVEC.worldMatrix.getLight(
   lightSource.x,
   lightSource.y,
   lightSource.z
  );
  this._RGBlightUpdateQue.push([lightSource.x, lightSource.y, lightSource.z]);
 }
 this._visitMap = {};

 this.runRGBFloodFill();
}
