import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElectionResult } from '../models/election.model';

@Injectable({
    providedIn: 'root'
})
export class ElectionService {
    private apiUrl = 'https://devapp.zaylar.com/api/elections/presidential'; // Reemplazar con tu endpoint

    // Signals
    electionResult = signal<ElectionResult | null>(null);
    isLoading = signal(false);
    error = signal<string | null>(null);

    // Computed signals
    candidates = computed(() => this.electionResult()?.candidates || []);

    actas = computed(() => this.electionResult()?.actas || null);

    time_snapshot = computed(() => this.electionResult()?.snapshot_time || null);

    topCandidates = computed(() => {
        const candidates = this.candidates();
        return candidates.slice(0, 5);
    });

    totalValidVotes = computed(() => this.actas()?.total_valid_votes || 0);
    citizenParticipation = computed(() => this.actas()?.citizen_participation_pct || 0);
    actasProgress = computed(() => this.actas()?.actas_contabilizadas_pct || 0);

    constructor(private http: HttpClient) { }

    fetchElectionResults(): void {
        this.isLoading.set(true);
        this.error.set(null);

        this.http.get<ElectionResult>(this.apiUrl).subscribe({
            next: (data) => {
                this.electionResult.set(data);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.error.set('Error al cargar los resultados electorales');
                this.isLoading.set(false);
                console.error('Error en elección:', err);
            }
        });
    }

    /**
     * Actualiza la URL del API (útil para diferentes endpoints o ambientes)
     */
    setApiUrl(url: string): void {
        this.apiUrl = url;
    }

    /**
     * Obtiene un candidato específico por su ID
     */
    getCandidateById(candidateId: string) {
        return computed(() => {
            return this.candidates().find(c => c.candidate_id === candidateId) || null;
        });
    }

    /**
     * Limpia el estado del servicio
     */
    reset(): void {
        this.electionResult.set(null);
        this.error.set(null);
        this.isLoading.set(false);
    }
}
