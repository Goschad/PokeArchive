import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'archive', component: ArchiveComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
];
