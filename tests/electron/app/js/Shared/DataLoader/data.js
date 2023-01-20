import { DVEDL } from "../../../out/DataLoader/DivineVoxelEngineDataLoader.js";
import { DataHanlder } from "./DataHandler.js";
await DVEDL.$INIT(DataHanlder);
self.DVEDL = DVEDL;
