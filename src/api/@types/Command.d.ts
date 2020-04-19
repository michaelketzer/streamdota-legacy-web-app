export interface Command {
    id: number;
    active: boolean;
    command: string;
    message: string;
    type: 'default' | 'dotaWinLoss' | 'betting';
    access: 'user' | 'mod' | 'streamer';
}