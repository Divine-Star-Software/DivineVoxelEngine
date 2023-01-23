export const TasksQueue = {
    tasks: new Map(),
    addTasks(priority, data, run) {
        const tasks = this.tasks.get(priority);
        if (!tasks)
            return;
        tasks.push([data, run]);
    },
    $INIT() {
        this.tasks.set(0, []);
        this.tasks.set(1, []);
        this.tasks.set(2, []);
        this.tasks.set(3, []);
        setInterval(() => {
            for (const [priority, tasks] of this.tasks) {
                if (tasks.length) {
                    const node = tasks.shift();
                    if (!node)
                        return;
                    node[1](node[0]);
                    break;
                }
            }
        }, 50);
    },
};
