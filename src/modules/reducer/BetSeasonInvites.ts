import { BetSeasonInvite } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import {
    LOAD_BET_SEASON_INVITES_REQUEST,
    LOAD_BET_SEASON_INVITES_SUCCESS,
    LOAD_BET_SEASON_INVITES_FAILURE,
} from './Actions';

export interface BetSeasonInviteState {
	[x: number]: BetSeasonInvite;
}

export const betSeasonInvite = new schema.Entity('betSeasonInvite');
const { combinedReducer } = createReducer<BetSeasonInviteState>();

export const betSeasonInviteReducer = combinedReducer;

export function loadBetSeasonInvites(seasonId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason/invites/:seasonId`,
				schema: [ betSeasonInvite ],
				types: {
					requestType: LOAD_BET_SEASON_INVITES_REQUEST,
					successType: LOAD_BET_SEASON_INVITES_SUCCESS,
					failureType: LOAD_BET_SEASON_INVITES_FAILURE,
                },
                options: {
                    urlParams: {
                        seasonId,
                    },
                },
			},
		});
	};
}