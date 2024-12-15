import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {InputControlDemo} from './components/input-control/input-control-demo.component';
import {ViewQueriesDemoComponent} from './components/view-queries-demo/view-queries-demo.component';
import {ListBox, Option} from './components/list-box/list-box.component';
import {ListBoxDemoComponent} from './demos/list-box-demo/list-box-demo.component';



@Component({
  selector: 'afp-root',
  imports: [RouterOutlet, InputControlDemo, ViewQueriesDemoComponent, ListBox, Option, ListBoxDemoComponent],
  template: `
    <router-outlet/>
    <!--    <afp-input-control></afp-input-control>-->
    <!--    <afp-view-queries-demo></afp-view-queries-demo>-->
    <afp-list-box-demo></afp-list-box-demo>
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-first-app';
}
