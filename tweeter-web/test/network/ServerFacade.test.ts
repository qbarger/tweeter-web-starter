import { mock, instance, when, verify, anything } from "ts-mockito";
import {
  RegisterRequest,
  User,
  AuthToken,
  PagedUserItemRequest,
  FollowTypeRequest,
} from "tweeter-shared";
import { ServerFacade } from "../../src/network/ServerFacade";

describe("ServerFacade Integration Tests", () => {
  let serverFacade: ServerFacade;
  let serverFacadeMock: ServerFacade;
  let user: User;

  beforeAll(() => {
    serverFacadeMock = mock(ServerFacade);
    serverFacade = instance(serverFacadeMock);
    user = new User("John", "Doe", "@john", "asdf");
  });

  it("should successfully register a user", async () => {
    const request: RegisterRequest = {
      token: "asdf",
      alias: user.alias,
      password: "password",
      firstname: user.firstName,
      lastname: user.lastName,
      userImageBytes: "http://example.com/image.jpg",
      imageFileExtension: user.imageUrl,
    };

    when(serverFacadeMock.register(anything())).thenResolve([
      new User("John", "Doe", "@john", "http://example.com/image.jpg"),
      new AuthToken("asdf", 1234),
    ]);

    const result = await serverFacade.register(request);

    expect(result[0]).toBeInstanceOf(User);
    expect(result[1]).toBeInstanceOf(AuthToken);
    verify(serverFacadeMock.register(anything())).once();
  });

  it("should get more followers", async () => {
    const request: PagedUserItemRequest = {
      token: "asdf",
      userAlias: user.alias,
      pageSize: 2,
      lastItem: null,
    };

    when(serverFacadeMock.getMoreFollowers(anything())).thenResolve([
      [new User("Jane", "Doe", "@jane", "http://example.com/image.jpg")],
      true,
    ]);

    const result = await serverFacade.getMoreFollowers(request);
    const userlist = result[0];

    expect(userlist[0]).toBeInstanceOf(User);
    expect(result[1]).toEqual(true);
    verify(serverFacadeMock.getMoreFollowers(anything())).once();
  });

  it("should get follower count", async () => {
    const request: FollowTypeRequest = {
      token: "asdf",
      user: user.dto,
    };

    when(serverFacadeMock.getFollowerCount(anything())).thenResolve(10);

    const result = await serverFacade.getFollowerCount(request);

    expect(typeof result).toBe("number");
    verify(serverFacadeMock.getFollowerCount(anything())).once();
  });

  it("should get followee count", async () => {
    const request: FollowTypeRequest = {
      token: "asdf",
      user: user.dto,
    };

    when(serverFacadeMock.getFolloweeCount(anything())).thenResolve(5);

    const result = await serverFacade.getFolloweeCount(request);

    expect(typeof result).toBe("number");
    verify(serverFacadeMock.getFolloweeCount(anything())).once();
  });
});
