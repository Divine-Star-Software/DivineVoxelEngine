import { DVERW } from "../../../out/RichWorld/DivineStarVoxelEngineRichWorld.js";
DVERW.richData.registerInitalDataForVoxel("dve_dataholder", {
    data: "THIS A PLACE HOLDER DATA",
});
await DVERW.$INIT();
const currentPickedVector = { x: 0, y: 0, z: 0 };
DVERW.parentComm.listenForMessage("save-richdata", (data) => {
    DVERW.richData.setData(currentPickedVector.x, currentPickedVector.y, currentPickedVector.z, data[1]);
});
DVERW.worldComm.listenForMessage("pick-voxel", (data) => {
    currentPickedVector.x = data[1];
    currentPickedVector.y = data[2];
    currentPickedVector.z = data[3];
    const richData = DVERW.richData.getData(currentPickedVector.x, currentPickedVector.y, currentPickedVector.z);
    if (richData) {
        DVERW.parentComm.sendMessage("display-richdata", [richData]);
    }
});
self.DVERW = DVERW;
