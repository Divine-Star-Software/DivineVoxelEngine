export async function RunFlowRemove(x, y, z) {
    const check = this.setCurrentVoxel(x, y, z);
    this._visitedMap.clear();
    if (!check)
        return;
    this.runRemoveCheck(x, y, z);
    //this.removeVoxel(x, y, z);
    while (this._flowRemoveQue.length != 0) {
        this.runRemovePropagation();
        this.runFlowReduce();
        this.runRebuildQue();
        this.runFlowNoChunkRebuild();
        await this.wait(100);
    }
    this._flowQue = [];
    this._removeMap.clear();
}
export async function RunRemovePropagation() {
    const que = this._flowRemoveQue;
    for (let i = 0; i < que.length; i++) {
        const node = que[i];
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const l = this.getLevel(x, y, z);
        const s = this.getLevelState(x, y, z);
        if (this.inMap(x, y, z))
            continue;
        this.addToMap(x, y, z);
        const n5 = this.getLevel(x, y - 1, z);
        if (n5 > 0) {
            let add = false;
            if (s == 1) {
                if (l < 2) {
                    add = true;
                }
            }
            if (s == 0 && l < 2) {
                add = true;
            }
            if (add) {
                this.addToRemoveMap(x, y - 1, z);
                this._flowRemoveQue.push([x, y - 1, z]);
            }
        }
        const n1 = this.getLevel(x + 1, y, z);
        if (n1 > 0) {
            const n1s = this.getLevelState(x + 1, y, z);
            if (n1 <= l && l > 0 && n1 > 0) {
                this._flowRemoveQue.push([x + 1, y, z]);
            }
            if (n1 > l && !this.inRemoveMap(x + 1, y, z)) {
                this._flowQue.push([x + 1, y, z]);
            }
        }
        const n2 = this.getLevel(x - 1, y, z);
        if (n2 > 0) {
            const n2s = this.getLevelState(x - 1, y, z);
            if (n2 <= l && l > 0 && n2 > 0) {
                this._flowRemoveQue.push([x - 1, y, z]);
            }
            if (n2 > l && !this.inRemoveMap(x - 1, y, z)) {
                this._flowQue.push([x - 1, y, z]);
            }
        }
        const n3 = this.getLevel(x, y, z + 1);
        if (n3 > 0) {
            const n3s = this.getLevelState(x, y, z + 1);
            if (n3 <= l && l > 0 && n3 > 0) {
                this._flowRemoveQue.push([x, y, z + 1]);
            }
            if (n3 > l && !this.inRemoveMap(x, y, z + 1)) {
                this._flowQue.push([x, y, z + 1]);
            }
        }
        const n4 = this.getLevel(x, y, z - 1);
        if (n4 > 0) {
            const n4s = this.getLevelState(x, y, z - 1);
            if (n4 <= l && l > 0 && n4 > 0) {
                this._flowRemoveQue.push([x, y, z - 1]);
            }
            if (n4 > l && !this.inRemoveMap(x, y, z - 1)) {
                this._flowQue.push([x, y, z - 1]);
            }
        }
    }
    this._visitedMap.clear();
}
export async function RunFlowReduce() {
    const que = this._flowRemoveQue;
    const reque = [];
    while (que.length != 0) {
        const node = que.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        if (this.inMap(x, y, z))
            continue;
        this.inMap(x, y, z);
        const l = this.getLevel(x, y, z);
        if (l <= 0)
            continue;
        const state = this.getLevelState(x, y, z);
        let syncRebuild = false;
        if (l < 2) {
            if (Math.random() < 0.5 || state == 1) {
                this.removeVoxel(x, y, z);
                if (state == 1)
                    syncRebuild = true;
            }
            else {
                reque.push([x, y, z]);
            }
        }
        else {
            this.setLevel(l - 2, x, y, z);
            reque.push([x, y, z]);
        }
        this.addToRebuildQue(x, y, z, syncRebuild);
    }
    this._flowRemoveQue = reque;
}
