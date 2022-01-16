export class WorldGen {
    DVEW;
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 256;
    renderDistance = 20;
    generateChunkStressTest(chunkX, chunkZ) {
        //   this.chunkMap.addChunk(chunkX,chunkZ);
        const returnChunk = [];
        let dreamStonePillar = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:dreamstonepillar:defualt");
        // debugBox = dreamstone;
        let block = [dreamStonePillar, 0, 1, 1, 1, 1];
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    returnChunk[x] ??= [];
                    returnChunk[x][z] ??= [];
                    returnChunk[x][z][y] = block;
                }
            }
        }
        return {
            voxels: returnChunk,
        };
    }
    generateCrazyChunk(returnChunk, minY, x, y, z) {
        let dreamstone = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:dreamstone:defualt");
        let dreamGrasss = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:dreamgrass:defualt");
        let dreamGrassVoxel = [dreamGrasss, 0, 1, 1, 1, 1];
        let block = [dreamstone, 0];
        if (y < Math.floor(Math.random() * minY)) {
            returnChunk[x] ??= [];
            returnChunk[x][z] ??= [];
            returnChunk[x][z][y] = block;
            if (Math.random() > 0.8) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y + 1] = dreamGrassVoxel;
            }
        }
    }
    generateSpikeChunk(returnChunk, minY, x, y, z) {
        let dreamStonePillar = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:dreamstonepillar:defualt");
        let block = [dreamStonePillar, 0];
        if (x == 0 || z == 0 || x == 15 || z == 15) {
            if (y == minY ||
                y == minY + 28 ||
                y == minY + 54 ||
                y == minY + 56 ||
                y == minY + 86) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x == 0 || z == 0 || x == 15 || z == 15) {
            if (y == minY + 1 ||
                y == minY + 26 ||
                y == minY + 30 ||
                y == minY + 52 ||
                y == minY + 58 ||
                y == minY + 84 ||
                y == minY + 88) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x == 1 || z == 1 || x == 14 || z == 14) {
            if (y == minY + 2 ||
                y == minY + 24 ||
                y == minY + 32 ||
                y == minY + 52 ||
                y == minY + 60 ||
                y == minY + 82 ||
                y == minY + 86 ||
                y == minY + 90) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x == 2 || z == 2 || x == 13 || z == 13) {
            if (y == minY + 4 ||
                y == minY + 22 ||
                y == minY + 34 ||
                y == minY + 50 ||
                y == minY + 62 ||
                y == minY + 80 ||
                y == minY + 88 ||
                y == minY + 92) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x == 3 || z == 3 || x == 12 || z == 12) {
            if (y == minY + 6 ||
                y == minY + 20 ||
                y == minY + 36 ||
                y == minY + 48 ||
                y == minY + 64 ||
                y == minY + 78 ||
                y == minY + 90 ||
                y == minY + 94) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x == 4 || z == 4 || x == 11 || z == 11) {
            if (y == minY + 8 ||
                y == minY + 18 ||
                y == minY + 38 ||
                y == minY + 46 ||
                y == minY + 66 ||
                y == minY + 74 ||
                y == minY + 96) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x == 5 || z == 5 || x == 10 || z == 10) {
            if (y == minY + 10 ||
                y == minY + 16 ||
                y == minY + 40 ||
                y == minY + 44 ||
                y == minY + 68 ||
                y == minY + 72 ||
                y == minY + 98) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x == 6 || z == 6 || x == 9 || z == 9) {
            if (y == minY + 12 ||
                y == minY + 14 ||
                y == minY + 42 ||
                y == minY + 70 ||
                minY + 100) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (y < minY) {
            returnChunk[x] ??= [];
            returnChunk[x][z] ??= [];
            returnChunk[x][z][y] = block;
        }
    }
    generatePondChunk(returnChunk, minY, x, y, z) {
        let dreamstone = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:dreamstone:defualt");
        const liquidDreamEther = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:liquiddreamether:defualt");
        const liquidDreamEtherVoxel = [liquidDreamEther, 1, 1];
        let block = [dreamstone, 0];
        if (x == 0 || z == 0 || x == 15 || z == 15) {
            if (y == minY) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x == 1 || z == 1 || x == 14 || z == 14) {
            if (y == minY - 1) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x == 2 || z == 2 || x == 13 || z == 13) {
            if (y == minY - 2) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x == 3 || z == 3 || x == 12 || z == 12) {
            if (y == minY - 3) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x <= 4 || z <= 4 || x <= 11 || z <= 11) {
            if (y == minY - 4) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x <= 5 || z <= 5 || x <= 10 || z <= 10) {
            if (y == minY - 5) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (x <= 6 || z <= 6 || x <= 9 || z <= 9) {
            if (y == minY - 6) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
            }
        }
        if (y < minY - 6) {
            returnChunk[x] ??= [];
            returnChunk[x][z] ??= [];
            returnChunk[x][z][y] = block;
        }
        if (y >= minY - 6 && y <= minY) {
            if (returnChunk[x] &&
                returnChunk[x][z] &&
                returnChunk[x][z][y] == undefined) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = liquidDreamEtherVoxel;
            }
        }
    }
    generateHoleChunk(returnChunk, minY, x, y, z) {
        let dreamstone = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:dreamstone:defualt");
        let dreamGrasss = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:dreamgrass:defualt");
        let dreamGrassVoxel = [dreamGrasss, 0, 1, 1, 1, 1];
        let block = [dreamstone, 0];
        if (x == 0 || z == 0 || x == 15 || z == 15) {
            if (y == minY) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
                if (Math.random() > 0.8) {
                    returnChunk[x] ??= [];
                    returnChunk[x][z] ??= [];
                    returnChunk[x][z][y + 1] = dreamGrassVoxel;
                }
            }
        }
        if (x == 1 || z == 1 || x == 14 || z == 14) {
            if (y == minY - 1) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
                if (Math.random() > 0.8) {
                    returnChunk[x] ??= [];
                    returnChunk[x][z] ??= [];
                    returnChunk[x][z][y + 1] = dreamGrassVoxel;
                }
            }
        }
        if (x == 2 || z == 2 || x == 13 || z == 13) {
            if (y == minY - 2) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
                if (Math.random() > 0.8) {
                    returnChunk[x] ??= [];
                    returnChunk[x][z] ??= [];
                    returnChunk[x][z][y + 1] = dreamGrassVoxel;
                }
            }
        }
        if (x == 3 || z == 3 || x == 12 || z == 12) {
            if (y == minY - 3) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
                if (Math.random() > 0.8) {
                    returnChunk[x] ??= [];
                    returnChunk[x][z] ??= [];
                    returnChunk[x][z][y + 1] = dreamGrassVoxel;
                }
            }
        }
        if (x == 4 || z == 4 || x == 11 || z == 11) {
            if (y == minY - 4) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
                if (Math.random() > 0.8) {
                    returnChunk[x] ??= [];
                    returnChunk[x][z] ??= [];
                    returnChunk[x][z][y + 1] = dreamGrassVoxel;
                }
            }
        }
        if (x == 5 || z == 5 || x == 10 || z == 10) {
            if (y == minY - 5) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
                if (Math.random() > 0.8) {
                    returnChunk[x] ??= [];
                    returnChunk[x][z] ??= [];
                    returnChunk[x][z][y + 1] = dreamGrassVoxel;
                }
            }
        }
        if (x == 6 || z == 6 || x == 9 || z == 9) {
            if (y == minY - 6) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = block;
                if (Math.random() > 0.8) {
                    returnChunk[x] ??= [];
                    returnChunk[x][z] ??= [];
                    returnChunk[x][z][y + 1] = dreamGrassVoxel;
                }
            }
        }
        if (y < minY - 7) {
            returnChunk[x] ??= [];
            returnChunk[x][z] ??= [];
            returnChunk[x][z][y] = block;
            if (Math.random() > 0.8) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y + 1] = dreamGrassVoxel;
            }
        }
    }
    generateNormalChunk(returnChunk, minY, x, y, z) {
        let dreamGrassBlock = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:dreamgrassblock:defualt");
        let dreamGrasss = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:dreamgrass:defualt");
        let dreamGrassVoxel = [dreamGrasss, 0, 1, 1, 1, 1];
        let block = [dreamGrassBlock, 0];
        if (y < minY) {
            returnChunk[x] ??= [];
            returnChunk[x][z] ??= [];
            returnChunk[x][z][y] = block;
        }
        if (y == minY) {
            if (Math.random() > 0.8) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = dreamGrassVoxel;
            }
        }
    }
    generateChunkNormal(chunkX, chunkZ) {
        //   this.chunkMap.addChunk(chunkX,chunkZ);
        const returnChunk = [];
        let toss = Math.random();
        let minY = 60;
        let spiked = false;
        let crazy = false;
        let hole = false;
        let pond = false;
        let normal = true;
        if (toss < 0.2) {
            crazy = true;
        }
        if (toss > 0.2 && toss < 0.4) {
            spiked = true;
        }
        if (toss > 0.4 && toss < 0.6) {
            hole = true;
        }
        if (toss > 0.6) {
            pond = true;
        }
        if (crazy || spiked || hole || pond) {
            normal = false;
        }
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (pond) {
                        this.generatePondChunk(returnChunk, minY, x, y, z);
                    }
                    if (crazy) {
                        this.generateCrazyChunk(returnChunk, minY, x, y, z);
                    }
                    if (spiked) {
                        this.generateSpikeChunk(returnChunk, minY, x, y, z);
                    }
                    if (hole) {
                        this.generateHoleChunk(returnChunk, minY, x, y, z);
                    }
                    if (normal) {
                        this.generateNormalChunk(returnChunk, minY, x, y, z);
                    }
                }
            }
        }
        return {
            voxels: returnChunk,
        };
    }
    generateChunkLine(chunkX, chunkZ, direction) {
        const chunks = this.DVEW.worldData.chunks;
        if (direction == "north") {
            const newChunkZ = chunkZ + (this.renderDistance / 2) * 16 + 16;
            const removeChunkZ = chunkZ - (this.renderDistance / 2) * 16 + 32;
            const previousMaxChunkRebuild = newChunkZ - 32;
            for (let i = chunkX - 10 * 16; i < chunkX + 10 * 16; i += 16) {
                if (!chunks[i]) {
                    chunks[i] = [];
                }
                if (!chunks[i][previousMaxChunkRebuild]) {
                    const newChunk = this.generateChunkNormal(i, previousMaxChunkRebuild);
                    this.DVEW.worldData.setChunk(i, previousMaxChunkRebuild, newChunk);
                    this.DVEW.buildChunk(i, previousMaxChunkRebuild);
                }
            }
            for (let i = chunkX - 10 * 16; i < chunkX + 10 * 16; i += 16) {
                if (!chunks[i]) {
                    chunks[i] = [];
                }
                if (chunks[i][removeChunkZ]) {
                    this.DVEW.removeChunk(i, removeChunkZ);
                }
                if (!chunks[i][newChunkZ]) {
                    const newChunk = this.generateChunkNormal(i, newChunkZ);
                    this.DVEW.worldData.setChunk(i, newChunkZ, newChunk);
                    this.DVEW.buildChunk(i, newChunkZ);
                }
            }
        }
        if (direction == "south") {
            const removeChunkZ = chunkZ + (this.renderDistance / 2) * 16;
            const newChunkZ = chunkZ - (this.renderDistance / 2) * 16;
            for (let i = chunkX - 10 * 16; i < chunkX + 10 * 16; i += 16) {
                if (!chunks[i]) {
                    chunks[i] = [];
                }
                if (chunks[i][removeChunkZ]) {
                    this.DVEW.removeChunk(i, removeChunkZ);
                }
                if (!chunks[i][newChunkZ]) {
                    const newChunk = this.generateChunkNormal(i, newChunkZ);
                    this.DVEW.worldData.setChunk(i, newChunkZ, newChunk);
                    this.DVEW.buildChunk(i, newChunkZ);
                }
            }
        }
        if (direction == "east") {
            const newChunkX = chunkX + (this.renderDistance / 2) * 16 + 16;
            const removeChunkX = chunkX - (this.renderDistance / 2) * 16 + 16;
            const previousMaxChunkRebuild = newChunkX - 16;
            for (let i = chunkZ - 10 * 16; i < chunkZ + 10 * 16; i += 16) {
                if (!chunks[newChunkX]) {
                    chunks[newChunkX] = [];
                }
                if (!chunks[newChunkX][i]) {
                    const newChunk = this.generateChunkNormal(newChunkX, i);
                    this.DVEW.worldData.setChunk(newChunkX, i, newChunk);
                    this.DVEW.buildChunk(newChunkX, i);
                }
            }
            for (let i = chunkZ - 10 * 16; i < chunkZ + 10 * 16; i += 16) {
                if (!chunks[previousMaxChunkRebuild]) {
                    chunks[previousMaxChunkRebuild] = [];
                }
                if (!chunks[previousMaxChunkRebuild][i]) {
                    const newChunk = this.generateChunkNormal(previousMaxChunkRebuild, i);
                    this.DVEW.worldData.setChunk(previousMaxChunkRebuild, i, newChunk);
                    this.DVEW.buildChunk(previousMaxChunkRebuild, i);
                }
            }
            for (const checkChunkX of Object.keys(chunks)) {
                const chunkXNum = Number(checkChunkX);
                if (chunkXNum <= removeChunkX) {
                    for (const chunk of Object.keys(chunks[chunkXNum])) {
                        const chunkZ = Number(chunk);
                        chunks[chunkXNum][chunkZ];
                        this.DVEW.builderManager.requestChunkBeRemoved(chunkXNum, chunkZ);
                        delete chunks[chunkXNum][chunkZ];
                    }
                    delete chunks[chunkXNum];
                }
            }
            delete chunks[removeChunkX];
        }
        if (direction == "west") {
            const removeChunkX = chunkX + (this.renderDistance / 2) * 16;
            const newChunkX = chunkX - (this.renderDistance / 2) * 16;
            const previousMaxChunkRebuild = newChunkX + 16;
            for (let i = chunkZ - 10 * 16; i < chunkZ + 10 * 16; i += 16) {
                if (!chunks[newChunkX]) {
                    chunks[newChunkX] = [];
                }
                if (!chunks[newChunkX][i]) {
                    const newChunk = this.generateChunkNormal(newChunkX, i);
                    this.DVEW.worldData.setChunk(newChunkX, i, newChunk);
                    this.DVEW.buildChunk(newChunkX, i);
                }
            }
            for (let i = chunkZ - 10 * 16; i < chunkZ + 10 * 16; i += 16) {
                if (!chunks[previousMaxChunkRebuild]) {
                    chunks[previousMaxChunkRebuild] = [];
                }
                if (!chunks[previousMaxChunkRebuild][i]) {
                    const newChunk = this.generateChunkNormal(newChunkX, i);
                    this.DVEW.worldData.setChunk(previousMaxChunkRebuild, i, newChunk);
                    this.DVEW.buildChunk(previousMaxChunkRebuild, i);
                }
            }
            for (const checkChunkX of Object.keys(chunks)) {
                const chunkXNum = Number(checkChunkX);
                if (chunkXNum >= removeChunkX) {
                    for (const chunk of Object.keys(chunks[chunkXNum])) {
                        const chunkZ = Number(chunk);
                        chunks[chunkXNum][chunkZ];
                        this.DVEW.builderManager.requestChunkBeRemoved(chunkXNum, chunkZ);
                        delete chunks[chunkXNum][chunkZ];
                    }
                    delete chunks[chunkXNum];
                }
            }
            delete chunks[removeChunkX];
        }
        this.DVEW.buildFluidMesh();
    }
}
