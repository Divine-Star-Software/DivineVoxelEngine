export declare class RegisterDataManager<T extends {
    id: string;
}> {
    data: Map<string, T>;
    getData(id: string): T;
    registerData(data: T | T[]): void;
    clear(): void;
}
