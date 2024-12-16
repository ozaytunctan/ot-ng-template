import {Component} from '@angular/core';
import {TextReceiver} from './command/text-receiver';
import {CommandManager} from './command/command-manager';
import {ChangeTextCommand} from './command/change-text-command';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'afp-text-change-demo',
  imports: [FormsModule, MatButton],
  template: `
    <div class="text-command">
      <textarea [(ngModel)]="currentText"></textarea>
      <button mat-raised-button
              (click)="applyChange()">ApplyChange</button>
      <button mat-raised-button
              (click)="undo()">Undo</button>
      <button mat-raised-button
              (click)="redo()">Redo</button>
    </div>
  `,
  styles: `
    .text-command {
      margin-top: 10px;
      display: flex;
      flex-flow: row wrap;
      gap: 5px;
      align-items: center;
    }
  `
})
export class TextChangeDemoComponent {
  currentText: string = '';
  private receiver = new TextReceiver();
  private commandManager = new CommandManager();
  applyChange() {
    const command = new ChangeTextCommand(
      this.receiver, this.currentText
    );
    this.commandManager.executeCommand(command);
  }
  undo() {
    this.commandManager.undo();
    this.currentText = this.receiver.getText();
  }
  redo() {
    this.commandManager.redo();
    this.currentText = this.receiver.getText();
  }
}
