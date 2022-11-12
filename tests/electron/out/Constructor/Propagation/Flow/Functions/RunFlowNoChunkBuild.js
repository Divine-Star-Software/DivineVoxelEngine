export async function RunFlowNoChunkBuild() {
    const que = this._flowQue;
    while (que.length != 0) {
        const node = que.shift();
        if (!node) {
            return;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const l = this.getLevel(x, y, z);
        const s = this.getLevelState(x, y, z);
        this.addToRebuildQue(x, y, z);
        this.addToRemoveMap(x, y, z);
        if (this.canFlowOutwardTest(x, y, z)) {
            const n1 = this.getLevel(x + 1, y, z);
            if (n1 + 2 < l && n1 > -1) {
                this.setVoxel(l - 2, 0, x + 1, y, z);
                que.push([x + 1, y, z]);
            }
            const n2 = this.getLevel(x - 1, y, z);
            if (n2 + 2 < l && n2 > -1) {
                this.setVoxel(l - 2, 0, x - 1, y, z);
                que.push([x - 1, y, z]);
            }
            const n3 = this.getLevel(x, y, z + 1);
            if (n3 + 2 < l && n3 > -1) {
                this.setVoxel(l - 2, 0, x, y, z + 1);
                que.push([x, y, z + 1]);
            }
            const n4 = this.getLevel(x, y, z - 1);
            if (n4 + 2 < l && n4 > -1) {
                this.setVoxel(l - 2, 0, x, y, z - 1);
                que.push([x, y, z - 1]);
            }
        }
        const n5 = this.getLevel(x, y - 1, z);
        if (n5 <= l && n5 >= 0) {
            let state = 1;
            let level = 15;
            if (l <= 0 && s != 1) {
                state = 0;
                level = l - 2;
            }
            this.setVoxel(level, state, x, y, z - 1);
            que.push([x, y - 1, z]);
        }
    }
}
