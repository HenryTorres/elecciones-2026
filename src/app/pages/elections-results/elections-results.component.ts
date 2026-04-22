import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectionService } from '../../services/election.service';
import { ActasDisplayComponent } from '../../components/actas-display/actas-display.component';
import { CandidatesPyramidComponent } from '../../components/candidates-pyramid/candidates-pyramid.component';

@Component({
    selector: 'app-elections-results',
    standalone: true,
    imports: [CommonModule, ActasDisplayComponent, CandidatesPyramidComponent],
    templateUrl: './elections-results.component.html',
    styleUrl: './elections-results.component.css'
})
export class ElectionsResultsComponent implements OnInit {
    constructor(public electionService: ElectionService) {
        effect(() => {
            if (!this.electionService.electionResult()) {
                this.electionService.fetchElectionResults();
            }
        });
    }

    ngOnInit(): void {
        if (!this.electionService.electionResult()) {
            this.electionService.fetchElectionResults();
        }
    }

    getTopThreeCandidates() {
        const candidates = this.electionService.candidates();
        return candidates.slice(0, 3);
    }

    retry(): void {
        this.electionService.reset();
        this.electionService.fetchElectionResults();
    }

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
