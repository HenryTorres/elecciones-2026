import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Actas } from '../../models/election.model';

@Component({
    selector: 'app-actas-display',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './actas-display.component.html',
    styleUrl: './actas-display.component.css'
})
export class ActasDisplayComponent {
    @Input() actas: Actas | null = null;
    @Input() snapshotTime: string = '';

    formatDate(dateString: string): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('es-PE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}
