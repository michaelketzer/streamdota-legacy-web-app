import { DotaOverlay } from "./@types/DotaOverlay";
import { get, patch } from "./request";

export async function fetchOverlay(abortController: AbortController): Promise<DotaOverlay> {
    return await get<DotaOverlay>('/overlay', 'json', {signal: abortController.signal});
}

export async function patchOverlay(data: DotaOverlay): Promise<void> {
    return await patch('/overlay', data);
}

export async function fetchOverlayFromAuthKey(abortController: AbortController, key: string): Promise<DotaOverlay> {
    return await get<DotaOverlay>('/overlay?frameApiKey=' + key, 'json', {signal: abortController.signal});
}
