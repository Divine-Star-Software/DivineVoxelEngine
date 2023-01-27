import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
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
        add(location) {
            let dimension = MeshRegister.dimensions.get(location[0]);
            if (!dimension) {
                dimension = MeshRegister.dimensions.add(location[0]);
            }
            const region = this._getRegionData();
            dimension.set(WorldSpaces.region.getKeyLocation(location), region);
            return region;
        },
        remove(location) {
            const region = MeshRegister.region.get(location);
            if (!region)
                return false;
            const dimension = MeshRegister.dimensions.get(location[0]);
            if (!dimension)
                return false;
            dimension.delete(WorldSpaces.region.getKeyLocation(location));
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
        get(location) {
            const dimension = MeshRegister.dimensions.get(location[0]);
            if (!dimension)
                return false;
            const region = dimension.get(WorldSpaces.region.getKeyLocation(location));
            if (!region)
                return false;
            return region;
        },
    },
    column: {
        add(location) {
            let region = MeshRegister.region.get(location);
            if (!region) {
                region = MeshRegister.region.add(location);
            }
            const column = this._getColumnData(location);
            region.columns.set(WorldSpaces.column.getIndexLocation(location), column);
            return column;
        },
        remove(location) {
            let region = MeshRegister.region.get(location);
            if (!region)
                return false;
            const index = WorldSpaces.column.getIndexLocation(location);
            const column = region.columns.get(index);
            if (!column)
                return false;
            region.columns.delete(index);
            if (region.columns.size == 0) {
                MeshRegister.region.remove(location);
            }
            return column;
        },
        _getColumnData(location) {
            return {
                location: location,
                chunks: new Map(),
            };
        },
        get(location) {
            const region = MeshRegister.region.get(location);
            if (!region)
                return false;
            return region.columns.get(WorldSpaces.column.getIndexLocation(location));
        },
    },
    chunk: {
        add(location, mesh, substance) {
            let column = MeshRegister.column.get(location);
            if (!column) {
                column = MeshRegister.column.add(location);
            }
            const index = WorldSpaces.chunk.getIndexLocation(location);
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
        remove(location, substance) {
            const column = MeshRegister.column.get(location);
            if (!column)
                return false;
            const index = WorldSpaces.chunk.getIndexLocation(location);
            const chunk = column.chunks.get(index);
            if (!chunk)
                return false;
            const chunkMesh = chunk.get(substance);
            if (!chunkMesh)
                return false;
            chunk.delete(substance);
            if (chunk.size == 0) {
                column.chunks.delete(index);
            }
            return chunkMesh.mesh;
        },
        get(location, substance) {
            const column = MeshRegister.column.get(location);
            if (!column)
                return false;
            const chunk = column.chunks.get(WorldSpaces.chunk.getIndexLocation(location));
            if (!chunk)
                return false;
            const chunkMesh = chunk.get(substance);
            if (!chunkMesh)
                return false;
            return chunkMesh;
        },
    },
};
