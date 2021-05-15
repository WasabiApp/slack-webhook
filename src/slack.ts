import { WebClient } from "@slack/web-api";

const slackInstance = new WebClient(process.env.SLACK_TOKEN);

const sendSlackMessage = async ({
  text,
  channel = "C01T61W7RR9",
  icon_url = "https://static.wixstatic.com/media/0559de_492a5f8d26634ab08a1b8e8985bf5215~mv2.png/v1/fill/w_68,h_68,al_c,q_85,usm_0.66_1.00_0.01/256",
  username = "WasabiBot",
}: {
  text: string;
  channel?: string;
  icon_url?: string;
  username?: string;
}) => {
  console.log(text, channel, icon_url, username);

  return slackInstance.chat.postMessage({
    text,
    channel,
    icon_url,
    username,
  });
};
export { sendSlackMessage };
