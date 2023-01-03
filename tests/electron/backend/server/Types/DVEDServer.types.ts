import type { DVEDLocationData } from "server/libs/dved/Types/DVED.types";

type DVELoadMessage = {
 type: "load-column";
 location: DVEDLocationData;
};

type DVELoadRegionHeaderMessage = {
 type: "load-region-header";
 location: DVEDLocationData;
};
type DVESaveMessagee = {
 type: "save-column";
 location: DVEDLocationData;
 buffer: ArrayBuffer;
};
type DVEColumnExistsMessage = {
 type: "column-exists";
 location: DVEDLocationData;
};
type DVEColumnTimestampMessage = {
 type: "column-timestamp";
 location: DVEDLocationData;
};

type DVESetPathMessagee = {
 type: "set-path";
 id: string;
};

export type DVEDMessages =
 | DVELoadMessage
 |DVELoadRegionHeaderMessage
 | DVESaveMessagee
 | DVESetPathMessagee
 | DVEColumnExistsMessage
 | DVEColumnTimestampMessage;
