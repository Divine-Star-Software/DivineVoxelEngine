class QueueNode<T> {
	next: QueueNode<T> | null;
	constructor(public data: T) {}
}
//test
export class Queue<T> {
	size = 0;

	first: QueueNode<T> | null;
	last: QueueNode<T> | null;

	enqueue(data: T) {
		const node = new QueueNode(data);
		if (this.size == 0) {
			this.first = node;
			this.last = node;
		} else {
			(this as any).last.next = node;
			this.last = node;
		}
		this.size++;
	}

	dequeue() {
		if (this.size == 0) return null;
		if (!this.first) return null;
		let prevFirst = this.first;
		this.first = prevFirst.next;
		prevFirst.next = null;
		this.size--;
		return prevFirst.data;
	}
}
