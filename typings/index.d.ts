declare module "sileco.db" {
  export class Database {
    constructor(file?: string);
    private file: string;
    public setBackup(filePath: string): void;
    public loadBackup(): void;
    public set(data: string, value: any): void;
    public fetch(data: string): any;
    public remove(data: string): void;
    public add(data: string, value: number): void;
    public subtract(data: string, value: number): void;
    public has(data: string): boolean;
    public clear(): void;
    public fetchAllData(): object;
    public deleteEach(data: void): void;
    public push(array: string, value: any): void;
    public pop(array: string, index: number | string): void;
    public deleteKey(object: string, key: string): void;
  }
}
