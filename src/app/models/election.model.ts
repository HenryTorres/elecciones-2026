export interface Actas {
    actas_contabilizadas_pct: number;
    actas_contabilizadas: number;
    actas_total: number;
    actas_pendientes: number;
    actas_enviadas_jee: number;
    actas_pendientes_jee: number;
    total_votes_cast: number;
    total_valid_votes: number;
    citizen_participation_pct: number;
}

export interface Candidate {
    rank: number;
    candidate_id: string;
    name: string;
    party: string;
    party_id: null | string;
    votes: number;
    percentage: number;
    image?: string;
}

export interface ElectionResult {
    election: string;
    label: string;
    scope: string;
    snapshot_time: string;
    actas: Actas;
    candidates: Candidate[];
}
