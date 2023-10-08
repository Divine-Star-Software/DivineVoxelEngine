import { CommPortTypes } from "../Comm/Comm.types";

export type CommManagerData = {
    name: string;
    onPortSet: (port: CommPortTypes, commName: string) => void;
  };