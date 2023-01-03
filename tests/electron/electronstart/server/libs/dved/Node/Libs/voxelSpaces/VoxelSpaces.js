"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoxelSpaces = void 0;
var VoxelSpace_js_1 = require("./Classes/VoxelSpace.js");
var merge = function (target, newObject) {
    return Object.assign(target, newObject);
};
exports.VoxelSpaces = {
    zeroPointSpace: new VoxelSpace_js_1.VoxelSpace({
        getPosition: function (space) {
            return space._position;
        },
        getIndex: function () {
            return 0;
        },
    }),
    getVoxelSpaces: function () {
        var regionSpace = merge(new VoxelSpace_js_1.VoxelSpace({
            getPosition: function (space) {
                return VoxelSpace_js_1.VoxelSpace.simpleCubeHash(space);
            },
            getIndex: function (space) {
                return -Infinity;
            },
        }), {
            chunkBounds: { x: 0, y: 0, z: 0 },
            columnBounds: { x: 0, y: 0, z: 0 },
            getChunkVolume: function () {
                return this.chunkBounds.x * this.chunkBounds.y * this.chunkBounds.z;
            },
            getColumnVolume: function () {
                return this.columnBounds.x * this.columnBounds.y * this.columnBounds.z;
            },
        });
        var columnSpace = new VoxelSpace_js_1.VoxelSpace({
            getPosition: function (space) {
                return VoxelSpace_js_1.VoxelSpace.simpleCubeHash(space);
            },
            getIndex: function (space) {
                return VoxelSpace_js_1.VoxelSpace.getIndex(VoxelSpace_js_1.VoxelSpace.spatialHash(space, regionSpace, space._bounds), regionSpace.columnBounds);
            },
        });
        var chunkSpace = merge(new VoxelSpace_js_1.VoxelSpace({
            getPosition: function (space) {
                return VoxelSpace_js_1.VoxelSpace.simpleCubeHash(space);
            },
            getIndex: function (space) {
                var ry = (space._position.y >> regionSpace._boundsPower2.y) <<
                    regionSpace._boundsPower2.y;
                var cy = (space._position.y >> space._boundsPower2.y) << space._boundsPower2.y;
                return (cy - ry) / space._bounds.y;
            },
        }), {
            _regionPosition: { x: 0, y: 0, z: 0 },
            getRegionPositonx: function () {
                chunkSpace.getPosition();
                return VoxelSpace_js_1.VoxelSpace.spatialHash(chunkSpace, regionSpace, chunkSpace._bounds);
            },
            getRegionPositonxXYZ: function (x, y, z) {
                return chunkSpace.setXYZ(x, y, z).getRegionPositonx();
            },
            getRegionIndex: function () {
                return VoxelSpace_js_1.VoxelSpace.getIndex(chunkSpace._hashedPosition, regionSpace.chunkBounds);
            },
            getRegionIndexXYZ: function (x, y, z) {
                chunkSpace.getRegionPositonxXYZ(x, y, z);
                return chunkSpace.getRegionIndex();
            },
        });
        var voxelSpace = new VoxelSpace_js_1.VoxelSpace({
            getPosition: function (space) {
                VoxelSpace_js_1.VoxelSpace.spatialHash(space, chunkSpace);
                space._position.x = space._hashedPosition.x;
                space._position.y = space._hashedPosition.y;
                space._position.z = space._hashedPosition.z;
                return space._position;
            },
            getIndex: function (space) {
                return VoxelSpace_js_1.VoxelSpace.getIndex(space._hashedPosition, space._bounds);
            },
        });
        return {
            region: regionSpace,
            column: columnSpace,
            chunk: chunkSpace,
            voxel: voxelSpace,
            setDimensions: function (data) {
                regionSpace.setCubeBounds(data.regions);
                columnSpace.setCubeBounds(data.columns);
                chunkSpace.setCubeBounds(data.chunks);
                voxelSpace.setCubeBounds(data.chunks);
                regionSpace.chunkBounds.x = regionSpace._bounds.x / chunkSpace._bounds.x;
                regionSpace.chunkBounds.y = regionSpace._bounds.y / chunkSpace._bounds.y;
                regionSpace.chunkBounds.z = regionSpace._bounds.z / chunkSpace._bounds.z;
                regionSpace.columnBounds.x = regionSpace._bounds.x / columnSpace._bounds.x;
                regionSpace.columnBounds.y = regionSpace._bounds.y / columnSpace._bounds.y;
                regionSpace.columnBounds.z = regionSpace._bounds.z / columnSpace._bounds.z;
            },
        };
    },
    getZeroPointVoxelSpace: function (dimensions) {
        var space = new VoxelSpace_js_1.VoxelSpace({
            getPosition: function (space) {
                VoxelSpace_js_1.VoxelSpace.spatialHash(space, exports.VoxelSpaces.zeroPointSpace);
                space._position.x = space._hashedPosition.x;
                space._position.y = space._hashedPosition.y;
                space._position.z = space._hashedPosition.z;
                return space._position;
            },
            getIndex: function (space) {
                return VoxelSpace_js_1.VoxelSpace.getIndex(space._hashedPosition, space._bounds);
            },
        });
        space.setBounds(dimensions);
        return space;
    },
};
