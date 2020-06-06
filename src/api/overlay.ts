import { OverlayConfig } from '@streamdota/shared-types';
import { get } from './request';

export async function fetchOverlayFromAuthKey(abortController: AbortController, key: string): Promise<OverlayConfig> {
	return await get<OverlayConfig>('/overlay?frameApiKey=' + key, 'json', { signal: abortController.signal });
}
