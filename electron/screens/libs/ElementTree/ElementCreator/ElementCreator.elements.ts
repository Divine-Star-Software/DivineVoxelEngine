import type {
  ElementTreeObject,
  ElementTypes,
} from "Meta/Elements/ElementTreeData.types";
import type { ElementCreator } from "./ElementCreator";

const processComponent = (
  elmObj: ElementTreeObject,
  elementCreator: ElementCreator
) => {
  if (!elmObj.component) {
    throw new Error('A component must have the "component" propety set.');
  }

  const elm = elementCreator.elementCreateFunctions[elmObj.component.element](
    elmObj,
    elementCreator
  );
  elementCreator.elementTree.controller.registerStatefulComponent(elmObj, elm);
  if (elmObj.cascade) {
    elementCreator.elementTree.controller.registerCascadeElement(elmObj, elm);
  }
  if (elmObj.attrs) {
    for (const attribute of Object.keys(elmObj.attrs)) {
      (elementCreator as any).attributeSetFunction[attribute](
        elm,
        elmObj.attrs
      );
    }
  }
  return elm;
};

export const elementCreateFunctions: Record<ElementTypes, Function> = {
  fragment: () => {
    return document.createDocumentFragment();
  },
  div: () => {
    return document.createElement("div");
  },
  span: () => {
    return document.createElement("span");
  },
  pre: () => {
    return document.createElement("pre");
  },
  code: () => {
    return document.createElement("code");
  },
  embed: () => {
    return document.createElement("embed");
  },
  param: () => {
    return document.createElement("param");
  },
  object: () => {
    return document.createElement("object");
  },
  picture: () => {
    return document.createElement("picture");
  },
  source: () => {
    return document.createElement("source");
  },
  audio: () => {
    return document.createElement("audio");
  },
  video: () => {
    return document.createElement("video");
  },
  track: () => {
    return document.createElement("video");
  },
  img: () => {
    return document.createElement("img");
  },
  svg: () => {
    return document.createElement("svg");
  },
  ul: () => {
    return document.createElement("ul");
  },
  ol: () => {
    return document.createElement("ol");
  },
  li: () => {
    return document.createElement("li");
  },
  article: () => {
    return document.createElement("article");
  },
  nav: () => {
    return document.createElement("nav");
  },
  aside: () => {
    return document.createElement("aside");
  },
  section: () => {
    return document.createElement("section");
  },
  header: () => {
    return document.createElement("header");
  },
  footer: () => {
    return document.createElement("footer");
  },
  form: () => {
    return document.createElement("form");
  },
  input: () => {
    return document.createElement("input");
  },
  label: () => {
    return document.createElement("label");
  },
  textarea: () => {
    return document.createElement("textarea");
  },
  select: () => {
    return document.createElement("select");
  },
  option: () => {
    return document.createElement("option");
  },
  optiongroup: () => {
    return document.createElement("optiongroup");
  },
  datalist: () => {
    return document.createElement("datalist");
  },
  hr: () => {
    return document.createElement("hr");
  },
  button: () => {
    return document.createElement("button");
  },
  a: () => {
    return document.createElement("a");
  },
  canvas: () => {
    return document.createElement("canvas");
  },
  iframe: () => {
    return document.createElement("iframe");
  },
  table: () => {
    return document.createElement("table");
  },
  th: () => {
    return document.createElement("th");
  },
  thead: () => {
    return document.createElement("thead");
  },
  tbody: () => {
    return document.createElement("tbody");
  },
  colgroup: () => {
    return document.createElement("colgroup");
  },
  tr: () => {
    return document.createElement("tr");
  },
  td: () => {
    return document.createElement("td");
  },
  p: () => {
    return document.createElement("p");
  },
  h1: () => {
    return document.createElement("h1");
  },
  h2: () => {
    return document.createElement("h2");
  },
  h3: () => {
    return document.createElement("h3");
  },
  h4: () => {
    return document.createElement("h4");
  },
  h5: () => {
    return document.createElement("h5");
  },
  h6: () => {
    return document.createElement("h6");
  },
  text: (elmObj: ElementTreeObject, elementCreator: ElementCreator) => {
    if (!elmObj.text) {
      throw new Error(
        'Text element must the "text" property set on the object.'
      );
    }
    return document.createTextNode(elmObj.text);
  },
  component: processComponent,
  rawHTML: (elmObj: ElementTreeObject, elementCreator: ElementCreator) => {
    if (!elmObj.rawHTML) {
      throw new Error(
        'rawHTML element must the "rawHTML" property set on the object.'
      );
    }
    const temp = document.createElement("div");
    temp.innerHTML = elmObj.rawHTML;
    if (!temp.firstChild) {
      return document.createDocumentFragment();
    } else {
      return temp.firstChild;
    }
  },
};
