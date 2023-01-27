export class SyncedQueue {
    id;
    sab;
    states = new Uint32Array();
    constructor(id, sab) {
        this.id = id;
        this.sab = sab;
        this.states = new Uint32Array(sab);
    }
    addToCount(total = 1) {
        Atomics.add(this.states, 0, total);
    }
    subtractFromCount(total = 1) {
        Atomics.sub(this.states, 0, total);
    }
    getCount() {
        return Atomics.load(this.states, 0);
    }
    isDone() {
        return this.getCount() == 0;
    }
    onDone(onDone) {
        const inte = setInterval(() => {
            if (this.getCount() == 0) {
                clearInterval(inte);
                onDone();
            }
        }, 1);
    }
    wait() {
        return new Promise((resolve, reject) => {
            this.onDone(() => {
                resolve(true);
            });
        });
    }
}
