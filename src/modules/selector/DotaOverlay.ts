import { OverlayConfig, DotaStats } from '@streamdota/shared-types';
import { State } from '../Store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadDotaOverlay } from '../reducer/DotaOverlay';
import { DotaStatsState, loadDotaStats } from '../reducer/DotaStats';
import { dotaStatsLoadedSelector, dotaStatsSelector } from './DotaStats';

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

export function useDotaStats(): DotaStatsState | null {
	const stats = useSelector(dotaStatsSelector);
	const loaded = useSelector(dotaStatsLoadedSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadDotaStats());
			}
		},
		[ stats ]
	);

	return stats;
}