export interface Dao<T> {
  delete(request: T): Promise<void>;
  put(request: T): Promise<void>;
  get(request: T): Promise<T>;
  update(request: T): Promise<void>;
  upload(url: string): Promise<void>;
}
