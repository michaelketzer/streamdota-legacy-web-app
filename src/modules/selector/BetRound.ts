import { State } from '../Store';
import { BetRound } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadedBetRoundsSelector } from './Ui';
import { BetRoundState, loadBetRounds, loadCurrentBetRound } from '../reducer/BetRound';
import { defaultBetState } from '../../components/pages/bets/BetContext/Context';
import { BetRoundData } from '../../components/context/websocket/state';

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

export const currentBetRoundSelector = (state: State): BetRoundData | null => state.ui.currentBetRound;

export function useCurrentBetRound(auth?: string): BetRoundData | null {
	const currentBetRound = useSelector(currentBetRoundSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (currentBetRound === null) {
				dispatch(loadCurrentBetRound(auth));
			}
		},
		[ auth, currentBetRound ]
	);

	return currentBetRound || defaultBetState;
}