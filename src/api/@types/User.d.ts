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
    gsiConnected: number;
    frameApiKey: string;
    dotaStatsFrom: 'session' | 'day';
    useBets: number;
    betSeasonId: number | null;
}

export interface DotaStats {
    date: number;
    won: boolean;
}

export interface BotData {
    useBot: boolean;
    customBotName: string;
    customBotToken: string;
    commandTrigger: string;
}