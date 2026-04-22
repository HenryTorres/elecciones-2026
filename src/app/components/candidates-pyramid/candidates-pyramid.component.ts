import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '../../models/election.model';
import { CandidateCardComponent } from '../candidate-card/candidate-card.component';

@Component({
    selector: 'app-candidates-pyramid',
    standalone: true,
    imports: [CommonModule, CandidateCardComponent],
    templateUrl: './candidates-pyramid.component.html',
    styleUrl: './candidates-pyramid.component.css'
})
export class CandidatesPyramidComponent {
    @Input() candidates: Candidate[] = [];

    voteDifference1to2 = computed(() => {
        if (this.candidates.length < 2) return 0;
        return this.candidates[0].votes - this.candidates[1].votes;
    });

    percentageDifference1to2 = computed(() => {
        if (this.candidates.length < 2) return 0;
        return this.candidates[0].percentage - this.candidates[1].percentage;
    });

    voteDifference2to3 = computed(() => {
        if (this.candidates.length < 3) return 0;
        return this.candidates[1].votes - this.candidates[2].votes;
    });

    percentageDifference2to3 = computed(() => {
        if (this.candidates.length < 3) return 0;
        return this.candidates[1].percentage - this.candidates[2].percentage;
    });

    getTotalVotes(): number {
        return this.candidates
            .slice(0, 3)
            .reduce((sum, candidate) => sum + candidate.votes, 0);
    }

    getTotalPercentage(): number {
        return this.candidates
            .slice(0, 3)
            .reduce((sum, candidate) => sum + candidate.percentage, 0);
    }
}
