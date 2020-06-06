import { BetSeason } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import {
	LOAD_BET_SEASONS_REQUEST,
	LOAD_BET_SEASONS_SUCCESS,
	LOAD_BET_SEASONS_FAILURE,
	CREATE_BET_SEASON_FAILURE,
	CREATE_BET_SEASON_SUCCESS,
	CREATE_BET_SEASON_REQUEST,
	UPDATE_BET_SEASON_REQUEST,
	UPDATE_BET_SEASON_SUCCESS,
	UPDATE_BET_SEASON_FAILURE,
	DELETE_BET_SEASON_REQUEST,
	DELETE_BET_SEASON_SUCCESS,
	DELETE_BET_SEASON_FAILURE,
} from './Actions';

export interface BetSeasonState {
	[x: number]: BetSeason;
}

interface DeleteBetSeason {
	options: {
		urlParams: {
			seasonId: number;
		};
	};
	type: typeof DELETE_BET_SEASON_SUCCESS;
}

export const betSeason = new schema.Entity('betSeason');

const { addReducer, combinedReducer } = createReducer<BetSeasonState>();

addReducer<DeleteBetSeason>(DELETE_BET_SEASON_SUCCESS, (state, { options: { urlParams: { seasonId } } }) => {
	const newState = { ...state };
	delete newState[seasonId];
	return newState;
});

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

export function createBetSeason(data: Partial<BetSeason>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason`,
				method: 'post',
				types: {
					requestType: CREATE_BET_SEASON_REQUEST,
					successType: CREATE_BET_SEASON_SUCCESS,
					failureType: CREATE_BET_SEASON_FAILURE,
				},
				options: {
					data,
				},
			},
		});
	};
}

export function patchBetSeason(seasonId: number, data: Partial<BetSeason>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason/:seasonId`,
				method: 'patch',
				types: {
					requestType: UPDATE_BET_SEASON_REQUEST,
					successType: UPDATE_BET_SEASON_SUCCESS,
					failureType: UPDATE_BET_SEASON_FAILURE,
				},
				options: {
					urlParams: {
						seasonId,
					},
					data,
				},
			},
		});
	};
}

export function deleteBetSeason(seasonId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason/:seasonId`,
				method: 'del',
				types: {
					requestType: DELETE_BET_SEASON_REQUEST,
					successType: DELETE_BET_SEASON_SUCCESS,
					failureType: DELETE_BET_SEASON_FAILURE,
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