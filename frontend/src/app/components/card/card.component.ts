import {
  Component,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';
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
    @ViewChild('gloss') glossRef!: ElementRef<HTMLDivElement>;

    pokemonCard: any = null;
    loading = true;          // chargement des données API
    imageLoaded = false;     // chargement de l'image
    error: string | null = null;


    private language = "en";
    private baseUrl = environment.pokemonApiBaseUrl;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
    console.log('Base URL =', this.baseUrl);
    this.loadCardById(this.language, 'swsh3-136');
  }

  // ---------- API TCGDEX ----------

    onImageLoad(): void {
        this.imageLoaded = true;
    }

    onImageError(): void {
        this.imageLoaded = false;
        this.error = "Impossible de charger l'image de la carte.";
    }

    getImageUrl(): string {
        if (!this.pokemonCard || !this.pokemonCard.image) return '';
        return `${this.pokemonCard.image}/high.webp`;
    }

    loadCardById(lang: string, id: string): void {
        this.loading = true;
        this.error = null;

        const url = `${this.baseUrl}/${lang}/cards/${id}`;
        console.time('loadCard');
        console.log('Fetching', url);

        this.http.get<any>(url).subscribe({
            next: (res) => {
                this.pokemonCard = res;
                this.loading = false;
                console.timeEnd('loadCard');
            },
            
            error: (err) => {
                console.error(err);
                this.error = `Impossible de charger la carte ${id} (${lang}).`;
                this.loading = false;
                console.timeEnd('loadCard');
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

                // On prend la première carte du résultat
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
        const gloss = this.glossRef.nativeElement;

        const pointerX = e.clientX;
        const pointerY = e.clientY;

        const cardRect = card.getBoundingClientRect();

        const halfWidth = cardRect.width / 2;
        const halfHeight = cardRect.height / 2;

        const cardCenterX = cardRect.left + halfWidth;
        const cardCenterY = cardRect.top + halfHeight;

        const deltaX = pointerX - cardCenterX;
        const deltaY = pointerY - cardCenterY;

        const distanceToCenter = Math.sqrt(
        Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
        );

        const maxDistance = Math.max(halfWidth, halfHeight);

        const degree = (distanceToCenter * 10) / maxDistance;
        const rx = deltaY / halfHeight;
        const ry = deltaX / halfWidth;

        card.style.transform = `perspective(400px) rotate3d(${-rx}, ${ry}, 0, ${degree}deg)`;

        gloss.style.transform = `translate(${-ry * 100}%, ${-rx * 100}%) scale(2.4)`;
        gloss.style.opacity = String((distanceToCenter * 0.6) / maxDistance);
    }

    onMouseLeave(): void {
        const card = this.cardRef.nativeElement;
        const gloss = this.glossRef.nativeElement;

        card.style.transform = '';
        gloss.style.opacity = '0';
    }
}
