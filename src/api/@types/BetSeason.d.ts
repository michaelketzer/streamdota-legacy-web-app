export interface Invite {
    inviteKey: string;
    created: number;
    status: 'open';
    invitedBy: string;
}

export interface BetSeasonUser {
    id: number;
    displayName: string;
    userRole: 'owner' | 'user';
}

export interface BetToplist {
    name: string;
    username: string;
    won: number;
    total: number;
}