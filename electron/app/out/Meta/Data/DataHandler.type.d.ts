interface AnyData {
    [key: string]: any;
}
export interface DataHandler extends AnyData {
    getRegion(x: number, y: number, z: number): Promise<string>;
    saveRegion(x: number, y: number, z: number, dataString: string): Promise<void>;
}
export {};
