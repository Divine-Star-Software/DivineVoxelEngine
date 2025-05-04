import { Threads } from "@amodx/threads";
import { TasksIds } from "../TasksIds";
import {
  EraseVoxelPathTask,
  EraseVoxelTask,
  EraseVoxelTemplateTask,
  PaintVoxelPathTask,
  PaintVoxelTask,
  PaintVoxelTemplateTask,
} from "../Tasks.types";
import { EraseVoxel } from "./Erase/EraseVoxel";
import { PaintVoxel } from "./Paint/PaintVoxel";
import PaintVoxelTemplate from "./Paint/PaintVoxelTemplate";
import EraseVoxelTemplate from "./Erase/EraseVoxelTemplate";
import PaintVoxelPath from "./Paint/PaintVoxelPath";
import EraseVoxelPath from "./Erase/EraseVoxelPath";
export default function () {
  Threads.registerTask<PaintVoxelTask>(TasksIds.PaintVoxel, (data) =>
    PaintVoxel(...data)
  );
  Threads.registerTask<PaintVoxelTemplateTask>(
    TasksIds.PaintVoxelTemplate,
    (data) => PaintVoxelTemplate(...data)
  );
  Threads.registerTask<PaintVoxelPathTask>(TasksIds.PaintVoxelPath, (data) =>
    PaintVoxelPath(...data)
  );
  Threads.registerTask<EraseVoxelTask>(TasksIds.EraseVoxel, (data) =>
    EraseVoxel(...data)
  );
  Threads.registerTask<EraseVoxelTemplateTask>(
    TasksIds.EraseVoxelTemplate,
    (data) => EraseVoxelTemplate(...data)
  );
  Threads.registerTask<EraseVoxelPathTask>(TasksIds.EraseVoxelPath, (data) =>
    EraseVoxelPath(...data)
  );
}
