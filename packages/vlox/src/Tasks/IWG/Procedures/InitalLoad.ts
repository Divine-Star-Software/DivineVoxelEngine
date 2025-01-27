import { GeneratorData } from "../Internal/Classes/Generator";
import { IWG } from "../IWG";
import { IWGDimensions } from "../Internal/IWGDimensions";
import { IWGTools } from "../Internal/IWGTools";
import SaveAllColumns from "./SaveAllColumns";

/**# InitalLoad
 * ---
 * Load the world without building.
 */
export async function InitalLoad(props: {
  dimension?: string;
  logTasks?: true;
  genData: Partial<GeneratorData>;
}) {
  return new Promise((resolve) => {
    const generator = IWG.createGenerator({
      ...props.genData,
      building: false,
    });
    if (!IWGDimensions._dimensions.has(generator._dimension)) {
      IWGDimensions.addDimension(generator._dimension);
    }
    const dimension = IWGDimensions.getDimension(props.dimension || "main");
    let done = false;
    let allDoneCount = 0;
    generator._building = false;
    IWG.addGenerator(generator);

    let timeOut: any = null;
    const update = () => {
      if (done) return;

      IWG.update();
      timeOut = setTimeout(update, 0);
    };
    update();

    const inte = setInterval(() => {
      let allDone = true;
      for (const [key, task] of dimension.tasks) {
        if (task.waitingFor > 0 || task.queue.length > 0) {
          allDone = false;
          break;
        }
      }
      if(!allDone) return;
      done = true;
      clearInterval(inte);
      clearTimeout(timeOut);
      IWG.removeGenerator(generator);
      (async () => {
        if (IWGTools.worldStorage) {
          await SaveAllColumns();
        }

        resolve(true);
      })();
    }, 100);
  });
}
