import {
  Component,
  computed,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal
} from '@angular/core';
import {MatCheckbox} from '@angular/material/checkbox';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export type Orientation = 'vertical' | 'horizontal';


@Component({
  selector: 'list-box',
  imports: [],
  template: `
    <ng-content/>
  `,
  host: {
    'role': 'listbox',
    '[tabIndex]': 'disabled() || activeOption() ? -1 : 0',
    '(focus)': 'activateOption()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListBox),
      multi: true
    }
  ],
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      border: 1px solid black;
      padding: 4px;
    }

    :host:focus {
      outline: 2px solid darkblue;
    }
  `
})
export class ListBox<T> implements ControlValueAccessor {

  readonly value = model<T | null>();
  readonly disabled = input(false);
  readonly orientation = input<Orientation>('horizontal');

  readonly options = contentChildren(Option);
  activeOption = signal<Option<T> | undefined>(undefined);

  readonly orientationChange = output<Orientation>();
  readonly valueChange = output<T | null | undefined>();


  constructor() {
    effect(() => {
      this.orientationChange.emit(this.orientation());
    });
  }


  onValueChange(value: T | null) {
    this.value.set(value);
    this.valueChange.emit(value);
    this.onChangeFn(value);
  }

  activateOption() {
    const selectedOption = this.options().find(o => o.isSelected());
    if (selectedOption) {
      this.activeOption.set(selectedOption);
    } else {
      const firstEnabledOption = this.options().find(o => !o.disabled());
      this.activeOption.set(firstEnabledOption);
    }
  }


  //reactive form binding
  private onChangeFn: ((value: T | null) => void)|any;
  private onTouchedFn: (() => void) | undefined;

  public writeValue(value: T | null): void {
    this.value.set(value)
  }

  public registerOnChange(fn: (value: T | null) => void): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }


}

@Component({
  selector: 'list-option',
  template: `
    <ng-content/>
    <mat-checkbox [disabled]="isDisabled()"
                  (selectionchange)="onSelect()"
                  [checked]="isSelected()"></mat-checkbox>
    <!--      @if (isSelected()) {-->
    <!--      ✓-->
    <!--      }-->

  `,
  styles: `

    :host {
      //display: block;
      border: 1px solid gray;
      margin: 4px;
      padding: 4px;
      cursor: pointer;

      display: flex;
      flex-flow: row wrap;
      gap: 3px;
      justify-content: space-between;
      align-items: center;
    }

    :host[aria-disabled="true"] {
      color: lightgray;
      border-color: lightgray;
      cursor: default;
    }

    :host:hover {
      background: lightgray;
    }

  `,
  imports: [
    MatCheckbox
  ],
  host: {

    '(click)': 'onSelect()',
    'role': 'option',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.aria-selected]': 'isSelected()',
    '[tabIndex]': 'isActive() ? 0 : -1'
  }
})
export class Option<T> {
  private _listBox = inject<ListBox<T>>(ListBox);
  value = input.required<T>();
  disabled = input(false);

  readonly isDisabled =
    computed(() => this._listBox.disabled() ||
      this.disabled()
    );

  readonly isSelected =
    computed(() => this.value() === this._listBox.value());

  readonly isActive = computed(() => {
    return this === this._listBox.activeOption();
  });

  onSelect() {
    if (this.isDisabled()) {
      return;
    }

    if (this.isSelected()) {
      this.onUnSelect();
    } else {
      this._listBox.onValueChange(this.value())
    }
  }

  onUnSelect() {
    this._listBox.onValueChange(null);
  }

}
