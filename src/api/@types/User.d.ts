export interface User {
    id: number;
    twitchId: number;
    displayName: string;
    created: number;
    avatar: string;
    avatarWEBP: string;
    avatarJP2: string;
    profileUrl: string;
    gsiAuth: string;
}

export interface DotaStats {
    date: number;
    won: boolean;
}