//data
import { WorldBounds } from "../../../../Data/World/WorldBounds.js";
import { WorldRegister } from "../../../../Data/World/WorldRegister.js";
import { $3dCardinalNeighbors } from "../../../../Data/Constants/Util/CardinalNeighbors.js";
const inColumnBounds = (cx, cz, x, z) => {
    if (x >= cx &&
        x <= cx + WorldBounds.chunkXSize &&
        z >= cz &&
        z <= cz + WorldBounds.chunkXSize)
        return true;
    return false;
};
export function RunWorldSun(data) {
    const dimension = data[0];
    const cx = data[1];
    const cz = data[2];
    const cy = data[3];
    if (!WorldRegister.column.get(dimension, cx, cz, cy))
        return false;
    const RmaxY = WorldRegister.column.height.getRelative(dimension, cx, cz, cy);
    const AmaxY = WorldRegister.column.height.getAbsolute(dimension, cx, cz, cy);
    for (let ix = cx; ix < cx + WorldBounds.chunkXSize; ix++) {
        for (let iz = cz; iz < cz + WorldBounds.chunkZSize; iz++) {
            for (let iy = AmaxY; iy < WorldBounds.bounds.MaxY; iy++) {
                if (!this._sDataTool.loadIn(ix, iy, iz))
                    continue;
                const l = this._sDataTool.getLight();
                if (l < 0)
                    continue;
                this._sDataTool.setLight(this.lightData.setS(0xf, l)).commit();
                /*  if (iy <= RmaxY) {
                   this._worldSunQueue.push([ix, iy, iz]);
                  } */
            }
        }
    }
    for (let ix = cx; ix < cx + WorldBounds.chunkXSize; ix++) {
        for (let iz = cz; iz < cz + WorldBounds.chunkZSize; iz++) {
            for (let iy = AmaxY; iy <= RmaxY; iy++) {
                if (!this._sDataTool.loadIn(ix, iy, iz))
                    continue;
                const l = this._sDataTool.getLight();
                if (l < 0 && this.lightData.getS(l) != 0xf)
                    continue;
                let add = false;
                for (const n of $3dCardinalNeighbors) {
                    const nx = ix + n[0];
                    const ny = iy + n[1];
                    const nz = iz + n[2];
                    if (this._nDataTool.loadIn(nx, ny, nz)) {
                        const nl = this._nDataTool.getLight();
                        if (nl >= 0 && this.lightData.getS(nl) < 0xf) {
                            add = true;
                            break;
                        }
                    }
                }
                if (add) {
                    this._worldSunQueue.push([ix, iy, iz]);
                }
            }
        }
    }
    const queue = this._worldSunQueue;
    while (queue.length) {
        const node = queue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        if (!this._sDataTool.loadIn(x, y, z))
            continue;
        const sl = this._sDataTool.getLight();
        if (sl <= 0)
            continue;
        const sunL = this.lightData.getS(sl);
        if (sunL >= 0xf && !inColumnBounds(cx, cz, x, z))
            continue;
        if (this._nDataTool.loadIn(x - 1, y, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push([x - 1, y, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadIn(x + 1, y, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push([x + 1, y, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadIn(x, y, z - 1)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push([x, y, z - 1]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadIn(x, y, z + 1)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push([x, y, z + 1]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadIn(x, y - 1, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAddDown(nl, sl)) {
                if (this._nDataTool.isAir()) {
                    queue.push([x, y - 1, z]);
                    this._nDataTool
                        .setLight(this.lightData.getSunLightForUnderVoxel(sl, nl))
                        .commit();
                }
                else {
                    const substance = this._nDataTool.getSubstance();
                    if (substance != "magma" && substance != "solid") {
                        queue.push([x, y - 1, z]);
                        this._nDataTool
                            .setLight(this.lightData.getMinusOneForSun(sl, nl))
                            .commit();
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x, y + 1, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push([x, y + 1, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
    }
}
