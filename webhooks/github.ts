import { sendSlackMessage } from "../slack";

const githubReply = async (body: {
  ref?: any;
  sender?: any;
  before?: any;
  commits?: any;
  head_commit?: any;
  forced?: any;
  deployment_status?: any;
  compare?: any;
  action?: any;
  pull_request?: any;
}) => {
  let finalSlackMsg;
  const {
    ref,
    sender,
    commits,
    head_commit,
    forced,
    deployment_status,
    compare,
    action,
    pull_request,
  } = body;

  if (deployment_status) {
    // heroku data webhook
    const possible_state: any = {
      success: { msg: "successfully deployed 🔥" },
      crashed: { msg: "successfully deployed ⚠️" },
    };
    const { state, environment } = deployment_status;
    finalSlackMsg = `*${environment} is ${possible_state[state] || state}*`;
  } else if (action) {
    const { id, title, body, user, head, base } = pull_request;
    finalSlackMsg = `Message: *Pull Request ${title}*\n${
      !body || body === "" ? "" : `Description: ${body}\n`
    }Status: ${action}\nBy: <${user?.html_url}|${user?.login}>\nFlow: ${
      head?.ref
    } -> ${base?.ref}\nPull Request: <${pull_request?.html_url}|${id}>`;
  } else if (commits) {
    // github data webhook
    let subCommits = [];
    if (commits?.length > 1) {
      // multi-commit push
      subCommits = commits.map(
        (c: { message: any; author: { username: any } }) =>
          `• ${c?.message} by *${c?.author?.username}*\n`
      );
    }

    const { message } = head_commit;
    const { login, html_url } = sender;
    finalSlackMsg = `*Message: ${message}*\n\n${
      subCommits.length !== 0 ? `${subCommits.join("")}\n` : ""
    }By: <${html_url}|${login}>\nIsForced: ${forced}\nCompare: <${compare}|${
      ref?.split("refs/heads/")?.[1]
    }>`;
  }

  if (finalSlackMsg)
    await sendSlackMessage({
      text: finalSlackMsg,
      username: "GitHub",
      icon_url:
        "https://avatars.slack-edge.com/2020-11-25/1527503386626_319578f21381f9641cd8_512.png",
    });

  return Promise.resolve();
};

export { githubReply };
