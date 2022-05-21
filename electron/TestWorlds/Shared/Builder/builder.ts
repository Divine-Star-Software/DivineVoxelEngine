import { RegisterVoxelsForBuilderThread } from "../../Shared/Functions/RegisterVoxelsBuilderThread.js";
import { DVEB } from "../../../out/Builder/DivineVoxelEngineBuilder.js";

(async () => {
 RegisterVoxelsForBuilderThread(DVEB);
 await DVEB.$INIT({ onReady: () => {} });
})();

