import { User, DotaStats, BotData } from "./@types/User";
import { get, patch, del } from "./request";
import { SteamConnection } from "./@types/SteamConnection";

export async function fetchCurrentUser(abortController: AbortController): Promise<User> {
    return await get<User>('/user/baseData', 'json', {signal: abortController.signal});
}

export async function patchUser(data: Partial<User>): Promise<void> {
    return await patch('/user/baseData', data);
}
export async function fetchSteamConnections(abortController: AbortController): Promise<SteamConnection[]> {
    return await get<SteamConnection[]>('/user/steam', 'json', {signal: abortController.signal});
}

export async function fetchStats(abortController: AbortController, apiKey: string): Promise<DotaStats[]> {
    return await get<DotaStats[]>('/user/dotaStats/' + apiKey, 'json', {signal: abortController.signal});
}

export async function fetchBotConfig(abortController: AbortController): Promise<BotData> {
    return await get<BotData>('/user/bot', 'json', {signal: abortController.signal});
}

export async function patchBotConfig(data: Partial<BotData>): Promise<void> {
    return await patch('/user/bot', data);
}

export async function resetDotaGsi(): Promise<void> {
    return await del('/dota-gsi/resetGsi');
}