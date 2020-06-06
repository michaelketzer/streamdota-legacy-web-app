import { get, create, del, patch } from "./request";
import { BetRound } from "./@types/BetRound";

export async function getRounds(abortController: AbortController, id: number): Promise<BetRound[]> {
    return await get<BetRound[]>('/betSeason/rounds/' + id, 'json', {signal: abortController.signal});
}

export async function createRound(): Promise<void> {
    return await create('/bets', {});
}

export async function updateRound(id: number, data: Partial<BetRound>): Promise<void> {
    return await patch('/bets/' + id, data);
}

export async function deleteRound(id: number): Promise<void> {
    return await del('/bets/' + id);
}