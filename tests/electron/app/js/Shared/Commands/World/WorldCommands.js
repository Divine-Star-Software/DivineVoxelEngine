import { LightData } from "../../../../out/Data/Light/LightByte.js";
import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export function GetWorldCommands() {
    const TC = DVEW.TC;
    const dataTool = DVEW.getDataTool();
    TC.parent.listenForMessage("sc-load-in", (data) => {
        const dimension = data[1];
        const x = data[2];
        const y = data[3];
        const z = data[4];
        if (!dataTool.loadInAt(x, y, z)) {
            TC.parent.sendMessage("sc-send-data", [`No data at: ${x} ${y} ${z}`]);
            return false;
        }
        TC.parent.sendMessage("sc-send-data", [`Data loaded in.`]);
        return false;
    });
    TC.parent.listenForMessage("sc-get-data", (data) => {
        const dimension = data[1];
        const x = data[2];
        const y = data[3];
        const z = data[4];
        const l = dataTool.getLight();
        let logData = `|||||||||||||||||||||||||||||
# Data For ${dimension} ${x} ${y} ${z}   
|||||||||||||||||||||||||||||
> raw : ${dataTool.data.raw}
> id: ${dataTool.getId()}
> string id: ${dataTool.getStringId()}
> state: ${dataTool.getState()}
> shape state: ${dataTool.getShapeState()}
> level: ${dataTool.getLevel()}
> level state: ${dataTool.getLevelState()}
> light value: ${l}
> s: ${LightData.getS(l)}
> r: ${LightData.getR(l)}
> g: ${LightData.getG(l)}
> b: ${LightData.getB(l)}
|||||||||||||||||||||||||||||
   `;
        TC.parent.sendMessage("sc-send-data", [logData]);
    });
}
