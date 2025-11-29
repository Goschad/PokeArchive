import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavigationBarComponent, CardComponent],
      template: `
        <app-navigation-bar></app-navigation-bar>
        <router-outlet></router-outlet>
    `
})

export class AppComponent {
    title = 'PokeLib';
}
