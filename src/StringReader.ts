export class StringReader {
  private readonly data: string;
  private cursor: number = 0;
  private finished: boolean = false;

  constructor(data: string) {
    this.data = data;
  }

  getLine() {
    let lineEndIndex = this.data.indexOf('\n', this.cursor);

    if (lineEndIndex == -1) {
      lineEndIndex = this.data.length;
      this.finished = true;
    }
    const line = this.data.slice(this.cursor, lineEndIndex);
    this.cursor = lineEndIndex + 1;
    return line;
  }

  get isFinished() {
    return this.finished;
  }
}
