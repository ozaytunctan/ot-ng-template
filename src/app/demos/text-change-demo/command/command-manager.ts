import {Command} from './command';

export class CommandManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  executeCommand(command: Command) {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];//clear redo stack
  }

  undo(): void {
    if (this.undoStack.length == 0) {
      return;
    }
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo() {
    if (this.redoStack.length == 0) return;
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }

}
