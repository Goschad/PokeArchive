import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})

export class SearchBarComponent {

    readonly Search = Search;

    query: string = "";
    constructor(private router: Router) {}

    search() {
        if (!this.query.trim()) return;

        this.router.navigate(['/archive'], {
            queryParams: { search: this.query.trim() }
        });
    }

}
