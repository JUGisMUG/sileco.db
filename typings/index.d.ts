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
    public deleteEach(data: string): void;
    public push(array: string, value: any): void;
    public pop(array: string, index: number | string): void;
    public deleteKey(object: string, key: string): void;
  }
  
  export class Mongo {
    constructor(url?: string, options?: object)
    private url: string;
    public state(): string;
    public disconnect(): void;
    public set(key: string, value: any): void;
    public fetch(key: string): any;
    public remove(key: string): void;
    public add(key: string, value: number): void;
    public subtract(key: string, value: number): void;
    public has(key: string): boolean;
    public fetchAllData(): any;
    public deleteEach(key: string): void;
    public push(array: string, value: any): void;
    public pop(array: string, index: number | string): void;
    public deleteKey(object: string, key: string): void;
    public import(file: string): void;
    public export(file: string): void;
  }
}
