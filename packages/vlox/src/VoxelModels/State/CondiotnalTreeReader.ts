import { LogicStatementReader } from "./LogicStatementReader";
import { StateSchema } from "./Schema/StateSchema";
import { StateLogicStatement } from "./State.types";

export class CondtionalTreeReader {
  statements: LogicStatementReader[] = [];
  constructor(
    public schema: StateSchema,
    statements: StateLogicStatement[],
    public tree: any[]
  ) {
    for (const statement of statements) {
      this.statements.push(new LogicStatementReader(schema, statement));
    }
  }

  getState(shapeState: number) {
    if (!this.tree.length) return -1;
    let curretNode = this.tree;
    for (let i = 0; i < this.statements.length; i++) {
      curretNode = curretNode[this.statements[i].getValue(shapeState) ? 1 : 0];
    }

    return curretNode as any as number;
  }
}
