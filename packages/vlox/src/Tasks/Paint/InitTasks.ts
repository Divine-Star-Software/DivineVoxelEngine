import { Threads } from "@amodx/threads";
import { TasksIds } from "../TasksIds";
import {
  EraseVoxelAreaTask,
  EraseVoxelTask,
  PaintVoxelAreaTask,
  PaintVoxelTask,
  PaintVoxelTemplateTask,
} from "../Tasks.types";
import { EraseVoxel } from "./Erase/EraseVoxel";
import { PaintVoxel } from "./Paint/PaintVoxel";
import PaintVoxelArea from "./Paint/PaintVoxelArea";
import EraseVoxelArea from "./Erase/EraseVoxelArea";
import PaintVoxelTemplate from "./Paint/PaintVoxelTemplate";
import EraseVoxelTemplate from "./Erase/EraseVoxelTemplate";
export default function () {
  Threads.registerTask<PaintVoxelTask>(TasksIds.PaintVoxel, (data) => {
    PaintVoxel(data);
  });
  Threads.registerTask<PaintVoxelAreaTask>(TasksIds.PaintVoxelArea, (data) => {
    PaintVoxelArea(data);
  });
  Threads.registerTask<PaintVoxelTemplateTask>(
    TasksIds.PaintVoxelTemplate,
    (data) => {
      PaintVoxelTemplate(data);
    }
  );
  Threads.registerTask<EraseVoxelTask>(TasksIds.EraseVoxel, (data) => {
    EraseVoxel(data);
  });
  Threads.registerTask<EraseVoxelAreaTask>(TasksIds.EraseVoxelArea, (data) => {
    EraseVoxelArea(data);
  });
  Threads.registerTask<PaintVoxelTemplateTask>(
    TasksIds.EraseVoxelTemplate,
    (data) => {
      EraseVoxelTemplate(data);
    }
  );
}
