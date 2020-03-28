import { get } from "./request";

export function startAuthRoutine(): void {
    console.log('Starting authorization routine...');
    location.href = `${process.env.API_URL}/auth/twitch`;
}

export async function completeAuthRoutine(code: string): Promise<boolean> {
    const jwt = await get<string>(`/auth/twitch/callback?code=${code}`, 'text');
    jwt && localStorage.setItem('jwt', jwt);
    if(jwt) {
        console.log('Finished authorization routine. Redirecting to dashboard.');
    } else {
        console.log('Error in authroization routine. Retry...');
    }

    return !!jwt;
}