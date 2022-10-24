export class Controller {
    inputFunctions = {
        string: (elm) => {
            if (elm.type == "checkbox") {
                return elm.checked ? "true" : "false";
            }
            return String(elm.value);
        },
        number: (elm) => {
            if (elm.type == "checkbox") {
                return elm.checked ? 1 : 0;
            }
            return Number(elm.value);
        },
        boolean: (elm) => {
            if (elm.type == "checkbox") {
                return elm.checked ? true : false;
            }
            return Boolean(elm.value);
        },
    };
    statefulObjectMap = {};
    cascadeObjectMap = {};
    releaseAll() {
        this.statefulObjectMap = {};
        this.cascadeObjectMap = {};
    }
    releaseComponent(id) {
        delete this.statefulObjectMap[id];
    }
    //@ts-ignore
    elementTree;
    registerStatefulComponent(elmObj, componentElm) {
        if (!elmObj.component) {
            throw new Error("Must have a the component property set.");
        }
        if (!elmObj.component.stateProps.__id) {
            throw new Error("Stateful props must be created through 'ElementTree.stateful'. Props do not contain id.");
        }
        componentElm.dataset["__componentid"] = elmObj.component.stateProps.__id;
        this.statefulObjectMap[elmObj.component.stateProps.__id] = {
            componentElement: componentElm,
            state: elmObj.component.stateObject,
            props: elmObj.component.stateProps,
            component: elmObj.component.func,
        };
    }
    generateCascadeId(props) {
        props.__id = this.getId();
        return props;
    }
    registerCascadeElement(elmObj, elm) {
        if (!elmObj.cascade)
            return;
        if (!elmObj.cascade.origin)
            return;
        if (!this.cascadeObjectMap[elmObj.cascade.origin.__id]) {
            const elementMap = new Map();
            elementMap.set(elm, elmObj.cascade.receiver);
            this.cascadeObjectMap[elmObj.cascade.origin.__id] = {
                elements: elementMap,
                props: elmObj.cascade.origin,
            };
        }
        else {
            this.cascadeObjectMap[elmObj.cascade.origin.__id].elements.set(elm, elmObj.cascade.receiver);
        }
        elm.dataset["__cascade"] = elmObj.cascade.origin.__id;
    }
    runCascade(props) {
        const data = this.cascadeObjectMap[props.__id];
        if (!data)
            return false;
        data.elements.forEach((value, key) => {
            value(key, data.props);
        });
        return true;
    }
    releaseCascade(props) {
        if (!this.cascadeObjectMap[props.__id])
            return false;
        delete this.cascadeObjectMap[props.__id];
        delete props.__id;
        return true;
    }
    releaseElementFromCascade(id, elm) {
        if (!this.cascadeObjectMap[id])
            return false;
        const elms = this.cascadeObjectMap[id].elements;
        if (!elms.get(elm))
            return false;
        elms.delete(elm);
        return true;
    }
    __unqiueId4() {
        return Math.floor((1 + Math.random()) * 0x1000000).toString(16);
    }
    getId() {
        return `${this.__unqiueId4()}-${this.__unqiueId4()}-${this.__unqiueId4()}`;
    }
    getStateObject(id) {
        if (!this.statefulObjectMap[id])
            return false;
        return this.statefulObjectMap[id].state;
    }
    getComponentElement(id) {
        const data = this.statefulObjectMap[id];
        if (!data)
            return false;
        return data.componentElement;
    }
    runStateChange(props, newState, onChange = () => { }) {
        if (!props.__id)
            return false;
        const data = this.statefulObjectMap[props.__id];
        if (!data)
            return false;
        data.state = newState;
        const elm = data.componentElement;
        if (elm.children.length > 0) {
            for (let i = 0; i < elm.children.length; i++) {
                this.elementTree.elementCreator.safetlyRemoveElement(elm.children[i]);
            }
        }
        data.componentElement.innerHTML = "";
        onChange();
        this.elementTree.elementCreator.createElements([data.component(props)[0]], data.componentElement);
    }
    bindInput(elm, elmObj) {
        if (!elmObj.bindInput)
            return;
        elm.dataset["value_type"] =
            elmObj.bindInput.valueType;
        const bound = elmObj.bindInput.bindTo;
        const boundKey = elmObj.bindInput.objectPropertyName;
        elm.value = bound[boundKey];
        elm.addEventListener("input", (ev) => {
            if (!ev.target)
                return;
            const target = ev.target;
            const valueType = target.dataset["value_type"];
            if (!valueType)
                return;
            const newInput = this.inputFunctions[valueType](target);
            bound[boundKey] = newInput;
        });
    }
}
