import { FlowNodeRegister } from "@amodx-elms/flow";

export default function (register: FlowNodeRegister) {
  register.registerNodeIO(
    {
      type: "numeric",
      color: "red",
    },
    {
      type: "flow",
      color: "#00ffff",
    },
    {
      type: "boolean",
      color: "#ff7700",
    },
    {
      type: "float",
      color: "#cb9e27",
    },
    {
      type: "int",
      color: "#51b0e5",
    },
    {
      type: "vector-2",
      color: "#16bcb1",
    },
    {
      type: "vector-3",
      color: "#b786cb",
    },
    {
      type: "vector-4",
      color: "#be5126",
    }
  );
}
