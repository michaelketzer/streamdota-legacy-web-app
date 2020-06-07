import { OverlayConfig, DotaStats } from '@streamdota/shared-types';
import { State } from '../Store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadDotaOverlay, loadDotaStats } from '../reducer/DotaOverlay';

export const dotaOverlaySelector = (state: State): OverlayConfig | undefined => state.entities.dotaOverlay;

export function useDotaOverlay(frameApiKey?: string): OverlayConfig | undefined {
	const overlay = useSelector(dotaOverlaySelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (Object.keys(overlay).length === 0) {
				dispatch(loadDotaOverlay(frameApiKey));
			}
		},
		[ overlay ]
	);

	return overlay;
}

export const dotaStatsSelector = (state: State): DotaStats[] | null => state.ui.dotaStats;

export function useDotaStats(apiKey: string): DotaStats[] | null {
	const stats = useSelector(dotaStatsSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (stats === null) {
				dispatch(loadDotaStats(apiKey));
			}
		},
		[ stats ]
	);

	return stats;
}