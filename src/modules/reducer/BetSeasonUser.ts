import { BetSeasonUser } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import {
    LOAD_BET_SEASON_USERS_FAILURE,
    LOAD_BET_SEASON_USERS_SUCCESS,
    LOAD_BET_SEASON_USERS_REQUEST,
} from './Actions';

export interface BetSeasonUserState {
	[x: number]: BetSeasonUser;
}

export const betSeasonUser = new schema.Entity('betSeasonUser');
const { combinedReducer } = createReducer<BetSeasonUserState>();

export const betSeasonUserReducer = combinedReducer;

export function loadBetSeasonUsers(seasonId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason/user/:seasonId`,
				schema: [ betSeasonUser ],
				types: {
					requestType: LOAD_BET_SEASON_USERS_REQUEST,
					successType: LOAD_BET_SEASON_USERS_SUCCESS,
					failureType: LOAD_BET_SEASON_USERS_FAILURE,
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