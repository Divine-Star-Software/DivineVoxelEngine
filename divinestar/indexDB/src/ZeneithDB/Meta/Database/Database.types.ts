import { ZeneithSchema } from "./Schema.types.js";
export type ZeneithCollectionData = {
 name: string;
 schema: ZeneithSchema;
};
export type ZeneithDatabaseCreationData = {
 databaseName: string;
 collections: ZeneithCollectionData[];
};

export type ZeneithDatabaseLayout = ZeneithDatabaseCreationData[];
