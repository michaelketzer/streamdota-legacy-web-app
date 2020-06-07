import { BetRound } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import {
    DELETE_BET_ROUND_SUCCESS,
    LOAD_BET_ROUNDS_REQUEST,
    LOAD_BET_ROUNDS_SUCCESS,
    LOAD_BET_ROUNDS_FAILURE,
    CREATE_BET_ROUND_REQUEST,
    CREATE_BET_ROUND_SUCCESS,
    CREATE_BET_ROUND_FAILURE,
    UPDATE_BET_ROUND_REQUEST,
    UPDATE_BET_ROUND_SUCCESS,
    UPDATE_BET_ROUND_FAILURE,
    DELETE_BET_ROUND_REQUEST,
    DELETE_BET_ROUND_FAILURE,
	LOAD_CURRENT_BET_ROUND_REQUEST,
	LOAD_CURRENT_BET_ROUND_SUCCESS,
	LOAD_CURRENT_BET_ROUND_FAILURE,
} from './Actions';

export interface BetRoundState {
	[x: number]: BetRound;
}

interface DeleteBetRound {
	options: {
		urlParams: {
			betRoundId: number;
		};
	};
	type: typeof DELETE_BET_ROUND_SUCCESS;
}

export const betRound = new schema.Entity('betRound');

const { addReducer, combinedReducer } = createReducer<BetRoundState>();

addReducer<DeleteBetRound>(DELETE_BET_ROUND_SUCCESS, (state, { options: { urlParams: { betRoundId } } }) => {
	const newState = { ...state };
	delete newState[betRoundId];
	return newState;
});

export const betRoundReducer = combinedReducer;

export function loadBetRounds(seasonId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason/rounds/:seasonId`,
				schema: [ betRound ],
				types: {
					requestType: LOAD_BET_ROUNDS_REQUEST,
					successType: LOAD_BET_ROUNDS_SUCCESS,
					failureType: LOAD_BET_ROUNDS_FAILURE,
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

export function createBetRound(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/bets`,
				method: 'post',
				types: {
					requestType: CREATE_BET_ROUND_REQUEST,
					successType: CREATE_BET_ROUND_SUCCESS,
					failureType: CREATE_BET_ROUND_FAILURE,
				},
			},
		});
	};
}

export function updateBetRound(betRoundId: number, data: Partial<BetRound>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/bets/:betRoundId`,
				method: 'patch',
				types: {
					requestType: UPDATE_BET_ROUND_REQUEST,
					successType: UPDATE_BET_ROUND_SUCCESS,
					failureType: UPDATE_BET_ROUND_FAILURE,
				},
				options: {
					urlParams: {
						betRoundId,
					},
					data,
				},
			},
		});
	};
}

export function deleteBetRound(betRoundId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/bets/:betRoundId`,
				method: 'del',
				types: {
					requestType: DELETE_BET_ROUND_REQUEST,
					successType: DELETE_BET_ROUND_SUCCESS,
					failureType: DELETE_BET_ROUND_FAILURE,
				},
				options: {
					urlParams: {
						betRoundId,
					},
				},
			},
		});
	};
}

export function loadCurrentBetRound(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/bets/current`,
				types: {
					requestType: LOAD_CURRENT_BET_ROUND_REQUEST,
					successType: LOAD_CURRENT_BET_ROUND_SUCCESS,
					failureType: LOAD_CURRENT_BET_ROUND_FAILURE,
                },
			},
		});
	};
}