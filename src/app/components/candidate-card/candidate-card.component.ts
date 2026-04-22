import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '../../models/election.model';

@Component({
    selector: 'app-candidate-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './candidate-card.component.html',
    styleUrl: './candidate-card.component.css'
})
export class CandidateCardComponent {
    @Input() candidate!: Candidate;
    @Input() rank!: number;
    @Input() voteDifference: number | null = null;
    @Input() percentageDifference: number | null = null;

    getPartyInitials(party: string): string {
        return party
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 3);
    }
}
