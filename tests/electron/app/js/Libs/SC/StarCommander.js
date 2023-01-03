import { IO } from "./IO/IO.js";
import { Commands } from "./Commands/Commands.js";
import { Console } from "./Core/Console.js";
import { Scene } from "./Core/Scene.js";
export const StarCommander = {
    active: true,
    activeKey: ["F3"],
    canvas: {},
    commands: Commands,
    IO: IO,
    setActive(active) {
        this.active = active;
        this.canvas.style.display = this.active ? "block" : "none";
    },
    $INIT() {
        const canvas = document.createElement("canvas");
        this.canvas = canvas;
        document.body.append(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.position = "absolute";
        canvas.style.zIndex = "100000000";
        canvas.style.left = "0";
        canvas.style.top = "0";
        this.setActive(false);
        addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            Scene.resize(canvas.width, canvas.height);
            Scene.fullReRender();
        });
        addEventListener("wheel", (e) => {
            if (e.deltaY < 0) {
                Console.moveCursor("up", true);
                Scene.fullReRender();
            }
            if (e.deltaY > 0) {
                Console.moveCursor("down", true);
                Scene.fullReRender();
            }
        });
        addEventListener("keydown", (ev) => {
            const key = ev.key;
            if (this.activeKey.includes(key)) {
                this.active = !this.active;
                this.setActive(this.active);
            }
            if (!this.active)
                return;
            ev.stopPropagation();
            if (key == "Enter") {
                Console.addActiveText();
                Commands.run(Console.acitveText);
                Console.centerAtBottom();
                Scene.fullReRender();
                return;
            }
            if (key == "Backspace") {
                Console.removeFromActiveText();
                Scene.renderConsole();
            }
            if (key == "ArrowUp") {
                Console.moveCursor("up");
                Scene.renderConsole();
            }
            if (key == "ArrowDown") {
                Console.moveCursor("down");
                Scene.renderConsole();
            }
            if (key == "ArrowLeft") {
                Console.moveCursor("left");
                Scene.renderConsole();
            }
            if (key == "ArrowRight") {
                Console.moveCursor("right");
                Scene.renderConsole();
            }
            if (key.length > 1)
                return;
            Console.addToActiveText(ev.key);
            Scene.renderConsole();
        });
        const context = canvas.getContext("2d");
        if (!context)
            return;
        Scene.$INIT(context);
        Console.$INIT();
        Scene.resize(canvas.width, canvas.height);
        Scene.renderLog();
        Scene.renderConsole();
    },
};
