import LineAdapter from "../LineAdapter";

describe("LineAdapter", () => {
  describe("#sendMessage", () => {
    // NOTE: ローカルでメッセージのテストをしたい時に使う
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("hoge", async () => {
      const lineAdapter = new LineAdapter();
      await lineAdapter.sendMessage("hoge!!!");
    });
  });
});
