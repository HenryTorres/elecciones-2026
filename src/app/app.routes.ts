import { Routes } from '@angular/router';
import { ElectionsResultsComponent } from './pages/elections-results/elections-results.component';

export const routes: Routes = [
    {
        path: '',
        component: ElectionsResultsComponent,
        data: { title: 'Resultados Electorales 2026' }
    },
    {
        path: 'resultados',
        component: ElectionsResultsComponent,
        data: { title: 'Resultados Electorales' }
    },
    {
        path: '**',
        redirectTo: ''
    }
];
