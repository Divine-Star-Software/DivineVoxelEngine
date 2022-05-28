import { RegisterVoxelsForBuilderThread } from "../../Shared/Functions/RegisterVoxelsBuilderThread.js";
import { DVEB } from "../../../out/Builder/DivineVoxelEngineBuilder.js";
RegisterVoxelsForBuilderThread(DVEB);
await DVEB.$INIT({ onReady: () => { } });
if (DVEB.environment == "browser") {
    self.DVEB = DVEB;
}
