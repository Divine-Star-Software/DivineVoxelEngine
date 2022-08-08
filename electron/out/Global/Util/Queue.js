class QueueNode {
    data;
    next;
    constructor(data) {
        this.data = data;
    }
}
export class Queue {
    size = 0;
    first;
    last;
    enqueue(data) {
        const node = new QueueNode(data);
        if (this.size == 0) {
            this.first = node;
            this.last = node;
        }
        else {
            this.last.next = node;
            this.last = node;
        }
        this.size++;
    }
    dequeue() {
        if (this.size == 0)
            return null;
        if (!this.first)
            return null;
        let prevFirst = this.first;
        this.first = prevFirst.next;
        prevFirst.next = null;
        this.size--;
        return prevFirst.data;
    }
}
