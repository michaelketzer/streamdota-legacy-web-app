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
    frameApiKey: string;
}

export interface DotaStats {
    date: number;
    won: boolean;
}

export interface BotData {
    useBot: boolean;
    customBotName: string;
    customBotAuth: string;
}