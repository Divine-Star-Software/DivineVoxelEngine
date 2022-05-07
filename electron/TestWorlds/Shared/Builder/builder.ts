import { RegisterVoxelsForBuilderThread } from "../../Shared/Functions/RegisterVoxelsBuilderThread.js";
import { DVEB } from "../../../out/index.js";

(async () => {
 RegisterVoxelsForBuilderThread(DVEB);
 await DVEB.$INIT({ onReady: () => {} });

})();

//DVEB.worldMatrix.
