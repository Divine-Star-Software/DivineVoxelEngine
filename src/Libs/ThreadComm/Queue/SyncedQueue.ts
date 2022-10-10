export class SyncedQueue {
	states = new Uint32Array();
	constructor(public id: string, public sab: SharedArrayBuffer) {
		this.states = new Uint32Array(sab);
	}

	addToCount(total = 1) {
		Atomics.add(this.states, 0, total);
	}
	subtractFromCount(total = 1) {
		Atomics.sub(this.states, 0, total);
	}
}
