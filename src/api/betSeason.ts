import { BetSeason } from "./@types/BetSeason";
import { get, create } from "./request";

export async function fetchUserBetSeasons(): Promise<BetSeason[]> {
    return await get<BetSeason[]>('/betSeason')
}

export async function createUserBetSeason(data: Partial<BetSeason>): Promise<void> {
    return await create('/betSeason', data)
}