import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent implements OnInit {
    @ViewChild('cardElement') cardRef!: ElementRef<HTMLDivElement>;
    @ViewChild('glare') glareRef!: ElementRef<HTMLDivElement>;

    pokemonCard: any = null;
    loading = true;
    imageLoaded = false;
    error: string | null = null;
    isFlipped = false;
    @Input() cardId!: string;

    displayImage = '';
    private language = "en";
    private baseUrl = environment.pokemonApiBaseUrl;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        document.addEventListener(
            'gesturestart',
            (e) => e.preventDefault()
        );
        
        if (this.cardId)
        {
            this.loadCardById(this.language, this.cardId);
        } 
    }

    // ---------- MOBILE ----------

    blockScroll(event: TouchEvent) {
        if (event.cancelable) {
            event.preventDefault();
        }
    }

    startTouch(e: TouchEvent) {
        document.body.style.overflow = 'hidden';
    }

    onTouchEnd() {
        document.body.style.overflow = '';
        this.onMouseLeave();
    }

    onTouchMove(e: TouchEvent): void {
        const touch = e.touches[0];
        if (!touch) return;

        const card = this.cardRef.nativeElement;
        const rect = card.getBoundingClientRect();

        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;

        const centerX = x - 50;
        const centerY = y - 50;

        const rx = centerY / 3;
        const ry = -centerX / 3;

        const scale = window.innerWidth < 500 ? 1.03 : 1.1;

        card.style.transform = `
            perspective(650px)
            scale(${scale})
            rotateX(${rx}deg)
            rotateY(${ry}deg)
        `;
    }


    // ---------- CARD FLIP ----------

    toggleFlip() {
        this.isFlipped = !this.isFlipped;
    }

    // ---------- API TCGDEX ----------

    onImageLoad(): void {
        this.imageLoaded = true;
    }

    onImageError(): void {
        this.imageLoaded = false;
        this.displayImage = 'assets/images/tcg-card-back.jpg';
        this.error = null;
    }

    getImageUrl(): string {
        if (!this.pokemonCard || !this.pokemonCard.image) return '';
        return `${this.pokemonCard.image}/high.webp`;
    }

    loadCardById(lang: string, id: string): void {
        this.loading = true;
        this.error = null;

        let url = `${this.baseUrl}/${lang}/cards/${id}`;

        if (id === "sm35-1")
        {
            this.pokemonCard = null;
            this.displayImage = `https://images.pokemontcg.io/sm35/1_hires.png`;
            url = `${this.baseUrl}/${lang}/cards/sm10-33`;
        }

        this.http.get<any>(url).subscribe({
            next: (res) => {
                this.pokemonCard = res;
                if (id !== "sm35-1") this.displayImage = this.getImageUrl();
                this.loading = false;
            },
            
            error: (err) => {
                console.error(err);
                this.error = `Failed to load card image ${id} (${lang}).`;
                this.loading = false;
            }
        });
    }

    loadByName(name: string): void {
        this.loading = true;
        this.error = null;

        this.http
            .get<any[]>(`${this.baseUrl}/en/cards?name=${name}`)
            .subscribe({
            next: (res) => {
                if (!res || res.length === 0) {
                this.error = `No card found for "${name}".`;
                this.loading = false;
                return;
                }

                this.pokemonCard = res[0];
                this.loading = false;
            },
            error: () => {
                this.error = `Error loading cards for "${name}".`;
                this.loading = false;
            }
        });
    }

    // ---------- EFFET 3D / GLOSS ----------

    onMouseMove(e: MouseEvent): void {
        const card = this.cardRef.nativeElement;
        const rect = card.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const centerX = x - 50;
        const centerY = y - 50;

        const distance = Math.sqrt(centerX ** 2 + centerY ** 2) / 70;

        card.style.setProperty('--pointer-x', `${x}%`);
        card.style.setProperty('--pointer-y', `${y}%`);
        card.style.setProperty('--card-opacity', `${distance}`);

        const rx = centerY / 3;
        const ry = -centerX / 3;
        const degree = (distance * 20) / distance;

        const scale = window.innerWidth < 500 ? 1.03 : 1.25;

        card.style.transform = `
            perspective(650px)
            scale(${scale})
            rotate3d(${rx}, ${ry}, 0, ${degree}deg)
        `;
    }

    onMouseLeave(): void {
        const card = this.cardRef.nativeElement;

        card.style.setProperty('--card-opacity', '0');
        card.style.transform = '';
    }
}
