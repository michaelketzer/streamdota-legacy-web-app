import { BetSeason } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import {
	LOAD_BET_SEASONS_REQUEST,
	LOAD_BET_SEASONS_SUCCESS,
	LOAD_BET_SEASONS_FAILURE,
} from './Actions';

export interface BetSeasonState {
	[x: number]: BetSeason;
}

export const betSeason = new schema.Entity('betSeason');

const { combinedReducer } = createReducer<BetSeasonState>();

export const betSeasonReducer = combinedReducer;

export function loadBetSeasons(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason`,
				schema: [ betSeason ],
				types: {
					requestType: LOAD_BET_SEASONS_REQUEST,
					successType: LOAD_BET_SEASONS_SUCCESS,
					failureType: LOAD_BET_SEASONS_FAILURE,
				},
			},
		});
	};
}