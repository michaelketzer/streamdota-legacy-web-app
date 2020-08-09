import { BetSeasonToplist } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import {
    LOAD_BET_SEASON_TOPLIST_REQUEST,
    LOAD_BET_SEASON_TOPLIST_SUCCESS,
    LOAD_BET_SEASON_TOPLIST_FAILURE,
} from './Actions';

export interface BetSeasonToplistState {
	[x: number]: BetSeasonToplist;
}

export const betSeasonToplist = new schema.Entity('betSeasonToplist', {}, {
	idAttribute: (item) => item.betSeason + '-' + item.id
});
const { combinedReducer } = createReducer<BetSeasonToplistState>();

export const betSeasonToplistReducer = combinedReducer;

export function loadBetSeasonToplist(seasonId: number, frameApiKey?: string): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		const endpoint = frameApiKey ? `${process.env.API_URL}/betSeason/toplist/:seasonId?frameApiKey=${frameApiKey}` : `${process.env.API_URL}/betSeason/toplist/:seasonId`;
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint,
				schema: [ betSeasonToplist ],
				types: {
					requestType: LOAD_BET_SEASON_TOPLIST_REQUEST,
					successType: LOAD_BET_SEASON_TOPLIST_SUCCESS,
					failureType: LOAD_BET_SEASON_TOPLIST_FAILURE,
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