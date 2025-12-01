import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './../../components/search-bar/search-bar.component';
import { CardComponent } from './../../components/card/card.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, SearchBarComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {}
