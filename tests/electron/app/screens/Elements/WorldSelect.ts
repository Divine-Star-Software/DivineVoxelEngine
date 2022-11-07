import { Worlds } from "../Worlds.js";
import { ElementTreeData } from "../libs/ElementTree/index";


const WorldSelection = (
 title: string,
 description: string,
 world: string
): ElementTreeData => {
 return [
  {
   type: "div",
   attrs: {
    className: "world-selection",
   },
   events: {
    onClick: () => {
        (window as any).goToWolrd(world);
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
     type: "hr",
     attrs: {
      className: "world-selection-seperator",
     },
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

const WorldSelectionSection = (
 title: string,
 description: string
): ElementTreeData => {
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
     type: "hr",
     attrs: {
      className: "world-selection-section-seperator",
     },
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

export const WebSelectionSection = (): ElementTreeData => {
 const elements: ElementTreeData = [];
 for (const section of Worlds) {
  elements.push(
   WorldSelectionSection(section.sectionTitle, section.sectionDescription)
  );
  for (const world of section.worlds) {
   elements.push(WorldSelection(world.title, world.description, world.world));
  }
 }

 return [
  {
   type: "div",
   attrs: {
    className: "world-selection-container",
   },
   children: elements,
  },
 ];
};
