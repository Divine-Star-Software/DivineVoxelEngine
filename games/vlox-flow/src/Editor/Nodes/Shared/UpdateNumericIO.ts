import {
  FlowConnectionElement,
  FlowNodeElement,
  FlowNodeIOElement,
} from "@amodx-elms/flow";
import { Vector2Like, Vector3Like, Vector4Like } from "@amodx/math";

export function UpdateNumericIOConnectionAdded(
  mode: "input" | "output" | "io",
  node: FlowNodeElement,
  nodeIO: FlowNodeIOElement,
  connection: FlowConnectionElement
) {
  let foundType: string = "numeric";

  for (const io of node.flowNode.getAllIO(mode)) {
    if (io.valueType !== "numeric") {
      foundType = io.valueType;
      break;
    }
  }
  if (foundType == "numeric") {
    const valueType =
      nodeIO.ioType == "output"
        ? connection.inputSocket!.flowNodeIO?.flowNodeIO.valueType
        : connection.outputSocket!.flowNodeIO?.flowNodeIO.valueType;
    //update the types
    switch (valueType) {
      case "int":
      case "float":
        {
          for (const io of node.flowNode.getAllIO(mode)) {
            io.valueType = valueType;
            io.value = 0;
          }
        }
        break;
      case "vector-2":
        {
          for (const io of node.flowNode.getAllIO(mode)) {
            io.valueType = valueType;
            io.value = Vector2Like.Create();
          }
        }
        break;
      case "vector-3":
        {
          for (const io of node.flowNode.getAllIO(mode)) {
            io.valueType = valueType;
            io.value = Vector3Like.Create();
          }
        }
        break;
      case "vector-4":
        {
          for (const io of node.flowNode.getAllIO(mode)) {
            io.valueType = valueType;
            io.value = Vector4Like.Create();
          }
        }
        break;
    }
    node.reRender();
    if (nodeIO.ioType == "output") {
      connection.outputSocket! = node.getOutput(nodeIO.flowNodeIO.name)!.socket;
      connection.outputSocket!.connections.push(connection);
    } else {
      connection.inputSocket = node.getInput(nodeIO.flowNodeIO.name)!.socket;
      connection.inputSocket!.connections.push(connection);
    }
    return;
  }
}

export function UpdateNumericIOConnectionRemoved(
  mode: "input" | "output" | "io",
  node: FlowNodeElement,
  nodeIO: FlowNodeIOElement,
  connection: FlowConnectionElement
) {
  let foundConnection = false;

  for (const io of node.getAllIO(mode)) {
    if (io.socket.connections.length !== 0) {
      foundConnection = true;
      break;
    }
  }

  if (foundConnection) return;

  for (const io of node.flowNode.getAllIO(mode)) {
    io.valueType = "numeric";
    io.value = 0;
  }
  node.reRender();
}
