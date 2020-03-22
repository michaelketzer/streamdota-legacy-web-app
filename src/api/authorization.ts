import { get } from "./request";
import { User } from "./@types/User";


export function startAuthRoutine(): void {
    location.href = `${process.env.API_URL}/auth/twitch`;
}

export async function completeAuthRoutine(code: string): Promise<boolean> {
    const jwt = await get<string>(`/auth/twitch/callback?code=${code}`, 'text');
    jwt && localStorage.setItem('jwt', jwt);

    return !!jwt;
}

export async function fetchCurrentUser(abortController: AbortController): Promise<User> {
    return await get<User>('/auth/user', 'json', {signal: abortController.signal});
}