import { CSSLinker } from "./CSSLinker/CSSLinker.js";
import { Component } from "Meta/Components/Component.type.js";
import { ElementTreeData } from "Meta/Elements/ElementTreeData.types.js";
import { ElementTreeInterface } from "Meta/ElementTree.interface.js";
import { Controller } from "./Controler/Controler.js";
import { ElementCreator } from "./ElementCreator/ElementCreator.js";

export const ElementTree = {
 controller: new Controller(),
 elementCreator: new ElementCreator(),
 CSSLinker: new CSSLinker(),
 bloomRoot: function (tree: ElementTreeData) {
  this.elementCreator.createElements(tree, document.body);
 },
 bloomBranch: function (tree: ElementTreeData, elm: HTMLElement) {
  this.elementCreator.createElements(tree, elm);
 },

 decayRoot: function () {},
 decayBranch: function (elm: HTMLElement) {},
 linkCSS: function (importMetalURL: string , path: string, ) {
  this.CSSLinker.loadAndAppendCSS(importMetalURL, path) ;
 },
 stateful: function <K, T>(
  props: K,
  data: T,
  onChange: Function = () => {}
 ): [T, (set: Record<keyof T, any>) => void, K] {
  let statefulObject: any;

  let id = "";
  if ((props as any).__id) {
   id = (props as any).__id;
  } else {
   id = ElementTree.controller.getId();
   (props as any).__id = id;
  }

  const stateData = ElementTree.controller.getStateObject(id);
  if (stateData) {
   statefulObject = stateData;
  } else {
   statefulObject = Object.freeze(data);
  }

  return [
   statefulObject,
   (set: Record<keyof T, any>) => {
    const newState: any = {};
    for (const key of Object.keys(statefulObject)) {
     if ((set as any)[key]) {
      //@ts-ignore
      newState[key] = set[key];
     } else {
      //@ts-ignore
      newState[key] = statefulObject[key];
     }
    }

    ElementTree.controller.runStateChange(props, newState, onChange);
   },
   props,
  ];
 },
 cascade: function (props: any): [() => boolean, () => boolean] {
  ElementTree.controller.generateCascadeId(props);
  return [
   () => {
    return ElementTree.controller.runCascade(props);
   },
   () => {
    return ElementTree.controller.releaseCascade(props);
   },
  ];
 },
 register: {
  __register: <Record<string, any>>{},
  add: function (id: string, props: any) {
   if ((this as any).get(id)) return false;
   (this as any).__register[id] = props;
   return true;
  },
  get: function (id: string) {
   return (this as any).__register[id];
  },
  release: function (id: string) {
   if (!(this as any).get(id)) return false;
   delete (this as any).__register[id];
   return true;
  },
 },
};
//@ts-ignore
ElementTree.elementCreator.elementTree = ElementTree;
//@ts-ignore
ElementTree.controller.elementTree = ElementTree;
