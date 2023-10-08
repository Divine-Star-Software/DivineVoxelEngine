import type { GenerateTasks } from "Types/Tasks/Tasks.types";

export type WorldGenInterface = {
 generate(data : GenerateTasks): Promise<any | void>;
 decorate(data : GenerateTasks): Promise<any | void>;
};
