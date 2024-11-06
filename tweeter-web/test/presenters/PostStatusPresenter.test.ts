import { AuthToken, User } from "tweeter-shared";
import StatusService from "../../src/model/service/StatusService";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../src/presenters/PostStatusPresenter";
import {
  anything,
  capture,
  instance,
  mock,
  spy,
  verify,
  when,
} from "ts-mockito";

/*

describe("PostStatusPresenter", () => {
  let mockPostStatusPresenterView: PostStatusView;
  let postStatusPresenter: PostStatusPresenter;
  let mockStatusService: StatusService;

  const authToken: AuthToken = new AuthToken("IEatRocks123", Date.now());
  const post: string = "Welcome to Good Burger, home of the good burger.";
  const currentUser = new User("george", "pickens", "yo", "j");
  const mockEvent = {
    preventDefault: jest.fn(),
  } as unknown as React.MouseEvent;

  beforeEach(() => {
    mockPostStatusPresenterView = mock<PostStatusView>();
    const mockPostStatusPresenterViewInstance = instance(
      mockPostStatusPresenterView
    );

    const postStatusPresenterSpy = spy(
      new PostStatusPresenter(mockPostStatusPresenterViewInstance)
    );
    postStatusPresenter = instance(postStatusPresenterSpy);

    mockStatusService = mock<StatusService>();
    const mockStatusServiceInstance = instance(mockStatusService);

    when(postStatusPresenterSpy.statusService).thenReturn(
      mockStatusServiceInstance
    );
  });

  it("tells the view to display a posting status message", async () => {
    await postStatusPresenter.submitPost(
      mockEvent,
      post,
      currentUser,
      authToken
    );

    verify(
      mockPostStatusPresenterView.displayInfoMessage("Posting status...", 0)
    ).once();
    verify(
      mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000)
    ).once();
  });

  it("calls postStatus on the post status service with the correct status string and auth token", async () => {
    await postStatusPresenter.submitPost(
      mockEvent,
      post,
      currentUser,
      authToken
    );

    let [capturedAuthToken, capturedStatus] = capture(
      mockStatusService.postStatus
    ).last();

    let capturedString = capturedStatus.post;

    expect(capturedString).toEqual(post);
    expect(capturedAuthToken).toEqual(authToken);
  });

  it("tells the view to clear the last info message, clear the post, and display a status posted message", async () => {
    await postStatusPresenter.submitPost(
      mockEvent,
      post,
      currentUser,
      authToken
    );

    verify(mockPostStatusPresenterView.clearLastInfoMessage()).once();
    verify(
      mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000)
    ).once();

    verify(mockPostStatusPresenterView.setPost("")).once();
  });

  it("tells the view to display an error message and clear the last info message and does not tell it to clear the post or display a status posted message", async () => {
    const error = new Error("error occured");

    when(mockStatusService.postStatus(authToken, anything())).thenThrow(error);

    await postStatusPresenter.submitPost(
      mockEvent,
      post,
      currentUser,
      authToken
    );

    let [capturedErrorMessage] = capture(
      mockPostStatusPresenterView.displayErrorMessage
    ).last();
    console.log(capturedErrorMessage);

    verify(
      mockPostStatusPresenterView.displayErrorMessage(
        "Failed to post the status because of exception: Error: error occured"
      )
    ).once();
    verify(mockPostStatusPresenterView.clearLastInfoMessage()).once();
    verify(
      mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000)
    ).never();
    verify(mockPostStatusPresenterView.setPost("")).never();
  });
});

*/
