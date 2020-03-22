import { get } from "./request";

export function startAuthRoutine(): void {
    location.href = `${process.env.API_URL}/auth/twitch`;
}

export async function completeAuthRoutine(code: string): Promise<boolean> {
    const jwt = await get<string>(`/auth/twitch/callback?code=${code}`, 'text');
    jwt && localStorage.setItem('jwt', jwt);

    return !!jwt;
}