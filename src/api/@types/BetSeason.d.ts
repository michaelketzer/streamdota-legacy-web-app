export interface BetSeason {
    id: number;
    name: string;
    description: string;
    type: 'ladder' | 'tournament';
    userRole: 'owner' | 'user';
}