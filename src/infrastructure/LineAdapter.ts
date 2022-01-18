import { Client } from "@line/bot-sdk";
import getEnvValue from "@src/lib/getEnvValue";
import ILineAdapter from "@src/usecase/ILineAdapter";

class LineAdapter implements ILineAdapter {
  private client: Client;

  constructor() {
    this.client = new Client({
      channelAccessToken: getEnvValue("CHANNEL_ACCESS_TOKEN"),
      channelSecret: getEnvValue("CHANNEL_SECRET"),
    });
  }

  async sendMessage(text: string): Promise<void> {
    await this.client.pushMessage(getEnvValue("MESSAGE_TO"), { type: "text", text });
  }
}

export default LineAdapter;
