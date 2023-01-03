import { StarCommander } from "../StarCommander.js";
import { Console } from "../Core/Console.js";
import { Scene } from "../Core/Scene.js";
export const IO = {
    scene: Scene,
    console: Console,
    displayText(text) {
        this.console.addText(text);
        this.scene.renderLog();
    },
    error(text) {
        this.console.addText(`ERROR: ${text}`);
        this.scene.renderLog();
    },
    clear() {
        this.console.clear();
        this.scene.clearCanvas();
        this.scene.renderConsole();
    },
    exit() {
        StarCommander.setActive(false);
    },
};
