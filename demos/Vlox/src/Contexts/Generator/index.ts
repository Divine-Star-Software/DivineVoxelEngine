import { StartGenerator } from "@divinevoxel/vlox/Init/StartGenerator";
import { WorldGen } from "./WorldGen";
import { Forest } from "./Types/Forest";
import { Threads } from "@amodx/threads";
import { DreamEther } from "./Types/DreamEther";
import { DreadEther } from "./Types/DreadEther";
import { GenType } from "./Types/GenType.interface";
import { Classic } from "./Types/Classic";
import { DreadAndDreamWorld } from "./Types/DreadAndDreamWorld";
const gen = new WorldGen();
gen.init();
await StartGenerator({});

Threads.registerTask("set-gen-type", (type) => {
  let genType: GenType;
  switch (type) {
    case "forest":
      genType = new Forest();
      break;
    case "dream-ether":
      genType = new DreamEther();
      break;
    case "dread-ether":
      genType = new DreadEther();
      break;
    case "dread-and-dream-world":
      genType = new DreadAndDreamWorld();
      break;
    case "classic":
      genType = new Classic();
      break;
    default:
      console.error(`Unkown gen type ${type}`);
      return;
  }
  genType.init();
  gen.setGenType(genType);
});
