import { get, del } from './request';

export interface SteamConnection {
    id: number;
    userId: number;
    steamId: string;
}

export interface DotaStats {
    date: number;
    won: boolean;
}

export async function fetchSteamConnections(abortController: AbortController): Promise<SteamConnection[]> {
	return await get<SteamConnection[]>('/user/steam', 'json', { signal: abortController.signal });
}

export async function fetchStats(abortController: AbortController, apiKey: string): Promise<DotaStats[]> {
	return await get<DotaStats[]>('/user/dotaStats/' + apiKey, 'json', { signal: abortController.signal });
}

export async function resetDotaGsi(): Promise<void> {
	return await del('/dota-gsi/resetGsi');
}
