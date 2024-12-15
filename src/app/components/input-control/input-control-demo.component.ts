import {Component, input, model, signal} from '@angular/core';


@Component({
  selector: 'my-control',
  template: `

    <p>
      First Value:{{ someInput() }}
    </p>

    <p>
      Second Value: {{ controlValue() }}
    </p>

    <button (click)="updateControlValue()">Update</button>

  `,
  styles: `

  `
})
export class MyControl {

  someInput = input<string>()

  controlValue = model<string>();


  updateControlValue() {
    // this.someInput.update
    this.controlValue.update(v => v + 'y');
  }
}


@Component({
  selector: 'afp-input-control',
  imports: [
    MyControl
  ],
  standalone: true,
  template: `
    <h3>input() vs model()</h3>
    <hr>

    <div>

      <h2>Parent</h2>
      <!--      One way binding-->
      <!--      <my-control-->
      <!--        [someInput]="firstValue()"-->
      <!--        [(controlValue)]="secondValue">-->
      <!--      </my-control>-->
      <my-control
        [someInput]="firstValue()"
        [controlValue]="secondValue()">
      </my-control>
      <button (click)="updateValues()">Update Values</button>
    </div>

    <hr>


    <div>
      <h2>Child</h2>
      <!--Two way binding control value-->
      <my-control
        [someInput]="firstValue()"
        [(controlValue)]="secondValue">
      </my-control>
    </div>

  `,
  styles: ``
})
export class InputControlDemo {

  firstValue = signal('First');
  secondValue = signal('Second');


  updateValues() {
    this.firstValue.update(v => v + 'x');
    this.secondValue.update(v => v + 'x');
  }
}
