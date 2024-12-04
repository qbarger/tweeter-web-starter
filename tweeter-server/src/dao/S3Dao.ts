import { Dao } from "./Dao";

export class S3Dao implements Dao<string> {
  delete(request: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  put(request: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  get(request: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  update(request: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  upload(url: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
