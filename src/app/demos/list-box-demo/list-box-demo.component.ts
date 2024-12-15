import {Component, inject} from '@angular/core';
import {ListBox, Option} from '../../components/list-box/list-box.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';

export interface Country {
  id: number;
  name: string;
  code: string
}

export const COUNTRY_DATA: Country[] = [
  {
    id: 1,
    name: 'Türkiye',
    code: '001'
  },
  {
    id: 2,
    name: 'Azerbaycan',
    code: '002'
  },
  {
    id: 3,
    name: 'Yunanistan',
    code: '003'
  }, {
    id: 4,
    name: 'Irak',
    code: '004'
  },
]

@Component({
  selector: 'afp-list-box-demo',
  imports: [
    ListBox,
    Option,
    ReactiveFormsModule,
    JsonPipe
  ],
  template: `
    <p>Listbox Demo Live</p>
    <h2>Demo 1</h2>
    <list-box [value]="countries[0]"
              (valueChange)="onSelectCountry($event)">
      @for (c of countries; track c.id) {
        <list-option
          [value]="c">{{ c.name + '-(' + c.code + ')' }}
        </list-option>
      }
    </list-box>
    <hr>
    <h2>Demo2</h2>

    <form [formGroup]="form">
      <list-box [value]="countries[2]"
                formControlName="country"
                (valueChange)="onSelectCountry($event)">
        @for (c of countries; track c.id) {
          <list-option
            [value]="c"
            [disabled]="c.id==2">
            {{ c.name + '-(' + c.code + ')' }}
          </list-option>
        }
      </list-box>

      <p>
        Form Values:{{ form.value|json }}
      </p>
    </form>
  `,
  styles: ``
})
export class ListBoxDemoComponent {

  countries = COUNTRY_DATA;

  fb = inject(FormBuilder);
  form = this.fb.group({
    country: ''
  })

  onSelectCountry(country: any) {
    console.log(country)
    console.log(this.form.value)
  }
}
