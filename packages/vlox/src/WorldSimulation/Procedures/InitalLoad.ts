import { GeneratorData } from "../Dimensions/Generator"
import { WorldSimulation } from "../WorldSimulation";
import { WorldSimulationDimensions } from "../Internal/WorldSimulationDimensions"
import { WorldSimulationTools } from "../Internal/WorldSimulationTools";
import SaveAllSectors from "./SaveAllSectors";
/**# InitalLoad
 * ---
 * Load the world without building.
 */
export async function InitalLoad(props: {
  dimension?: number;
  logTasks?: true;
  genData: Partial<GeneratorData>;
}) {
  return new Promise((resolve) => {
    const generator = WorldSimulation.createGenerator({
      ...props.genData,
      building: false,
      culling: false,
    });
    if (!WorldSimulationDimensions._dimensions.has(generator._dimension)) {
      WorldSimulationDimensions.addDimension(generator._dimension);
    }
    const dimension = WorldSimulationDimensions.getDimension(
      props.dimension || 0
    );
    let done = false;
    generator._building = false;
    WorldSimulation.addGenerator(generator);

    let timeOut: any = null;
    const update = () => {
      if (done) return;

      WorldSimulation.tick(true);
      timeOut = setTimeout(update, 0);
    };
    update();

    const inte = setInterval(() => {
      let allDone = true;
      for (const [key, task] of dimension.tasks) {
        if (!task.generationTask) continue;
        if (task.waitingFor > 0 || task._task.size > 0) {
          allDone = false;
          break;
        }
      }
      if (!allDone) return;
      done = true;
      clearInterval(inte);
      clearTimeout(timeOut);
      WorldSimulation.removeGenerator(generator);
      (async () => {
        if (WorldSimulationTools.worldStorage) {
          await SaveAllSectors();
        }

        resolve(true);
      })();
    }, 250);
  });
}
