import { DCControl } from "Controls/DCControl";
import {
  ControlInputDataNode,
  ControlInputTypes,
} from "../Controls/Control.types";
import { ControlEventTypes } from "./Event.types";

export interface DivineControlEventConstructor<
  T extends ControlInputTypes = any
> {
  eventType: string;
  new ( controler: DCControl): DivineControlEvent<T>;
}

export abstract class DivineControlEvent<T extends ControlInputTypes = any> {
  abstract readonly eventType: ControlEventTypes;
  abstract readonly inputType: T;
  constructor(public controler: DCControl) {}


}
