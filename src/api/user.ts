import { get, del } from './request';
import { SteamConnection, DotaStats } from '@streamdota/shared-types';


export async function fetchSteamConnections(abortController: AbortController): Promise<SteamConnection[]> {
	return await get<SteamConnection[]>('/user/steam', 'json', { signal: abortController.signal });
}

export async function fetchStats(abortController: AbortController, apiKey: string): Promise<DotaStats[]> {
	return await get<DotaStats[]>('/user/dotaStats/' + apiKey, 'json', { signal: abortController.signal });
}

export async function resetDotaGsi(): Promise<void> {
	return await del('/dota-gsi/resetGsi');
}
