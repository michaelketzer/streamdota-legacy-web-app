import { OverlayConfig } from '@streamdota/shared-types';
import { State } from '../Store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadDotaOverlay } from '../reducer/DotaOverlay';

export const dotaOverlaySelector = (state: State): OverlayConfig | undefined => state.entities.dotaOverlay;

export function useDotaOverlay(): OverlayConfig | undefined {
	const overlay = useSelector(dotaOverlaySelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (Object.keys(overlay).length === 0) {
				dispatch(loadDotaOverlay());
			}
		},
		[ overlay ]
	);

	return overlay;
}
