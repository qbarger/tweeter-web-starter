export interface Dao<T> {
  delete(request: T): Promise<void>;
  put(request: T, input?: string, value?: number): Promise<void>;
  get(request: T): Promise<T | undefined>;
  update(request: T, input?: string): Promise<void>;
  upload?(fileName: string, imageStringBase64Encoded: string): Promise<string>;
  incrementFollowers?(request: T): Promise<void>;
  incrementFollowees?(request: T): Promise<void>;
  decrementFollowers?(request: T): Promise<void>;
  decrementFollowees?(request: T): Promise<void>;
}
