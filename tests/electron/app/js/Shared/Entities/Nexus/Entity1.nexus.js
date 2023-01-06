import { DataTool } from "../../../../out/Tools/Data/DataTool.js";
const dataTool = new DataTool();
export const Entity1NexusData = {
    type: "item",
    boundingBox: { width: 1, height: 1, depth: 1 },
    numStates: 4,
};
export class Entity1Nexus {
    position;
    states;
    active;
    $INIT(DVEN, data, otherData) {
        setTimeout(() => {
            setInterval(() => {
                if (!dataTool.loadInAt(this.position[0] >> 0, (this.position[1] - 1) >> 0, this.position[2] >> 0))
                    return;
                if (dataTool.isAir()) {
                    this.position[1] -= 0.1;
                }
            }, 20);
        }, 2000);
    }
    onSpawn() { }
    onDeSpawn() { }
    update() { }
}
