import {
  ControlInputData,
  ControlInputDataNode,
  ControlInputTypes,
} from "Types/Control.types";
import { ControlEventTypes } from "Types/Event.types";

export abstract class DivineControlEvent<T extends ControlInputTypes> {
  abstract readonly eventType: ControlEventTypes;
  abstract readonly inputType : ControlInputTypes;
  private data: ControlInputDataNode<T>;
  constructor() {}

  getData() {
    return this.data;
  }
  setData(data: ControlInputDataNode<T>) {
    this.data = data;
    return this;
  }
}
