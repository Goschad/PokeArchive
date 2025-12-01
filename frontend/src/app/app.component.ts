import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from './components/background/background.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavigationBarComponent, BackgroundComponent],
      template: `
        <app-background></app-background>
        <app-navigation-bar></app-navigation-bar>
        <router-outlet></router-outlet>
    `
})

export class AppComponent {

}
