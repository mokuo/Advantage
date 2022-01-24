interface ILineAdapter {
  sendMessage(text: string): Promise<void>;
}

export default ILineAdapter;
