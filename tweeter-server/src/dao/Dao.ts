export interface Dao<T> {
  delete(request: T): Promise<void>;
  put(request: T): Promise<void>;
  get(request: T): Promise<T | undefined>;
  update(request: T): Promise<void>;
  upload(fileName: string, imageStringBase64Encoded: string): Promise<string>;
}
