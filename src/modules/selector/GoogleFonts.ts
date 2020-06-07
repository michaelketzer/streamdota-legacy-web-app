import { State } from '../Store';
import { Font } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadedGoogleFontsSelector } from './Ui';
import { loadGoogleFonts } from '../reducer/GoogleFonts';

export const googleFontsEntitiesSelector = (state: State): { [x: number]: Font } => state.entities.googleFont;

export const googleFontsSelector = (state: State): Font[] | undefined =>
	state.entities.googleFont ? Object.values(state.entities.googleFont) : undefined;

export function useGoogleFont(): Font[] | undefined {
	const googleFont = useSelector(googleFontsSelector);
	const loaded = useSelector(loadedGoogleFontsSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadGoogleFonts());
			}
		},
		[ loaded ]
	);

	return googleFont;
}
