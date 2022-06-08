import type { IlluminationManager } from "../IlluminationManager";
import { DVEC } from "../../../DivineVoxelEngineConstructor.js";
import { DVEP } from "../../DivineVoxelEngineWorldPropagation.js";
export function runSunLightRemoveAt(
 this: typeof IlluminationManager,
 x: number,
 y: number,
 z: number
) {
 this._sunLightRemoveQue.push([x, y, z]);
 this.runSunLightRemove();
}
export function runSunLightRemove(this: typeof IlluminationManager) {
 while (this._sunLightRemoveQue.length != 0) {
  const node = this._sunLightRemoveQue.shift();
  if (!node) {
   break;
  }

  const x = node[0];
  const y = node[1];
  const z = node[2];
  const sl = DVEC.voxelHelper.getLight(x, y, z);

  const n1 = DVEC.voxelHelper.getLight(x - 1, y, z);
  if (n1 > 0 && this.lightByte.isLessThanForSunRemove(n1, sl)) {
   this._sunLightRemoveQue.push([x - 1, y, z]);
  } else {
   if (n1 > 0) {
    if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
     this._sunLightUpdateQue.push([x - 1, y, z]);
    }
   }
  }

  const n2 = DVEC.voxelHelper.getLight(x + 1, y, z);
  if (n2 > 0 && this.lightByte.isLessThanForSunRemove(n2, sl)) {
   this._sunLightRemoveQue.push([x + 1, y, z]);
  } else {
   if (n2 > 0) {
    if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
     this._sunLightUpdateQue.push([x + 1, y, z]);
    }
   }
  }

  const n3 = DVEC.voxelHelper.getLight(x, y, z - 1);
  if (n3 > 0 && this.lightByte.isLessThanForSunRemove(n3, sl)) {
   this._sunLightRemoveQue.push([x, y, z - 1]);
  } else {
   if (n3 > 0) {
    if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
     this._sunLightUpdateQue.push([x, y, z - 1]);
    }
   }
  }

  const n4 = DVEC.voxelHelper.getLight(x, y, z + 1);
  if (n4 > 0 && this.lightByte.isLessThanForSunRemove(n4, sl)) {
   this._sunLightRemoveQue.push([x, y, z + 1]);
  } else {
   if (n4 > 0) {
    if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
     this._sunLightUpdateQue.push([x, y, z + 1]);
    }
   }
  }

  const n5 = DVEC.voxelHelper.getLight(x, y - 1, z);
  if (n5 > 0 && this.lightByte.sunLightCompareForDownSunRemove(n5, sl)) {
   this._sunLightRemoveQue.push([x, y - 1, z]);
  } else {
   if (n5 > 0) {
    if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
     this._sunLightUpdateQue.push([x, y - 1, z]);
    }
   }
  }

  const n6 = DVEC.voxelHelper.getLight(x, y + 1, z);
  if (n6 > 0 && this.lightByte.isLessThanForSunRemove(n6, sl)) {
   this._sunLightRemoveQue.push([x, y + 1, z]);
  } else {
   if (n6 > 0) {
    if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
     this._sunLightUpdateQue.push([x, y + 1, z]);
    }
   }
  }
  DVEC.voxelHelper.setLight(x, y, z, this.lightByte.removeSunLight(sl));
 }
 this.runSunLightUpdate();
}

export function SunLightAboveCheck(
 this: typeof IlluminationManager,
 sl: number,
 x: number,
 y: number,
 z: number
) {
 const nl = DVEC.voxelHelper.getLight(x, y + 1, z);
 if (nl == -1) return false;
 const sunLevel = this.lightByte.getS(nl);
 if (sunLevel == 0xf) {
  const newLight = this.lightByte.setS(0xf, sl);
  DVEC.voxelHelper.setLight(x, y, z, newLight);
  return true;
 }
 return false;
}

