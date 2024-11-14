import { StateSchema } from "./Schema/StateSchema";
import {
  StateCompareOperations,
  StateLogiceOperations,
  StateLogicStatement,
} from "./State.types";

export class LogicStatementReader {
  constructor(
    public schema: StateSchema,
    public statement: StateLogicStatement
  ) {}

  getValue(shapeState: number) {
    let currentOperation: StateLogiceOperations | -1 = -1;
    let returnVaue = false;
    let currentValue = false;

    for (let i = 0; i < this.statement.length; i++) {
      const node = this.statement[i];

      if (
        node == StateLogiceOperations.And ||
        node == StateLogiceOperations.Or
      ) {
        currentOperation = node;
        continue;
      }

      const value = this.schema.nodes[node[0]].getValue(shapeState);

      switch (node[1]) {
        case StateCompareOperations.Equals:
          currentValue = value == node[2];
          break;
        case StateCompareOperations.NotEquals:
          currentValue = value != node[2];
          break;
        case StateCompareOperations.GreaterThan:
          currentValue = value >= node[2];
          break;
        case StateCompareOperations.LessThan:
          currentValue = value <= node[2];
          break;
      }

      if (currentOperation == -1) {
        returnVaue = currentValue;
        continue;
      }
      switch (currentOperation) {
        case StateLogiceOperations.And:
          returnVaue = returnVaue && currentValue;
          break;
        case StateLogiceOperations.Or:
          returnVaue = returnVaue || currentValue;
          break;
      }
    }


    return returnVaue;
  }
}
