import { Component, Input } from '@angular/core';
import { Actas } from '../../models/election.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'actas-display',
  imports: [CommonModule],
  templateUrl: './actas-display.html',
  styleUrl: './actas-display.css',
})
export class ActasDisplay {

  @Input() actas: Actas | null = null;

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
