import { BetSeason, Invite } from "./@types/BetSeason";
import { get, create, del, patch } from "./request";

export async function fetchUserBetSeasons(abortController: AbortController): Promise<BetSeason[]> {
    return await get<BetSeason[]>('/betSeason', 'json', {signal: abortController.signal})
}

export async function createUserBetSeason(data: Partial<BetSeason>): Promise<void> {
    return await create('/betSeason', data)
}

export async function deleteSeason(id: number): Promise<void> {
    return await del('/betSeason/' + id);
}

export async function patchBetSeason(id: number, data: Partial<BetSeason>): Promise<void> {
    return await patch('/betSeason/' + id, data);
}

export async function getInvites(abortController: AbortController, id: number): Promise<Invite[]> {
    return await get<Invite[]>('/betSeason/invites/' + id, 'json', {signal: abortController.signal});
}