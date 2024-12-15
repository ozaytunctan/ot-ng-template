import {
  Component,
  Directive, effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  viewChildren,
  ViewContainerRef
} from '@angular/core';
import {TASK_LIST_DATA} from './task-list-data';
import {MatCardModule} from '@angular/material/card';
import {MatChip} from '@angular/material/chips';
import {TaskStatusDirective} from '../../directives/task-status.directive';

export type Status = 'Todo' | 'Active' | 'Closed';

export interface Task {
  id: number;
  name: string;
  description: string;
  status: Status;
}

@Component({
  selector: 'task-item',
  template: `

    <div class="task-item">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ task().name }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>{{ task().description }}</p>
          <mat-chip
            taskItemStatus
            [status]="task().status"
            [highlighted]="task().status=='Active'"
            [color]="taskColor">{{ task().status }}
          </mat-chip>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  imports: [
    MatCardModule,
    MatChip,
    TaskStatusDirective
  ]
})
export class TaskItemComponent {
  task = input.required<Task>();

  get taskColor() {
    return 'primary';
  }

}


@Component({
  selector: 'task-lists',
  template: `
    <h2>Task Lists</h2>
    <hr>
    <div>
      @for (task of tasks; track task.id; let last = $last) {
        <task-item #taskItem
                   taskItemStatus
                   [status]="task.status"
                   [task]="task"></task-item>
        @if (!last) {
          <hr>
        }
      }
    </div>

    <p>
      Task Count:{{ taskItemOptions().length }}
    </p>
  `,
  imports: [
    TaskItemComponent,
    TaskStatusDirective
  ]
})
export class TaskListsComponent {

  tasks: Task[] = TASK_LIST_DATA;

  // taskItemOptions = viewChildren(TaskItemComponent);
  // taskItemOptions = viewChildren('taskItem');
  taskItemOptions = viewChildren(TaskStatusDirective);

  logEffect = effect(() => {
    console.log(this.taskItemOptions());
  })

}


@Component({
  selector: 'afp-view-queries-demo',
  imports: [
    TaskListsComponent
  ],
  template: `
    <h2>View Queries Demo</h2>
    <div>
      <task-lists></task-lists>
    </div>

  `,
  styles: ``
})
export class ViewQueriesDemoComponent {

}
