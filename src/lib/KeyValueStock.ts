class KeyValueStock {
  private stock: { [key: string]: string };

  constructor() {
    this.stock = {};
  }

  add(key: string, value: string) {
    this.stock[key] = value;
  }

  pop(key: string): string | undefined {
    const value = this.stock[key];
    delete this.stock[key];
    return value;
  }
}

export default KeyValueStock;
