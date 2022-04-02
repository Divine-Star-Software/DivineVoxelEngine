import { Worlds } from "../../Worlds.js";
const { ipcRenderer } = require("electron");
const WorldSelection = (title, description, world) => {
    return [
        {
            type: "div",
            attrs: {
                className: "world-selection",
            },
            events: {
                onClick: () => {
                    ipcRenderer.send("world", world);
                },
            },
            children: [
                {
                    type: "p",
                    attrs: {
                        className: "world-selection-title",
                    },
                    text: title,
                },
                {
                    type: "p",
                    attrs: {
                        className: "world-selection-description",
                    },
                    text: description,
                },
            ],
        },
    ];
};
const WorldSelectionSection = (title, description) => {
    return [
        {
            type: "div",
            attrs: {
                className: "world-selection-section",
            },
            children: [
                {
                    type: "p",
                    attrs: {
                        className: "world-selection-section-title",
                    },
                    text: title,
                },
                {
                    type: "p",
                    attrs: {
                        className: "world-selection-section-description",
                    },
                    text: description,
                },
            ],
        },
    ];
};
export const WebSelectionSection = () => {
    const elements = [];
    for (const section of Worlds) {
        elements.push(WorldSelectionSection(section.sectionTitle, section.sectionDescription));
        for (const world of section.worlds) {
            elements.push(WorldSelection(world.title, world.description, world.world));
        }
    }
    return [
        {
            type: "div",
            attrs: {
                className: "world-selection-section",
            },
            children: elements,
        },
    ];
};
