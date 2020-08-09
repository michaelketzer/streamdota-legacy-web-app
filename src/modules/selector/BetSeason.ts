import { State } from '../Store';
import { BetSeason } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadedBetSeasonsSelector } from './Ui';
import { BetSeasonState, loadBetSeasons } from '../reducer/BetSeason';

export const betSeasonEntitiesSelector = (state: State): BetSeasonState => state.entities.betSeason;

export const betSeasonsSelector = (state: State): BetSeason[] | undefined =>
	state.entities.betSeason ? Object.values(state.entities.betSeason) : undefined;

export function useBetSeasons(): BetSeason[] | undefined {
	const seasons = useSelector(betSeasonsSelector);
	const loaded = useSelector(loadedBetSeasonsSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadBetSeasons());
			}
		},
		[ loaded ]
	);

	return seasons;
}
