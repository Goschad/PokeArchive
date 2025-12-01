import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-archive-cards',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './archive-cards.component.html',
  styleUrl: './archive-cards.component.css'
})

export class ArchiveCardsComponent implements OnInit {

    allCards: any[] = [];
    visibleCards: any[] = [];
    batchSize = 30;
    loading = true;

    private baseUrl = environment.pokemonApiBaseUrl;

    constructor(private http: HttpClient, private route: ActivatedRoute) {}
    
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
        const search = params['search'];

        if (search) {
            this.loadSearch(search);
        } else {
            this.loadAllCards();
        }
    });
    }

    @HostListener('window:scroll', [])

    onScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
            this.loadMore();
        }
    }

    loadMore() {
        if (this.visibleCards.length >= this.allCards.length) return;

        const next = this.allCards.slice(
        this.visibleCards.length,
        this.visibleCards.length + this.batchSize
        );
        this.visibleCards = [...this.visibleCards, ...next];
    }

    loadAllCards() {
        this.loading = true;

        this.http.get<any[]>(`${this.baseUrl}/en/cards`)
            .subscribe({
            next: cards => {
                this.allCards = cards.filter(c => c.image);
                this.visibleCards = this.allCards.slice(0, this.batchSize);
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }

    loadSearch(name: string) {
        this.loading = true;

        this.http.get<any[]>(`${this.baseUrl}/en/cards?name=${name}`)
            .subscribe({
            next: cards => {
                this.allCards = cards.filter(c => c.image);
                this.visibleCards = this.allCards;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

}