export function runSunLightUpdate(this: typeof IlluminationManager) {
 while (this._sunLightUpdateQue.length != 0) {
  const node = this._sunLightUpdateQue.shift();
  if (!node) {
   break;
  }
  const x = node[0];
  const y = node[1];
  const z = node[2];
  const sl = DVEC.voxelHelper.getLight(x, y, z);
  if (sl == 0) continue;

  const n1 = DVEC.voxelHelper.getLight(x - 1, y, z);
  if (n1 > -1 && this.lightByte.isLessThanForSunAdd(n1, sl)) {
   this._sunLightUpdateQue.push([x - 1, y, z]);
   DVEC.voxelHelper.setLight(
    x - 1,
    y,
    z,
    this.lightByte.getMinusOneForSun(sl, n1)
   );
  }

  const n2 = DVEC.voxelHelper.getLight(x + 1, y, z);
  if (n2 > -1 && this.lightByte.isLessThanForSunAdd(n2, sl)) {
   this._sunLightUpdateQue.push([x + 1, y, z]);
   DVEC.voxelHelper.setLight(
    x + 1,
    y,
    z,
    this.lightByte.getMinusOneForSun(sl, n2)
   );
  }

  const n3 = DVEC.voxelHelper.getLight(x, y, z - 1);
  if (n3 > -1 && this.lightByte.isLessThanForSunAdd(n3, sl)) {
   this._sunLightUpdateQue.push([x, y, z - 1]);
   DVEC.voxelHelper.setLight(
    x,
    y,
    z - 1,
    this.lightByte.getMinusOneForSun(sl, n3)
   );
  }

  const n4 = DVEC.voxelHelper.getLight(x, y, z + 1);
  if (n4 > -1 && this.lightByte.isLessThanForSunAdd(n4, sl)) {
   this._sunLightUpdateQue.push([x, y, z + 1]);
   DVEC.voxelHelper.setLight(
    x,
    y,
    z + 1,
    this.lightByte.getMinusOneForSun(sl, n4)
   );
  }

  const n5 = DVEC.voxelHelper.getLight(x, y - 1, z);
  if (n5 > -1 && this.lightByte.isLessThanForSunAddDown(n5, sl)) {
   const voxelData = DVEC.worldMatrix.getVoxel(x, y - 1, z);
   if (!voxelData || voxelData[0] == "dve:air") {
    this._sunLightUpdateQue.push([x, y - 1, z]);
    DVEC.voxelHelper.setLight(
     x,
     y - 1,
     z,
     this.lightByte.getSunLightForUnderVoxel(sl, n5)
    );
   } else {
    const voxel = DVEC.voxelManager.getVoxel(voxelData[0]).data;
    if (voxel.substance == "solid") {
     this._sunLightUpdateQue.push([x, y - 1, z]);
     DVEC.voxelHelper.setLight(
      x,
      y - 1,
      z,
      this.lightByte.getSunLightForUnderVoxel(sl, n5)
     );
    }
    if (voxel.substance == "flora" || voxel.substance == "fluid") {
     this._sunLightUpdateQue.push([x, y - 1, z]);
     DVEC.voxelHelper.setLight(
      x,
      y - 1,
      z,
      this.lightByte.getMinusOneForSun(sl, n5)
     );
    }
   }
  }

  const n6 = DVEC.voxelHelper.getLight(x, y + 1, z);
  if (n6 > -1 && this.lightByte.isLessThanForSunAddUp(n6, sl)) {
   this._sunLightUpdateQue.push([x, y + 1, z]);
   DVEC.voxelHelper.setLight(
    x,
    y + 1,
    z,
    this.lightByte.getMinusOneForSun(sl, n6)
   );
  }
 }
 this._visitSunMap = {};
}

export function runSunLightUpdateAt(
 this: typeof IlluminationManager,
 x: number,
 y: number,
 z: number
) {
 this._sunLightUpdateQue.push([x, y, z]);
 this.runSunLightUpdate();
}

export function PopulateWorldColumnWithSunLight(
 x: number,
 z: number,
 maxY: number
) {
 for (let ix = x; ix < x + DVEC.worldBounds.chunkXSize; ix++) {
  for (let iz = z; iz < z + DVEC.worldBounds.chunkZSize; iz++) {
   let iy = maxY;
   let worldY = DVEC.worldBounds.bounds.MaxY;
   while (iy <= worldY) {
    DVEC.voxelHelper.setFullSun(ix, iy, iz);
    iy++;
   }
  }
 }
}

export function RunSunLightUpdateAtMaxY(
 this: typeof IlluminationManager,
 x: number,
 z: number,
 maxY: number
) {
 for (let ix = x; ix < x + DVEC.worldBounds.chunkXSize; ix++) {
  for (let iz = z; iz < z + DVEC.worldBounds.chunkZSize; iz++) {
   this._sunLightUpdateQue.push([ix, maxY, iz]);
  }
 }
 this.runSunLightUpdate();
}
