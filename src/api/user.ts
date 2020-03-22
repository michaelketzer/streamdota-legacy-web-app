import { User } from "./@types/User";
import { get } from "./request";
import { SteamConnection } from "./@types/SteamConnection";

export async function fetchCurrentUser(abortController: AbortController): Promise<User> {
    return await get<User>('/user/baseData', 'json', {signal: abortController.signal});
}

export async function fetchSteamConnections(abortController: AbortController): Promise<SteamConnection[]> {
    return await get<SteamConnection[]>('/user/steam', 'json', {signal: abortController.signal});
}