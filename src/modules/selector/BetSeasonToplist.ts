import { State } from '../Store';
import { BetSeasonToplist } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadedBeatSeasonToplistSelector } from './Ui';
import { BetSeasonToplistState, loadBetSeasonToplist } from '../reducer/BetSeasonToplist';

export const betSeasonToplistEntitiesSelector = (state: State): BetSeasonToplistState => state.entities.betSeasonToplist;

export const betSeasonToplistSelector = (state: State): BetSeasonToplist[] | undefined =>
	state.entities.betSeasonToplist ? Object.values(state.entities.betSeasonToplist) : undefined;

export function useBetSeasonToplist(seasonId: number): BetSeasonToplist[] | undefined {
	const toplist = useSelector(betSeasonToplistSelector);
	const loaded = (useSelector(loadedBeatSeasonToplistSelector) || []).includes(seasonId);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadBetSeasonToplist(seasonId));
			}
		},
		[ loaded ]
	);

	return toplist.filter(({betSeason}) => betSeason === seasonId);
}
