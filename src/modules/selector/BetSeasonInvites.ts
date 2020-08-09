import { State } from '../Store';
import { BetSeasonInvite } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadedBeatSeasonInvitesSelector } from './Ui';
import { BetSeasonInviteState, loadBetSeasonInvites } from '../reducer/BetSeasonInvites';

export const betSeasonInviteEntitiesSelector = (state: State): BetSeasonInviteState => state.entities.betSeasonInvite;

export const betSeasonInvitesSelector = (state: State): BetSeasonInvite[] | undefined =>
	state.entities.betSeasonInvite ? Object.values(state.entities.betSeasonInvite) : undefined;

export function useBetSeasonInvites(seasonId: number): BetSeasonInvite[] | undefined {
	const invites = useSelector(betSeasonInvitesSelector);
	const loaded = (useSelector(loadedBeatSeasonInvitesSelector) || []).includes(seasonId);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadBetSeasonInvites(seasonId));
			}
		},
		[ loaded ]
	);

	return invites.filter(({betSeason}) => betSeason === seasonId);
}
