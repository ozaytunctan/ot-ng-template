import {computed, Directive, ElementRef, input, OnInit} from '@angular/core';
import {Status} from '../components/view-queries-demo/view-queries-demo.component';

export enum TaskStatusColor {
  'Todo' = '',
  'Active' = 'blue',
  'Closed' = 'green',
}

@Directive({
  selector: '[taskItemStatus]',

  host: {
    '[style.background]': 'backgroundColor()',
    // '[style.color]': 'backgroundColor()'
    '(click)': `onToggleColor()`
  }
})

export class TaskStatusDirective {
  status = input.required<Status>();
  backgroundColor = computed(() => TaskStatusColor[this.status()]);

  constructor(private el: ElementRef<HTMLElement>) {
  }

  onToggleColor(): void {
    let classList = this.el.nativeElement.classList;
    if (classList.contains('active')) {
      this.el.nativeElement.classList.remove('active');
    } else {
      this.el.nativeElement.classList.add('active');
    }
  }

}
