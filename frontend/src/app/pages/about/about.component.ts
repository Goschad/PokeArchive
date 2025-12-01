import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Layers, Link, User } from 'lucide-angular';

@Component({
    selector: 'app-about',
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})

export class AboutComponent {
    readonly Layers = Layers;
    readonly Link = Link;
    readonly User = User;
}
