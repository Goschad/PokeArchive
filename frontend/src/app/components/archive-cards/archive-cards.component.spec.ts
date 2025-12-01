import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchiveCardsComponent } from './archive-cards.component';

describe('ArchiveCardsComponent', () => {
    let component: ArchiveCardsComponent;
    let fixture: ComponentFixture<ArchiveCardsComponent>;

    beforeEach(async () => {
            await TestBed.configureTestingModule({
            imports: [ArchiveCardsComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ArchiveCardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
