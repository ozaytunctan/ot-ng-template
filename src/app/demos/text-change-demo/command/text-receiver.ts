
export class TextReceiver {
  private text: string = '';

  getText(): string {
    return this.text;
  }

  setText(value: string) {
    this.text = value;
  }
}
