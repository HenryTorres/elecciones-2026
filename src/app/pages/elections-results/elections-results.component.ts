import { Component, Inject, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectionService } from '../../services/election.service';
import { CandidatesPyramidComponent } from '../../components/candidates-pyramid/candidates-pyramid.component';
import { ActasDisplay } from '../../components/actas-display/actas-display';

@Component({
    selector: 'app-elections-results',
    standalone: true,
    imports: [CommonModule, CandidatesPyramidComponent, ActasDisplay],
    templateUrl: './elections-results.component.html',
    styleUrl: './elections-results.component.css'
})
export class ElectionsResultsComponent implements OnInit {


    public electionService = inject(ElectionService);
    public showActasMenu = signal(false);
    showTitle = true;

    constructor() {
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

    toggleActasMenu(): void {
        this.showActasMenu.update(value => !value);
        this.showTitle = !this.showTitle;
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
