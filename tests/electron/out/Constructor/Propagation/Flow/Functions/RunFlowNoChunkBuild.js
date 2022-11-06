export async function RunFlowNoChunkBuild(requeue = false) {
    const que = this._flowQue;
    const reQueue = [];
    while (que.length != 0) {
        const node = que.shift();
        if (!node) {
            return;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const l = this.getLevel(x, y, z);
        if (this.inRemoveMap(x, y, z))
            continue;
        if (l == 1) {
            continue;
        }
        if (this.canFlowOutwardTest(x, y, z)) {
            const n1 = this.getLevel(x + 1, y, z);
            if (n1 + 2 < l && n1 > -1) {
                let state = 0;
                if (this.flowDownTest(x + 1, y, z)) {
                    state = 1;
                }
                this.setVoxel(l - 2, state, x + 1, y, z);
                que.push([x + 1, y, z]);
            }
            const n2 = this.getLevel(x - 1, y, z);
            if (n2 + 2 < l && n2 > -1) {
                let state = 0;
                if (this.flowDownTest(x - 1, y, z)) {
                    state = 1;
                }
                this.setVoxel(l - 2, state, x - 1, y, z);
                que.push([x - 1, y, z]);
            }
            const n3 = this.getLevel(x, y, z + 1);
            if (n3 + 2 < l && n3 > -1) {
                let state = 0;
                if (this.flowDownTest(x, y, z + 1)) {
                    state = 1;
                }
                this.setVoxel(l - 2, state, x, y, z + 1);
                que.push([x, y, z + 1]);
            }
            const n4 = this.getLevel(x, y, z - 1);
            if (n4 + 2 < l && n4 > -1) {
                let state = 0;
                if (this.flowDownTest(x, y, z - 1)) {
                    state = 1;
                }
                this.setVoxel(l - 2, state, x, y, z - 1);
                que.push([x, y, z - 1]);
            }
        }
        if (this.canFlowDownardTest(x, y, z)) {
            const n5 = this.getLevel(x, y - 1, z);
            if (n5 <= l && n5 > -1) {
                this.setVoxel(15, 1, x, y - 1, z);
                que.push([x, y - 1, z]);
            }
        }
        this.addToRebuildQue(x, y, z);
    }
    this._visitedMap.clear();
    this._flowQue = reQueue;
}
