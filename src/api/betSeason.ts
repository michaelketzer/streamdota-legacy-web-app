import { BetSeason, Invite, BetSeasonUser, BetToplist } from "./@types/BetSeason";
import { get, create, del, patch } from "./request";
import { BetRound } from "./@types/BetRound";

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

export async function getUsers(abortController: AbortController, id: number): Promise<BetSeasonUser[]> {
    return await get<BetSeasonUser[]>('/betSeason/users/' + id, 'json', {signal: abortController.signal});
}

export async function getToplist(abortController: AbortController, id: number): Promise<BetToplist[]> {
    return await get<BetToplist[]>('/betSeason/toplist/' + id, 'json', {signal: abortController.signal});
}

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