import { DotaOverlay } from './@types/DotaOverlay';
import { get } from './request';

export async function fetchOverlayFromAuthKey(abortController: AbortController, key: string): Promise<DotaOverlay> {
	return await get<DotaOverlay>('/overlay?frameApiKey=' + key, 'json', { signal: abortController.signal });
}
