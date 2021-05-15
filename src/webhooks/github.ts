import { sendSlackMessage } from "../slack";

const githubReply = async (body) => {
  let finalSlackMsg: string;
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
    finalSlackMsg = `*${environment} is ${possible_state[state].msg || state}*`;
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

  if (finalSlackMsg) console.log(finalSlackMsg);
  await sendSlackMessage({
    text: finalSlackMsg,
    username: "GitHub",
    icon_url:
      "https://avatars.slack-edge.com/2020-11-25/1527503386626_319578f21381f9641cd8_512.png",
  });

  return Promise.resolve();
};

export { githubReply };

(() => {
  githubReply({
    deployment_status: {
      url:
        "https://api.github.com/repos/WasabiApp/api/deployments/354938175/statuses/528536922",
      id: 528536922,
      node_id: "MDE2OkRlcGxveW1lbnRTdGF0dXM1Mjg1MzY5MjI=",
      state: "success",
      creator: {
        login: "nikhilgoenka1694",
        id: 12765939,
        node_id: "MDQ6VXNlcjEyNzY1OTM5",
        avatar_url: "https://avatars.githubusercontent.com/u/12765939?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/nikhilgoenka1694",
        html_url: "https://github.com/nikhilgoenka1694",
        followers_url:
          "https://api.github.com/users/nikhilgoenka1694/followers",
        following_url:
          "https://api.github.com/users/nikhilgoenka1694/following{/other_user}",
        gists_url:
          "https://api.github.com/users/nikhilgoenka1694/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/nikhilgoenka1694/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/nikhilgoenka1694/subscriptions",
        organizations_url: "https://api.github.com/users/nikhilgoenka1694/orgs",
        repos_url: "https://api.github.com/users/nikhilgoenka1694/repos",
        events_url:
          "https://api.github.com/users/nikhilgoenka1694/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/nikhilgoenka1694/received_events",
        type: "User",
        site_admin: false,
      },
      description: "Heroku",
      environment: "dev-getwasabi",
      target_url:
        "https://dashboard.heroku.com/apps/dev-getwasabi/activity/builds/10c199f4-a422-4fce-b130-cc881e62033c",
      created_at: "2021-04-24T09:49:58Z",
      updated_at: "2021-04-24T09:49:58Z",
      deployment_url:
        "https://api.github.com/repos/WasabiApp/api/deployments/354938175",
      repository_url: "https://api.github.com/repos/WasabiApp/api",
      performed_via_github_app: null,
    },
    deployment: {
      url: "https://api.github.com/repos/WasabiApp/api/deployments/354938175",
      id: 354938175,
      node_id: "MDEwOkRlcGxveW1lbnQzNTQ5MzgxNzU=",
      task: "deploy",
      original_environment: "dev-getwasabi",
      environment: "dev-getwasabi",
      description: "Heroku",
      created_at: "2021-04-24T09:48:59Z",
      updated_at: "2021-04-24T09:49:58Z",
      statuses_url:
        "https://api.github.com/repos/WasabiApp/api/deployments/354938175/statuses",
      repository_url: "https://api.github.com/repos/WasabiApp/api",
      creator: {
        login: "nikhilgoenka1694",
        id: 12765939,
        node_id: "MDQ6VXNlcjEyNzY1OTM5",
        avatar_url: "https://avatars.githubusercontent.com/u/12765939?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/nikhilgoenka1694",
        html_url: "https://github.com/nikhilgoenka1694",
        followers_url:
          "https://api.github.com/users/nikhilgoenka1694/followers",
        following_url:
          "https://api.github.com/users/nikhilgoenka1694/following{/other_user}",
        gists_url:
          "https://api.github.com/users/nikhilgoenka1694/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/nikhilgoenka1694/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/nikhilgoenka1694/subscriptions",
        organizations_url: "https://api.github.com/users/nikhilgoenka1694/orgs",
        repos_url: "https://api.github.com/users/nikhilgoenka1694/repos",
        events_url:
          "https://api.github.com/users/nikhilgoenka1694/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/nikhilgoenka1694/received_events",
        type: "User",
        site_admin: false,
      },
      sha: "22b6e6a45ac7faa4563b8ffdbac4356c1f4f1912",
      ref: "22b6e6a45ac7faa4563b8ffdbac4356c1f4f1912",
      payload: {
        web_url: "https://dev-getwasabi.herokuapp.com/",
      },
      performed_via_github_app: null,
    },
    action: "created",
    repository: {
      id: 328383865,
      node_id: "MDEwOlJlcG9zaXRvcnkzMjgzODM4NjU=",
      name: "api",
      full_name: "WasabiApp/api",
      private: true,
      owner: {
        login: "WasabiApp",
        id: 75355798,
        node_id: "MDEyOk9yZ2FuaXphdGlvbjc1MzU1Nzk4",
        avatar_url: "https://avatars.githubusercontent.com/u/75355798?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/WasabiApp",
        html_url: "https://github.com/WasabiApp",
        followers_url: "https://api.github.com/users/WasabiApp/followers",
        following_url:
          "https://api.github.com/users/WasabiApp/following{/other_user}",
        gists_url: "https://api.github.com/users/WasabiApp/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/WasabiApp/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/WasabiApp/subscriptions",
        organizations_url: "https://api.github.com/users/WasabiApp/orgs",
        repos_url: "https://api.github.com/users/WasabiApp/repos",
        events_url: "https://api.github.com/users/WasabiApp/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/WasabiApp/received_events",
        type: "Organization",
        site_admin: false,
      },
      html_url: "https://github.com/WasabiApp/api",
      description: null,
      fork: false,
      url: "https://api.github.com/repos/WasabiApp/api",
      forks_url: "https://api.github.com/repos/WasabiApp/api/forks",
      keys_url: "https://api.github.com/repos/WasabiApp/api/keys{/key_id}",
      collaborators_url:
        "https://api.github.com/repos/WasabiApp/api/collaborators{/collaborator}",
      teams_url: "https://api.github.com/repos/WasabiApp/api/teams",
      hooks_url: "https://api.github.com/repos/WasabiApp/api/hooks",
      issue_events_url:
        "https://api.github.com/repos/WasabiApp/api/issues/events{/number}",
      events_url: "https://api.github.com/repos/WasabiApp/api/events",
      assignees_url:
        "https://api.github.com/repos/WasabiApp/api/assignees{/user}",
      branches_url:
        "https://api.github.com/repos/WasabiApp/api/branches{/branch}",
      tags_url: "https://api.github.com/repos/WasabiApp/api/tags",
      blobs_url: "https://api.github.com/repos/WasabiApp/api/git/blobs{/sha}",
      git_tags_url: "https://api.github.com/repos/WasabiApp/api/git/tags{/sha}",
      git_refs_url: "https://api.github.com/repos/WasabiApp/api/git/refs{/sha}",
      trees_url: "https://api.github.com/repos/WasabiApp/api/git/trees{/sha}",
      statuses_url: "https://api.github.com/repos/WasabiApp/api/statuses/{sha}",
      languages_url: "https://api.github.com/repos/WasabiApp/api/languages",
      stargazers_url: "https://api.github.com/repos/WasabiApp/api/stargazers",
      contributors_url:
        "https://api.github.com/repos/WasabiApp/api/contributors",
      subscribers_url: "https://api.github.com/repos/WasabiApp/api/subscribers",
      subscription_url:
        "https://api.github.com/repos/WasabiApp/api/subscription",
      commits_url: "https://api.github.com/repos/WasabiApp/api/commits{/sha}",
      git_commits_url:
        "https://api.github.com/repos/WasabiApp/api/git/commits{/sha}",
      comments_url:
        "https://api.github.com/repos/WasabiApp/api/comments{/number}",
      issue_comment_url:
        "https://api.github.com/repos/WasabiApp/api/issues/comments{/number}",
      contents_url:
        "https://api.github.com/repos/WasabiApp/api/contents/{+path}",
      compare_url:
        "https://api.github.com/repos/WasabiApp/api/compare/{base}...{head}",
      merges_url: "https://api.github.com/repos/WasabiApp/api/merges",
      archive_url:
        "https://api.github.com/repos/WasabiApp/api/{archive_format}{/ref}",
      downloads_url: "https://api.github.com/repos/WasabiApp/api/downloads",
      issues_url: "https://api.github.com/repos/WasabiApp/api/issues{/number}",
      pulls_url: "https://api.github.com/repos/WasabiApp/api/pulls{/number}",
      milestones_url:
        "https://api.github.com/repos/WasabiApp/api/milestones{/number}",
      notifications_url:
        "https://api.github.com/repos/WasabiApp/api/notifications{?since,all,participating}",
      labels_url: "https://api.github.com/repos/WasabiApp/api/labels{/name}",
      releases_url: "https://api.github.com/repos/WasabiApp/api/releases{/id}",
      deployments_url: "https://api.github.com/repos/WasabiApp/api/deployments",
      created_at: "2021-01-10T13:00:08Z",
      updated_at: "2021-04-21T11:18:16Z",
      pushed_at: "2021-04-24T09:48:41Z",
      git_url: "git://github.com/WasabiApp/api.git",
      ssh_url: "git@github.com:WasabiApp/api.git",
      clone_url: "https://github.com/WasabiApp/api.git",
      svn_url: "https://github.com/WasabiApp/api",
      homepage: null,
      size: 764,
      stargazers_count: 0,
      watchers_count: 0,
      language: "TypeScript",
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 2,
      license: null,
      forks: 0,
      open_issues: 2,
      watchers: 0,
      default_branch: "master",
    },
    organization: {
      login: "WasabiApp",
      id: 75355798,
      node_id: "MDEyOk9yZ2FuaXphdGlvbjc1MzU1Nzk4",
      url: "https://api.github.com/orgs/WasabiApp",
      repos_url: "https://api.github.com/orgs/WasabiApp/repos",
      events_url: "https://api.github.com/orgs/WasabiApp/events",
      hooks_url: "https://api.github.com/orgs/WasabiApp/hooks",
      issues_url: "https://api.github.com/orgs/WasabiApp/issues",
      members_url: "https://api.github.com/orgs/WasabiApp/members{/member}",
      public_members_url:
        "https://api.github.com/orgs/WasabiApp/public_members{/member}",
      avatar_url: "https://avatars.githubusercontent.com/u/75355798?v=4",
      description: "",
    },
    sender: {
      login: "nikhilgoenka1694",
      id: 12765939,
      node_id: "MDQ6VXNlcjEyNzY1OTM5",
      avatar_url: "https://avatars.githubusercontent.com/u/12765939?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/nikhilgoenka1694",
      html_url: "https://github.com/nikhilgoenka1694",
      followers_url: "https://api.github.com/users/nikhilgoenka1694/followers",
      following_url:
        "https://api.github.com/users/nikhilgoenka1694/following{/other_user}",
      gists_url:
        "https://api.github.com/users/nikhilgoenka1694/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/nikhilgoenka1694/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/nikhilgoenka1694/subscriptions",
      organizations_url: "https://api.github.com/users/nikhilgoenka1694/orgs",
      repos_url: "https://api.github.com/users/nikhilgoenka1694/repos",
      events_url:
        "https://api.github.com/users/nikhilgoenka1694/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/nikhilgoenka1694/received_events",
      type: "User",
      site_admin: false,
    },
  });
})();
