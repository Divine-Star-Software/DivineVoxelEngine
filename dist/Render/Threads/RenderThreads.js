import { Util } from "../../Global/Util.helper.js";
import { ThreadComm } from "threadcomm";
export const WorldComm = ThreadComm.createComm("world");
export const RichWorldComm = Util.merge(ThreadComm.createComm("rich-world"), {
    $INIT() {
        RichWorldComm.connectToComm(WorldComm);
    },
});
export const NexusComm = Util.merge(ThreadComm.createComm("nexus"), {
    $INIT() {
        NexusComm.connectToComm(WorldComm);
        if (RichWorldComm.isPortSet()) {
            NexusComm.connectToComm(RichWorldComm);
        }
    },
});
export const FXComm = Util.merge(ThreadComm.createComm("fx"), {
    $INIT() {
        FXComm.connectToComm(WorldComm);
        if (RichWorldComm.isPortSet()) {
            FXComm.connectToComm(RichWorldComm);
        }
    },
});
export const DataComm = Util.merge(ThreadComm.createComm("data-loader"), {
    $INIT() {
        DataComm.connectToComm(WorldComm);
        if (RichWorldComm.isPortSet()) {
            DataComm.connectToComm(RichWorldComm);
        }
    },
});
export const ConstructorCommManager = Util.merge(ThreadComm.createCommManager({
    name: "constructor",
    onPortSet(port, commName) { },
}), {
    $INIT() {
        for (const constructor of ConstructorCommManager.__comms) {
            WorldComm.connectToComm(constructor);
        }
        if (RichWorldComm.isPortSet()) {
            for (const constructor of ConstructorCommManager.__comms) {
                constructor.connectToComm(RichWorldComm);
            }
        }
    },
    syncTextureData(dasta) {
        for (const constructor of ConstructorCommManager.__comms) {
            constructor.runTasks("sync-uv-texuture-data", dasta);
        }
    },
    setConstructors(constructors) {
        ConstructorCommManager.addPorts(constructors);
    },
});
