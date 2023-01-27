import { DVER } from "../../../../out/Render/DivineVoxelEngineRender.js";
import { StarCommander } from "../../../Libs/SC/StarCommander.js";
export function InitalizeCommands() {
    const TC = DVER.TC;
    StarCommander.commands.registerCommand({
        id: "render",
        note: "Update render settings.",
        arguments: [
            {
                fullId: "base_level",
                shortId: "bl",
                required: false,
                type: "number",
                note: "Base level color for voxels",
            },
            {
                fullId: "sun_level",
                shortId: "sl",
                required: false,
                type: "number",
                note: "Sun light level for voxels",
            },
        ],
        run(done, io, args) {
            if (args.base_level) {
                DVER.render.setBaseLevel(args.base_level);
            }
            if (args.sun_level) {
                DVER.render.setSunLevel(args.sun_level);
            }
            done();
        },
    });
    let dimension = "main";
    const position = [];
    StarCommander.commands.registerCommand({
        id: "data",
        note: "Work directly with world data.",
        arguments: [
            {
                fullId: "load_in",
                shortId: "l",
                required: false,
                type: "number-array",
                length: 3,
                note: "Load in data at this position.",
            },
            {
                fullId: "all_data",
                shortId: "a",
                required: false,
                type: "boolean",
                note: "Display all data.",
            },
            {
                fullId: "dimension",
                shortId: "d",
                required: false,
                type: "string",
                note: "Set the current dimension.",
            },
        ],
        run(done, io, args) {
            if (args.dimension) {
                dimension = args.dimension;
                io.displayText(`Dimension has been set to ${dimension}`);
            }
            if (args.load_in) {
                const pos = args.load_in;
                DVER.worldComm.messageFunctions["sc-send-data"] = [];
                DVER.worldComm.listenForMessage("sc-send-data", (data) => {
                    console.log(data);
                    io.displayText(data[1]);
                    done();
                });
                position[0] = pos[0];
                position[1] = pos[1];
                position[2] = pos[2];
                DVER.worldComm.sendMessage("sc-load-in", [
                    dimension,
                    pos[0],
                    position[1],
                    position[2],
                ]);
                return;
            }
            if (args.all_data) {
                const pos = args.load_in;
                DVER.worldComm.messageFunctions["sc-send-data"] = [];
                DVER.worldComm.listenForMessage("sc-send-data", (data) => {
                    console.log(data);
                    io.displayText(data[1]);
                    done();
                });
                DVER.worldComm.sendMessage("sc-get-data", [
                    dimension,
                    position[0],
                    position[1],
                    position[2],
                ]);
                return;
            }
            done();
        },
    });
    StarCommander.$INIT();
}
