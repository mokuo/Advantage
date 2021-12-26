import KeyValueStock from "../KeyValueStock";

describe("KeyValueStock", () => {
  describe("#add", () => {
    it("値を追加できる", () => {
      const stock = new KeyValueStock();
      stock.add("hoge", "fuga");

      const value = stock.pop("hoge");
      expect(value).toEqual("fuga");
    });

    it("同じキーを指定した場合、上書きされる", () => {
      const stock = new KeyValueStock();
      stock.add("hoge", "fuga");
      stock.add("hoge", "fugafuga");

      const value = stock.pop("hoge");
      expect(value).toEqual("fugafuga");
    });
  });

  describe("#pop", () => {
    it("値を取り出せる", () => {
      const stock = new KeyValueStock();
      stock.add("hoge", "fuga");

      const value = stock.pop("hoge");
      expect(value).toEqual("fuga");
    });

    it("pop したら値が削除される", () => {
      const stock = new KeyValueStock();
      stock.add("hoge", "fuga");

      stock.pop("hoge");
      const value = stock.pop("hoge");
      expect(value).toBeUndefined();
    });
  });
});
