import { State } from '../Store';
import { BetRound } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadedBetRoundsSelector } from './Ui';
import { BetRoundState, loadBetRounds } from '../reducer/BetRound';

export const betRoundEntitiesSelector = (state: State): BetRoundState => state.entities.betRound;

export const betRoundsSelector = (state: State): BetRound[] | undefined =>
	state.entities.betRound ? Object.values(state.entities.betRound) : undefined;

export function useBetRounds(seasonId: number): BetRound[] | undefined {
	const rounds = useSelector(betRoundsSelector);
	const loaded = (useSelector(loadedBetRoundsSelector) || []).includes(seasonId);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadBetRounds(seasonId));
			}
		},
		[ loaded ]
	);

	return rounds.filter(({betSeason}) => betSeason === seasonId);
}
