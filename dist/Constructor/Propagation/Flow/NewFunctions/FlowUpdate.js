import { FlowManager as FM } from "../FlowManager.js";
export async function FlowUpdate(tasks, rebuild = true) {
    if (rebuild) {
        const [dimension, x, y, z] = tasks.origin;
        const check = FM.setCurrentVoxel(x, y, z);
        if (!check)
            return;
        const level = FM.getLevel(x, y, z);
        if (level < 0)
            return;
        const levelState = FM.getLevelState(x, y, z);
        tasks.queues.flow.update.queue.push([x, y, z, level, levelState]);
    }
    while (tasks.queues.flow.update.queue.length != 0) {
        RunFlowPropagation(tasks);
        RunFlowIncrease(tasks);
        if (rebuild) {
            tasks.runRebuildQueue();
            await FM.wait(100);
        }
    }
}
function RunFlowPropagation(tasks) {
    const que = tasks.queues.flow.update.queue;
    const noRemoveMap = tasks.queues.flow.rmeove.noRemoveMap;
    for (let i = 0; i < que.length; i++) {
        const node = que[i];
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const l = FM.getLevel(x, y, z);
        const s = FM.getLevelState(x, y, z);
        noRemoveMap.add(x, y, z);
        if (FM.canFlowOutwardTest(x, y, z)) {
            const n1 = FM.getLevel(x + 1, y, z);
            if (n1 + 2 < l && n1 >= 0) {
                let n1l = l - 2;
                que.push([x + 1, y, z, n1l, 0]);
            }
            const n2 = FM.getLevel(x - 1, y, z);
            if (n2 + 2 < l && n2 >= 0) {
                let n2l = l - 2;
                que.push([x - 1, y, z, n2l, 0]);
            }
            const n3 = FM.getLevel(x, y, z + 1);
            if (n3 + 2 < l && n3 >= 0) {
                let n3l = l - 2;
                que.push([x, y, z + 1, n3l, 0]);
            }
            const n4 = FM.getLevel(x, y, z - 1);
            if (n4 + 2 < l && n4 >= 0) {
                let n4l = l - 2;
                que.push([x, y, z - 1, n4l, 0]);
            }
        }
        const n5 = FM.getLevel(x, y - 1, z);
        if (n5 <= l && n5 >= 0) {
            let state = 1;
            let level = 15;
            if (l <= 0 && s != 1) {
                state = 0;
                level = l - 2;
            }
            que.push([x, y - 1, z, level, state]);
        }
    }
}
function RunFlowIncrease(tasks) {
    const que = tasks.queues.flow.update.queue;
    const map = tasks.queues.flow.update.map;
    const reque = [];
    while (que.length != 0) {
        const node = que.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const level = node[3];
        const levelState = node[4];
        if (map.inMap(x, y, z))
            continue;
        map.add(x, y, z);
        if (level > -1) {
            FM.setVoxel(level, levelState, x, y, z);
            reque.push([x, y, z, -1]);
        }
        tasks.addToRebuildQueue(x, y, z);
    }
    //@ts-ignore
    tasks.queues.flow.update.queue = reque;
    map.clear();
}
