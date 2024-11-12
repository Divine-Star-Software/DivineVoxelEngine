import { IWGTaskBaseInterface } from "./IWGTaskBase";

export class IWGTaskRegister {
  static tasks = new Map<string, IWGTaskBaseInterface>();

  static registerTask(...taskClass: IWGTaskBaseInterface[]) {
    taskClass.forEach((_) => {
      this.tasks.set(_.Data.id, _);
    });
  }

  static getClass(id: string) {
    const taskClass = this.tasks.get(id);
    if (!taskClass) throw new Error(`Task with id ${id} does not exist`);
    return taskClass;
  }
}
