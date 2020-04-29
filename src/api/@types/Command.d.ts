export interface Command {
    id: number;
    active: boolean;
    command: string;
    message: string;
    type: 'default' | 'dotaWinLoss' | 'betting_streamer' | 'betting_user';
    access: 'user' | 'mod' | 'streamer';
    noResponse: number;
    deleteAble: number;
}