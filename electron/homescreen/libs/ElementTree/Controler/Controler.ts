import type { ElementTreeInterface } from "Meta/ElementTree.interface";
import type {
  ElementTreeData,
  ElementTreeObject,
  InputValueTypes,
} from "Meta/Elements/ElementTreeData.types";
export class Controller {
  inputFunctions: Record<InputValueTypes, (elm: HTMLInputElement) => void> = {
    string: (elm: HTMLInputElement) => {
      if (elm.type == "checkbox") {
        return elm.checked ? "true" : "false";
      }
      return String(elm.value);
    },
    number: (elm: HTMLInputElement) => {
      if (elm.type == "checkbox") {
        return elm.checked ? 1 : 0;
      }
      return Number(elm.value);
    },
    boolean: (elm: HTMLInputElement) => {
      if (elm.type == "checkbox") {
        return elm.checked ? true : false;
      }
      return Boolean(elm.value);
    },
  };

  statefulObjectMap: Record<
    string,
    {
      componentElement: HTMLElement;
      state: any;
      props: any;
      component: Function;
    }
  > = {};

  cascadeObjectMap: Record<
    string,
    {
      elements: Map<HTMLElement, Function>;
      props: any;
    }
  > = {};

  releaseAll() {
    this.statefulObjectMap = {};
    this.cascadeObjectMap = {};
  }

  releaseComponent(id: string) {
    delete this.statefulObjectMap[id];
  }

  //@ts-ignore
  elementTree: ElementTreeInterface;

  registerStatefulComponent(
    elmObj: ElementTreeObject,
    componentElm: HTMLElement
  ) {
    if (!elmObj.component) {
      throw new Error("Must have a the component property set.");
    }
    if (!elmObj.component.stateProps.__id) {
      throw new Error(
        "Stateful props must be created through 'ElementTree.stateful'. Props do not contain id."
      );
    }

    componentElm.dataset["__componentid"] = elmObj.component.stateProps.__id;
    this.statefulObjectMap[elmObj.component.stateProps.__id] = {
      componentElement: componentElm,
      state: elmObj.component.stateObject,
      props: elmObj.component.stateProps,
      component: elmObj.component.func,
    };
  }

  generateCascadeId(props: any) {
    props.__id = this.getId();
    return props;
  }

  registerCascadeElement(elmObj: ElementTreeObject, elm: HTMLElement) {
    if (!elmObj.cascade) return;
    if (!elmObj.cascade.origin) return;

    if (!this.cascadeObjectMap[elmObj.cascade.origin.__id]) {
      const elementMap = new Map<HTMLElement, Function>();
      elementMap.set(elm, elmObj.cascade.receiver);
      this.cascadeObjectMap[elmObj.cascade.origin.__id] = {
        elements: elementMap,
        props: elmObj.cascade.origin,
      };
    } else {
      this.cascadeObjectMap[elmObj.cascade.origin.__id].elements.set(
        elm,
        elmObj.cascade.receiver
      );
    }
    elm.dataset["__cascade"] = elmObj.cascade.origin.__id;
  }

  runCascade(props: any) {
    const data = this.cascadeObjectMap[props.__id];
    if (!data) return false;
    data.elements.forEach((value, key) => {
      value(key, data.props);
    });
    return true;
  }

  releaseCascade(props: any) {
    if (!this.cascadeObjectMap[props.__id]) return false;
    delete this.cascadeObjectMap[props.__id];
    delete props.__id;
    return true;
  }

  releaseElementFromCascade(id: string, elm: HTMLElement) {
    if (!this.cascadeObjectMap[id]) return false;
    const elms = this.cascadeObjectMap[id].elements;
    if (!elms.get(elm)) return false;
    elms.delete(elm);
    return true;
  }

  __unqiueId4() {
    return Math.floor((1 + Math.random()) * 0x1000000).toString(16);
  }

  getId() {
    return `${this.__unqiueId4()}-${this.__unqiueId4()}-${this.__unqiueId4()}`;
  }

  getStateObject<T>(id: string): T | false {
    if (!this.statefulObjectMap[id]) return false;
    return this.statefulObjectMap[id].state;
  }

  getComponentElement(id: string) {
    const data = this.statefulObjectMap[id];
    if (!data) return false;
    return data.componentElement;
  }

  runStateChange(props: any, newState: any, onChange: Function = () => {}) {
    if (!props.__id) return false;
    const data = this.statefulObjectMap[props.__id];
    if (!data) return false;
    data.state = newState;
    const elm = data.componentElement;

    if (elm.children.length > 0) {
      for (let i = 0; i < elm.children.length; i++) {
        this.elementTree.elementCreator.safetlyRemoveElement(
          (elm as any).children[i]
        );
      }
    }

    data.componentElement.innerHTML = "";
    onChange();
    this.elementTree.elementCreator.createElements(
      [data.component(props)[0]],
      data.componentElement
    );
  }

  bindInput(elm: HTMLInputElement, elmObj: ElementTreeObject) {
    if (!elmObj.bindInput) return;
    (elm as HTMLInputElement).dataset["value_type"] =
      elmObj.bindInput.valueType;
    const bound = elmObj.bindInput.bindTo;
    const boundKey = elmObj.bindInput.objectPropertyName;
    (elm as HTMLInputElement).value = bound[boundKey];
    (elm as HTMLInputElement).addEventListener("input", (ev) => {
      if (!ev.target) return;
      const target: any = ev.target;
      const valueType: InputValueTypes = target.dataset["value_type"];
      if (!valueType) return;
      const newInput = this.inputFunctions[valueType](target);
      bound[boundKey] = newInput;
    });
  }
}
