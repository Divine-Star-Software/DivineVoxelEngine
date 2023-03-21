import type { VoxelUpdateTasks, UpdateTasks } from "Meta/Tasks/Tasks.types.js";
export declare function EreaseAndUpdate(data: UpdateTasks): Promise<boolean>;
export declare function PaintAndUpdate(data: VoxelUpdateTasks): Promise<false | undefined>;
export declare function VoxelUpdate(data: VoxelUpdateTasks): Promise<false | undefined>;
