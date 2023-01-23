import { Priorities } from "Meta/Tasks/Tasks.types";

export const TasksQueue = {
 tasks: <Map<Priorities, [id: string, data: any][]>>new Map(),

 addTasks(priority: Priorities, data: any, run: (data: any) => void) {
  const tasks = this.tasks.get(priority);
  if (!tasks) return;
  tasks.push([data, run]);
 },

 $INIT() {
  this.tasks.set(0, []);
  this.tasks.set(1, []);
  this.tasks.set(2, []);
  this.tasks.set(3, []);

  setInterval( () => {
   for (const [priority, tasks] of this.tasks) {
    if (tasks.length) {
     const node = tasks.shift();
     if (!node) return;
     node[1](node[0]);
     break;
    }
   }
  }, 50);
 },
};
