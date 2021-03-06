import { ElementTree, ElementTreeData } from "./libs/index.js";

import { WebSelectionSection } from "./Elements/WorldSelect.js";
import { DVELogo } from "./Elements/DVELogo.js";
import { CreateScene } from "./background/CreateScene.js";

ElementTree.linkCSS(import.meta.url, "main.css");

localStorage.clear();

const HomeScreen = (): ElementTreeData => {
 return [
  {
   type: "section",
   attrs: {
    className: "home-screen",
   },
   children: [
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
     text: "Alpha 1.1 | The Light Update",
    },
    WebSelectionSection(),
   ],
  },
 ];
};
CreateScene();
ElementTree.bloomRoot(HomeScreen());
