import type { PaintTasks, UpdateTasks } from "Meta/Tasks/Tasks.types.js";
export declare function EreaseAndUpdate(data: UpdateTasks): Promise<boolean>;
export declare function PaintAndUpdate(data: PaintTasks): Promise<false | undefined>;
