import { CSSLinker } from "./CSSLinker/CSSLinker.js";
import { Controller } from "./Controler/Controler.js";
import { ElementCreator } from "./ElementCreator/ElementCreator.js";
export const ElementTree = {
    controller: new Controller(),
    elementCreator: new ElementCreator(),
    CSSLinker: new CSSLinker(),
    bloomRoot: function (tree) {
        this.elementCreator.createElements(tree, document.body);
    },
    bloomBranch: function (tree, elm) {
        this.elementCreator.createElements(tree, elm);
    },
    decayRoot: function () { },
    decayBranch: function (elm) { },
    linkCSS: function (importMetalURL, path) {
        this.CSSLinker.loadAndAppendCSS(importMetalURL, path);
    },
    stateful: function (props, data, onChange = () => { }) {
        let statefulObject;
        let id = "";
        if (props.__id) {
            id = props.__id;
        }
        else {
            id = ElementTree.controller.getId();
            props.__id = id;
        }
        const stateData = ElementTree.controller.getStateObject(id);
        if (stateData) {
            statefulObject = stateData;
        }
        else {
            statefulObject = Object.freeze(data);
        }
        return [
            statefulObject,
            (set) => {
                const newState = {};
                for (const key of Object.keys(statefulObject)) {
                    if (set[key]) {
                        //@ts-ignore
                        newState[key] = set[key];
                    }
                    else {
                        //@ts-ignore
                        newState[key] = statefulObject[key];
                    }
                }
                ElementTree.controller.runStateChange(props, newState, onChange);
            },
            props,
        ];
    },
    cascade: function (props) {
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
        __register: {},
        add: function (id, props) {
            if (this.get(id))
                return false;
            this.__register[id] = props;
            return true;
        },
        get: function (id) {
            return this.__register[id];
        },
        release: function (id) {
            if (!this.get(id))
                return false;
            delete this.__register[id];
            return true;
        },
    },
};
//@ts-ignore
ElementTree.elementCreator.elementTree = ElementTree;
//@ts-ignore
ElementTree.controller.elementTree = ElementTree;
