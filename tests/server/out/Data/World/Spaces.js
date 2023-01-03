//types
import { VoxelSpaces } from "../../Libs/voxelSpaces/VoxelSpaces.js";
//Objects
import { Util } from "../../Global/Util.helper.js";
class Space {
    data;
    _position = { x: 0, y: 0, z: 0 };
    _indexPosition = { x: 0, y: 0, z: 0 };
    _bounds = { x: 0, y: 0, z: 0 };
    _boundsPower2 = { x: 0, y: 0, z: 0 };
    _boundsSet = false;
    constructor(data) {
        this.data = data;
    }
    getVolume() {
        return this._bounds.x * this._bounds.y * this._bounds.z;
    }
    getArea() {
        return this._bounds.x * this._bounds.z;
    }
    setXYZ(x, y, z) {
        this._position.x = x;
        this._position.y = y;
        this._position.z = z;
        this.getPosition();
        return this;
    }
    setXZ(x, z) {
        this._position.x = x;
        this._position.z = z;
        this.getPosition();
        return this;
    }
    setBounds(x, y, z) {
        if (this._boundsSet)
            return;
        this._boundsPower2.x = x;
        this._boundsPower2.y = y;
        this._boundsPower2.z = z;
        this._bounds.x = 2 ** this._boundsPower2.x;
        this._bounds.y = 2 ** this._boundsPower2.y;
        this._bounds.z = 2 ** this._boundsPower2.z;
        this._boundsSet = true;
        return this;
    }
    getPosition() {
        return this.data.getPosition(this);
    }
    getIndex() {
        return this.data.getIndex(this);
    }
    getPositionXYZ(x, y, z) {
        return this.setXYZ(x, y, z).data.getPosition(this);
    }
    getIndexXYZ(x, y, z) {
        return this.setXYZ(x, y, z).data.getIndex(this);
    }
    getKeyXYZ(x, y, z) {
        return this.setXYZ(x, y, z).getKey();
    }
    getKey() {
        return `${this._position.x}-${this._position.y}-${this._position.z}`;
    }
}
const getIndex = (position, bounds) => {
    return position.x + position.y * bounds.x + position.z * bounds.z * bounds.y;
};
const simpleHash = (space) => {
    space._position.x =
        (space._position.x >> space._boundsPower2.x) << space._boundsPower2.x;
    space._position.y =
        (space._position.y >> space._boundsPower2.y) << space._boundsPower2.y;
    space._position.z =
        (space._position.z >> space._boundsPower2.z) << space._boundsPower2.z;
    return space._position;
};
const WholeVec3 = { x: 1, y: 1, z: 1 };
const spatialHash = (space, parentSpace, divisor) => {
    const spacePosition = space._position;
    const x = space._position.x;
    const y = space._position.y;
    const z = space._position.z;
    const parentPosition = parentSpace.getPositionXYZ(x, y, z);
    const indexPOS = space._indexPosition;
    const boundsP2 = space._boundsPower2;
    divisor = !divisor ? WholeVec3 : space._bounds;
    //x
    indexPOS.x = Math.abs(spacePosition.x - parentPosition.x);
    if (spacePosition.x < 0) {
        if (spacePosition.x == parentPosition.x + ((1 << boundsP2.x) - 1)) {
            indexPOS.x = (1 << boundsP2.x) - 1;
        }
    }
    indexPOS.x /= divisor.x;
    //y
    indexPOS.y = Math.abs(spacePosition.y - parentPosition.y);
    if (spacePosition.y < 0) {
        if (spacePosition.y == parentPosition.y + ((1 << boundsP2.y) - 1)) {
            indexPOS.y = (1 << boundsP2.y) - 1;
        }
    }
    indexPOS.y /= divisor.y;
    //z
    indexPOS.z = Math.abs(spacePosition.z - parentPosition.z);
    if (spacePosition.z < 0) {
        if (spacePosition.z == parentPosition.z + ((1 << boundsP2.z) - 1)) {
            indexPOS.z = (1 << boundsP2.z) - 1;
        }
    }
    indexPOS.z /= divisor.z;
    return indexPOS;
};
const regionSpace = Util.merge(new Space({
    getPosition(space) {
        return simpleHash(space);
    },
    getIndex(space) {
        return -Infinity;
    },
}), {
    chunkBounds: { x: 0, y: 0, z: 0 },
    columnBounds: { x: 0, y: 0, z: 0 },
    getChunkVolume() {
        return this.chunkBounds.x * this.chunkBounds.y * this.chunkBounds.z;
    },
    getColumnVolume() {
        return this.chunkBounds.x * this.chunkBounds.y * this.chunkBounds.z;
    },
});
const columnSpace = new Space({
    getPosition(space) {
        return simpleHash(space);
    },
    getIndex(space) {
        return getIndex(spatialHash(space, regionSpace, space._bounds), regionSpace.columnBounds);
    },
});
const chunkSpace = Util.merge(new Space({
    getPosition(space) {
        return simpleHash(space);
    },
    getIndex(space) {
        const ry = (space._position.y >> regionSpace._boundsPower2.y) <<
            regionSpace._boundsPower2.y;
        const cy = (space._position.y >> space._boundsPower2.y) << space._boundsPower2.y;
        return (cy - ry) / space._bounds.y;
    },
}), {
    _regionPosition: { x: 0, y: 0, z: 0 },
    getRegionPositonx() {
        chunkSpace.getPosition();
        return spatialHash(chunkSpace, regionSpace, chunkSpace._bounds);
    },
    getRegionPositonxXYZ(x, y, z) {
        return chunkSpace.setXYZ(x, y, z).getRegionPositonx();
    },
    getRegionIndex() {
        return getIndex(chunkSpace._indexPosition, regionSpace.chunkBounds);
    },
    getRegionIndexXYZ(x, y, z) {
        chunkSpace.getRegionPositonxXYZ(x, y, z);
        return chunkSpace.getRegionIndex();
    },
});
const voxelSpace = new Space({
    getPosition(space) {
        spatialHash(space, chunkSpace);
        space._position.x = space._indexPosition.x;
        space._position.y = space._indexPosition.y;
        space._position.z = space._indexPosition.z;
        return space._position;
    },
    getIndex(space) {
        return getIndex(space._indexPosition, space._bounds);
    },
});
export const WorldSpaces = Util.merge(VoxelSpaces.getVoxelSpaces(), {
    $INIT(settings) {
        WorldSpaces.setDimensions({
            regions: {
                x: settings.regions.regionXPow2,
                y: settings.regions.regionYPow2,
                z: settings.regions.regionZPow2,
            },
            columns: {
                x: settings.chunks.chunkXPow2,
                y: settings.regions.regionYPow2,
                z: settings.chunks.chunkZPow2,
            },
            chunks: {
                x: settings.chunks.chunkXPow2,
                y: settings.chunks.chunkYPow2,
                z: settings.chunks.chunkZPow2,
            },
        });
    },
});
