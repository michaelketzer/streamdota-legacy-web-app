import { BetSeason } from "./@types/BetSeason";
import { get, create, del, patch } from "./request";

export async function fetchUserBetSeasons(): Promise<BetSeason[]> {
    return await get<BetSeason[]>('/betSeason')
}

export async function createUserBetSeason(data: Partial<BetSeason>): Promise<void> {
    return await create('/betSeason', data)
}

export async function deleteSeason(id: number): Promise<void> {
    return await del('/betSeason/' + id);
}

export async function patchBetSeason(id: number, data: Partial<BetSeason>): Promise<void> {
    return await patch('/betSeason/' + id, data)
}