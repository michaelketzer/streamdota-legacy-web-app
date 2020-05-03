
export interface BetRound {
    id: number;
    userId: number;
    round: number;
    status: string;
    result: string;
    created: number;
    total: number;
    aBets: number;
    bBets: number;
}