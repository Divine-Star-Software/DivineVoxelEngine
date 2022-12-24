import { WorldBounds } from "../../Data/World/WorldBounds.js";
export const MeshRegister = {
    _dimensions: new Map(),
    $INIT() {
        this._dimensions.set("main", new Map());
    },
    dimensions: {
        add(id) {
            const dimesnion = new Map();
            MeshRegister._dimensions.set(id, dimesnion);
            return dimesnion;
        },
        get(id) {
            return MeshRegister._dimensions.get(id);
        },
        remove(id) {
            const dimension = MeshRegister._dimensions.get(id);
            if (!dimension)
                return false;
            dimension.forEach((region) => {
                region.columns.forEach((column) => {
                    column.chunks.forEach((chunk) => {
                        chunk.forEach((chunkMeshes) => {
                            chunkMeshes.mesh.dispose();
                        });
                    });
                });
            });
            return true;
        },
    },
    region: {
        add(dimensionId, x, y, z) {
            let dimension = MeshRegister.dimensions.get(dimensionId);
            if (!dimension) {
                dimension = MeshRegister.dimensions.add(dimensionId);
            }
            const region = this._getRegionData();
            dimension.set(WorldBounds.getRegionKeyFromPosition(x, y, z), region);
            return region;
        },
        remove(dimensionId, x, z, y = 0) {
            let dimension = MeshRegister.dimensions.get(dimensionId);
            if (!dimension)
                return false;
            let region = MeshRegister.region.get(dimensionId, x, y, z);
            if (!region)
                return false;
            dimension.delete(WorldBounds.getRegionKeyFromPosition(x, y, z));
            region.columns.forEach((column) => {
                column.chunks.forEach((chunk) => {
                    chunk.forEach((chunkMeshes) => {
                        chunkMeshes.mesh.dispose();
                    });
                });
            });
            return true;
        },
        _getRegionData() {
            return {
                columns: new Map(),
            };
        },
        get(dimensionId, x, y, z) {
            const dimension = MeshRegister.dimensions.get(dimensionId);
            if (!dimension)
                return false;
            const region = dimension.get(WorldBounds.getRegionKeyFromPosition(x, y, z));
            if (!region)
                return false;
            return region;
        },
    },
    column: {
        add(dimensionId, x, z, y = 0) {
            let region = MeshRegister.region.get(dimensionId, x, y, z);
            if (!region) {
                region = MeshRegister.region.add(dimensionId, x, y, z);
            }
            const column = this._getColumnData([x, y, z]);
            region.columns.set(WorldBounds.getColumnIndex(x, z, y), column);
            return column;
        },
        remove(dimensionId, x, z, y = 0) {
            let region = MeshRegister.region.get(dimensionId, x, y, z);
            if (!region)
                return false;
            const index = WorldBounds.getColumnIndex(x, z, y);
            const column = region.columns.get(index);
            if (!column)
                return false;
            region.columns.delete(index);
            column.chunks.forEach((chunk) => {
                chunk.forEach((chunkMeshes) => {
                    chunkMeshes.mesh.dispose();
                });
            });
            if (region.columns.size == 0) {
                MeshRegister.region.remove(dimensionId, x, y, z);
            }
            return true;
        },
        _getColumnData(position) {
            return {
                position: position,
                chunks: new Map(),
            };
        },
        get(dimensionId, x, z, y = 0) {
            const region = MeshRegister.region.get(dimensionId, x, y, z);
            if (!region)
                return false;
            return region.columns.get(WorldBounds.getColumnIndex(x, z, y));
        },
    },
    chunk: {
        add(dimensionId, x, y, z, mesh, substance) {
            let column = MeshRegister.column.get(dimensionId, x, z, y);
            if (!column) {
                column = MeshRegister.column.add(dimensionId, x, z, y);
            }
            const index = WorldBounds.getChunkColumnIndex(y);
            let chunk = column.chunks.get(index);
            if (!chunk) {
                chunk = new Map();
                column.chunks.set(index, chunk);
            }
            chunk.set(substance, this._getChunkData(mesh));
            return chunk;
        },
        _getChunkData(mesh) {
            return {
                mesh: mesh,
            };
        },
        remove(dimensionId, x, y, z, substance) {
            const column = MeshRegister.column.get(dimensionId, x, z, y);
            if (!column)
                return false;
            const index = WorldBounds.getChunkColumnIndex(y);
            const chunk = column.chunks.get(index);
            if (!chunk)
                return false;
            const chunkMesh = chunk.get(substance);
            if (!chunkMesh)
                return false;
            chunkMesh.mesh.dispose();
            chunk.delete(substance);
            if (chunk.size == 0) {
                column.chunks.delete(index);
            }
            return true;
        },
        get(dimensionId, x, y, z, substance) {
            const column = MeshRegister.column.get(dimensionId, x, z, y);
            if (!column)
                return false;
            const chunk = column.chunks.get(WorldBounds.getChunkColumnIndex(y));
            if (!chunk)
                return false;
            const chunkMesh = chunk.get(substance);
            if (!chunkMesh)
                return false;
            return chunkMesh;
        },
    },
};
