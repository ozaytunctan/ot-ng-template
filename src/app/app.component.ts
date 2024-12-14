import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'afp-root',
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{title}}!</h1>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-first-app';
}
