export interface BetSeason {
    id: number;
    name: string;
    description: string;
    type: 'ladder' | 'tournament';
    userRole: 'owner' | 'user';
}

export interface Invite {
    inviteKey: string;
    created: number;
    status: 'open';
    invitedBy: string;
}