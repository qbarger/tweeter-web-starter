export interface Dao<T> {
  delete?(request: T): Promise<void>;
  put?(request: T, input?: string): Promise<void>;
  get?(request: T): Promise<[T | undefined, string]>;
  update?(request: T): Promise<void>;
  upload?(fileName: string, imageStringBase64Encoded: string): Promise<string>;
}
