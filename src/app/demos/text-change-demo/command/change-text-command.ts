import {Command} from './command';
import {TextReceiver} from './text-receiver';

export class ChangeTextCommand
  implements Command {

  private readonly oldText: string;
  private readonly newText: string;

  constructor(private receiver: TextReceiver,
              newText: string) {
    this.oldText = receiver.getText();
    this.newText = newText;
  }

  execute() {
    this.receiver.setText(this.newText);
  }

  undo() {
    this.receiver.setText(this.oldText);
  }

}
