import { Routes } from '@angular/router';
import { HelpComponent } from './ui/help/help.component';
import { AboutComponent } from './ui/about/about.component';

export const routes: Routes = [
  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
];
