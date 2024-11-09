import { UserDto, StatusDto } from "tweeter-shared";

type DataDto = UserDto | StatusDto;

export abstract class Service<T extends DataDto> {
  protected abstract getFakeData(
    lastItem: T | null,
    pageSize: number,
    userAlias: string
  ): Promise<[T[], boolean]>;
}
