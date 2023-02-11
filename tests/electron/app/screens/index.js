import { ElementTree } from "./libs/index.js";
import { WebSelectionSection } from "./Elements/WorldSelect.js";
import { DVELogo } from "./Elements/DVELogo.js";
import { CreateScene } from "./background/CreateScene.js";
import { div, hformOptionSelect } from "./Elements/forms.js";
ElementTree.linkCSS(import.meta.url, "main.css");
localStorage.removeItem("current-world");
let graphicsSettings = localStorage.getItem("graphics");
if (!graphicsSettings) {
    graphicsSettings = "medium";
    localStorage.setItem("graphics", "medium");
}
const HomeScreen = () => {
    return [
        {
            type: "section",
            attrs: {
                className: "home-screen",
            },
            children: [
                div("main-screen", [
                    DVELogo(),
                    {
                        type: "h1",
                        attrs: {
                            className: "dve-logo",
                        },
                        text: "Divine Voxel Engine",
                    },
                    {
                        type: "h2",
                        attrs: {
                            className: "dve-version",
                        },
                        text: "Alpha 1.3.1",
                    },
                    {
                        type: "h6",
                        attrs: {
                            className: "graphics-level-title",
                        },
                        text: "Graphics Level",
                    },
                    hformOptionSelect([
                        {
                            text: "Low",
                            value: "low",
                            active: graphicsSettings == "low",
                        },
                        {
                            text: "Medium",
                            value: "medium",
                            active: graphicsSettings == "medium",
                        },
                        {
                            text: "High",
                            value: "high",
                            active: graphicsSettings == "high",
                        },
                        {
                            text: "Ultra",
                            value: "ultra",
                            active: graphicsSettings == "ultra",
                        },
                    ], (value) => {
                        localStorage.setItem("graphics", value);
                    }),
                    WebSelectionSection(),
                ]),
            ],
        },
    ];
};
CreateScene();
ElementTree.bloomRoot(HomeScreen());
