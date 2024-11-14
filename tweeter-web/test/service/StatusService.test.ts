import { PagedStatusItemRequest, Status, User } from "tweeter-shared";
import StatusService from "../../src/model/service/StatusService";
import before, { anything, instance, mock, verify, when } from "ts-mockito";

describe("Status Service Integration test", () => {
  let service: StatusService;
  let serviceMock: StatusService;
  let status: Status;
  let user: User;

  beforeAll(() => {
    serviceMock = mock(StatusService);
    service = instance(serviceMock);
    user = new User("j", "l", "f", "s");
    status = new Status("hey", user, 1234);
  });

  it("returns a user's story page", async () => {
    const request: PagedStatusItemRequest = {
      token: "asdf",
      userAlias: user.alias,
      pageSize: 2,
      lastItem: status.dto,
    };
    when(serviceMock.loadMoreStoryItems(anything())).thenResolve([
      [new Status("hey", user, 1234)],
      true,
    ]);
    const result = await service.loadMoreStoryItems(request);

    const statuslist = result[0];

    expect(statuslist[0]).toBeInstanceOf(Status);
    expect(result[1]).toEqual(true);
    verify(serviceMock.loadMoreStoryItems(anything())).once();
  });
});
