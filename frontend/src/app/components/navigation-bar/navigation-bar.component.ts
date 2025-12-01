import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Menu } from 'lucide-angular';

@Component({
    selector: 'app-navigation-bar',
    imports: [CommonModule, RouterLink, LucideAngularModule],
    templateUrl: './navigation-bar.component.html',
    styleUrl: './navigation-bar.component.css'
})

export class NavigationBarComponent {
    isMenuOpen = false;

    readonly Menu = Menu;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }
}
