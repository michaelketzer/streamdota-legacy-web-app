import { State } from '../Store';
import { BetSeasonUser } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadedBeatSeasonUsersSelector } from './Ui';
import { BetSeasonUserState, loadBetSeasonUsers } from '../reducer/BetSeasonUser';

export const betSeasonUserEntitiesSelector = (state: State): BetSeasonUserState => state.entities.betSeasonUser;

export const betSeasonUsersSelector = (state: State): BetSeasonUser[] | undefined =>
	state.entities.betSeasonUser ? Object.values(state.entities.betSeasonUser) : undefined;

export function useBetSeasonUsers(seasonId: number): BetSeasonUser[] | undefined {
	const users = useSelector(betSeasonUsersSelector);
	const loaded = (useSelector(loadedBeatSeasonUsersSelector) || []).includes(seasonId);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadBetSeasonUsers(seasonId));
			}
		},
		[ loaded ]
	);

	return users.filter(({betSeason}) => betSeason === seasonId);
}
