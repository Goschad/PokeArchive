import { Component } from '@angular/core';
import { ArchiveCardsComponent } from '../../components/archive-cards/archive-cards.component';
import { SearchBarComponent } from './../../components/search-bar/search-bar.component';
import { LucideAngularModule, ArrowUp } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-archive',
    imports: [SearchBarComponent, ArchiveCardsComponent, CommonModule, LucideAngularModule],
    templateUrl: './archive.component.html',
    styleUrl: './archive.component.css'
})

export class ArchiveComponent {
    
   
    showButton = false;
    readonly ArrowUp = ArrowUp;
    
    ngOnInit() {
        window.addEventListener('scroll', () => {
            this.showButton = window.scrollY > 400;
        });
    }

    scrollTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}
